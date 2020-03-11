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

  private newPhoneNumber: Customer;
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

      this.customerService.getCustomerDetails(this.currentUser).subscribe(
         data => {
              this.customerDetails = data[0];
              console.log(this.customerDetails);
              //this.updatePhoneForm.patchValue({phoneNumber: this.customerDetails.phoneNumber});
              this.customerDetails.phoneNumber.forEach((x) => {
                  this.phoneNumbers.push(this.fb.group(new Customer(x)));
              })
         },
         err => {
             alert("Some Error Occurred!");
             console.log(err);
         }
      );

      this.updatePhoneForm = this.fb.group({
                  phoneNumber: this.fb.array([])
      });
  }

  addPhoneNumbers(): void {
      this.phoneNumbers.push(this.buildPhoneNumbers());
  }

  removePhoneNumbers() {
      this.phoneNumbers.removeAt(this.phoneNumbers.length - 1);
      console.log(this.updatePhoneForm.value);
  }

  buildPhoneNumbers(): FormGroup {
      return this.fb.group(
          {
            phoneNumberId: 0,
            isPrimaryNumber: false,
            phoneNumberType: "work",
            countryCode: [, Validators.required],
            cityCode: [, Validators.required],
            number: ["", Validators.required],
            customerId: "2728320",
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

  update() {
      this.submitted = true;
      this.loading = true;

      // reset alerts on submit
      this.alertService.clear();
      this.errorMessage = null;

      this.newPhoneNumber = new Customer();
      this.newPhoneNumber = this.updatePhoneForm.value.phoneNumber;
      console.log(this.newPhoneNumber);

      this.customerService.updatePhoneNumber(this.newPhoneNumber).subscribe({
        next: data => {
          console.log("Hi");
          this.newPhoneNumber = data;
          this.updatePhoneForm.reset();
          this.successMessage = "Update customer details success";
          console.log(data);
        },
        error: err => {
          this.errorMessage = err.error.error;
          console.log(this.errorMessage);
        }
      });
    }

}
