import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray
} from "@angular/forms";

import { Customer } from "../customer";
import { User } from "../../_models/User";

import { Router } from "@angular/router";
import { AlertService } from "../../_services/alert.service";
import { AuthenticationService } from '../../_services/authentication.service';
import { CustomerService } from "../customer.service";

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {

  updateAddressForm: FormGroup;
  private newCustomer: Customer = new Customer();
  emailMessage: string;
  errorMessage: string;
  successMessage: string;
  loading = false;
  submitted = false;

  currentUser: User;
  customerDetails: any;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private alertService: AlertService,
      private customerService: CustomerService,
      private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

      this.customerService.getCustomerDetails(this.currentUser).subscribe(
           data => {
                this.customerDetails = data[0];
                console.log(this.customerDetails);
                //this.updatePhoneForm.patchValue({phoneNumber: this.customerDetails.phoneNumber});
                this.customerDetails.address.forEach((x) => {
                    this.addresses.push(this.fb.group(new Customer(x)));
                })
           },
           err => {
               alert("Some Error Occurred!");
               console.log(err);
           }
      );

      this.updateAddressForm = this.fb.group({
            address: this.fb.array([]),
      });
  }

  get addresses(): FormArray {
      return this.updateAddressForm.get("address") as FormArray;
  }

  get f(): any {
      // return this.updateAddressForm.controls;
      return (this.updateAddressForm.get("address") as FormArray).controls;
  }

  addAddress(): void {
      this.addresses.push(this.buildAddress());
  }

  removeAddresses() {
      this.addresses.removeAt(this.addresses.length - 1);
  }

  buildAddress(): FormGroup {
      return this.fb.group({
        addressId: 0,
        addressType: "home",
        isPrimary: false,
        doorNumber: ["", Validators.required],
        street: ["", Validators.required],
        landMark: ["", Validators.required],
        city: ["", Validators.required],
        state: ["", Validators.required],
        country: ["", Validators.required],
        pinCode: ["", Validators.required],
        customerId: "2728320"
      });
  }

  update() {
        this.submitted = true;
        this.loading = true;
        // reset alerts on submit
        this.alertService.clear();
        this.errorMessage = null;
        console.log("Form Value: " + JSON.stringify(this.updateAddressForm.value.address));
        this.newCustomer = this.updateAddressForm.value.address;
        console.log("Saved: new customer: " + JSON.stringify(this.newCustomer));
        this.customerService.updateEmail(this.newCustomer).subscribe({
          next: data => {
            this.newCustomer = data;
            this.updateAddressForm.reset();
            this.successMessage = "Email updated successful";
            console.log(data);
          },
          error: err => {
            this.errorMessage = err.error.error;
            console.log(this.errorMessage);
          }
        });
  }

}
