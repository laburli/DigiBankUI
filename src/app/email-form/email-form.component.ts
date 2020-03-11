import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray
} from "@angular/forms";

import { Customer } from "../customers/customer";
import { User } from "../_models/User";

import { Router } from "@angular/router";
import { AlertService } from "../_services/alert.service";
import { AuthenticationService } from './../_services/authentication.service';
import { CustomerService } from "../customers/customer.service";

/*function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get("email").get("emailAddress");

  if (emailControl.pristine) {
    return null;
  }
  return { match: true };
}*/

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  updateEmailForm: FormGroup;
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
    private customerService: CustomerService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser);

    this.customerService.getCustomerDetails(this.currentUser).subscribe(
         data => {
              this.customerDetails = data[0];
              console.log(this.customerDetails);
              //this.updatePhoneForm.patchValue({phoneNumber: this.customerDetails.phoneNumber});
              this.customerDetails.email.forEach((x) => {
                  this.emails.push(this.fb.group(new Customer(x)));
              })
         },
         err => {
             alert("Some Error Occurred!");
             console.log(err);
         }
    );

    this.updateEmailForm = this.fb.group({
          email: this.fb.array([])
    });
  }

  /*private validationMessages = {
      required: "Please enter your email address.",
      email: "Please enter a valid email address."
  };*/

  get emails(): FormArray {
      return this.updateEmailForm.get("email") as FormArray;
  }

  get e(): any {
      // return this.customerForm.controls;
      return (this.updateEmailForm.get("email") as FormArray).controls;
  }

  addEmails(): void {
      this.emails.push(this.buildEmails());
  }

  removeItem() {
      this.emails.removeAt(this.emails.length - 1);
  }

  buildEmails(): FormGroup {
      return this.fb.group({
        emailId: 0,
        emailType: "home",
        isPrimaryEmail: false,
        emailAddress: ["", [Validators.required, Validators.email]],
        customerId: "2728320"
      });
  }

  /*setMessage(c: AbstractControl): void {
      this.emailMessage = "";
      if ((c.touched || c.dirty) && c.errors) {
        this.emailMessage = Object.keys(c.errors)
          .map(key => this.validationMessages[key])
          .join(" ");
      }
  }*/

  update() {
      this.submitted = true;
      this.loading = true;
      // reset alerts on submit
      this.alertService.clear();
      this.errorMessage = null;
      console.log("Form Value: " + JSON.stringify(this.updateEmailForm.value.email));
      this.newCustomer = this.updateEmailForm.value.email;
      console.log("Saved: new customer: " + JSON.stringify(this.newCustomer));
      this.customerService.updateEmail(this.newCustomer).subscribe({
        next: data => {
          this.newCustomer = data;
          this.updateEmailForm.reset();
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
