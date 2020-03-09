import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray
} from "@angular/forms";

import { Router } from "@angular/router";
import { AlertService } from "../_services/alert.service";
import { AuthenticationService } from './../_services/authentication.service';
import { CustomerService } from "../customers/customer.service";

import { Customer } from "../customers/customer";
import { User } from "../_models/User";

@Component({
  selector: 'app-phone-number-form',
  templateUrl: './phone-number-form.component.html',
  styleUrls: ['./phone-number-form.component.css']
})
export class PhoneNumberFormComponent implements OnInit {

  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  updatePhoneForm: FormGroup;

  private newPhoneNumber: Customer = new Customer();
  errorMessage: string;
  successMessage: string;
  loading = false;
  submitted = false;

  currentUser: User;
  customerDetails: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      console.log(this.currentUser);

      this.editEmployee().then(()=> {
          console.log(this.customerDetails);
      });

      this.updatePhoneForm = this.fb.group({
                  phoneNumber: this.fb.array([this.buildPhoneNumbers()])
      });
  }

  addPhoneNumbers(): void {
      this.phoneNumbers.push(this.buildPhoneNumbers());
  }

  removePhoneNumbers() {
      this.phoneNumbers.removeAt(this.phoneNumbers.length - 1);
  }

  buildPhoneNumbers(): FormGroup {
      return this.fb.group(
          {
            phoneNumberId: "0",
            phoneNumberType: "home",
            isPrimaryNumber: false,
            number: ["", Validators.required],
            countryCode: ["", Validators.required],
            cityCode: ["", Validators.required]
          }
      );
  }

  get phoneNumbers(): FormArray {
        return this.updatePhoneForm.get("phoneNumber") as FormArray;
  }

  get ph(): any {
      // return this.updatePhoneForm.controls;
      return (this.updatePhoneForm.get("phoneNumber") as FormArray).controls;
  }

  editEmployee() {
      return new Promise((resolve) => {
          this.customerService.getCustomerDetails(this.currentUser).subscribe(
                       data => {
                            this.customerDetails = data[0];
                            console.log(this.customerDetails.phoneNumber);
                            //this.phoneNumbers.push(this.customerDetails.phoneNumber.length);
                            this.updatePhoneForm.patchValue({phoneNumber: this.customerDetails.phoneNumber});
                            resolve();
                       },
                       err => {
                           alert("Some Error Occurred!");
                           console.log(err);
                       }
            );
      });
  }

  update() {
      /*this.submitted = true;
      this.loading = true;

      // reset alerts on submit
      this.alertService.clear();

      this.errorMessage = null;
      // this.newPhoneNumber = <Customer> this.updatePhoneForm.value;
      console.log(this.updatePhoneForm);
      console.log("Saved: " + JSON.stringify(this.updatePhoneForm.value));
      console.log("Saved: " + JSON.stringify(this.newPhoneNumber));
      this.newPhoneNumber = new Customer(this.updatePhoneForm.value);
      console.log("Saved customer: " + JSON.stringify(this.newPhoneNumber));
      this.customerService.updatePhoneNumber(this.newPhoneNumber).subscribe({
        next: data => {
          this.newPhoneNumber = data;
          this.updatePhoneForm.reset();
          this.successMessage = "Update customer details success";
          console.log(data);
        },
        error: err => {
          this.errorMessage = err.error.errorMessage;

          console.log(this.errorMessage);
        }
      });*/
    }

}
