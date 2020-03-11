import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray
} from "@angular/forms";
import { first } from "rxjs/operators";
import { debounceTime } from "rxjs/operators";

import { Customer } from "./customer";
import { CustomerService } from "./customer.service";
import { Router } from "@angular/router";
import { UserService } from "../_services/user.service";
import { User } from "../_models/User";
import { AlertService } from "../_services/alert.service";
import { AuthenticationService } from "../_services/authentication.service";
import { environment } from "./../../environments/environment";

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get("email").get("emailAddress");

  if (emailControl.pristine) {
    return null;
  }
  return { match: true };
}

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  customerForm: FormGroup;
  private newCustomer: Customer = new Customer();
  emailMessage: string;
  errorMessage: string;
  successMessage: string;
  loading = false;
  submitted = false;
  private newUser = new User();

  get addresses(): FormArray {
    return this.customerForm.get("address") as FormArray;
  }

  get emails(): FormArray {
    return this.customerForm.get("email") as FormArray;
  }
  get phoneNumbers(): FormArray {
    return this.customerForm.get("phoneNumber") as FormArray;
  }

  private validationMessages = {
    required: "Please enter your email address.",
    email: "Please enter a valid email address."
  };

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/banking"]);
    }
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      customerStatus: "active",
      customerId: "",
      customerName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.maxLength(50)]],
      middleName: ["", [Validators.required, Validators.maxLength(50)]],
      address: this.fb.array([this.buildAddress()]),
      email: this.fb.array([this.buildEmails()]),
      phoneNumber: this.fb.array([this.buildPhoneNumbers()])
    });
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  addEmails(): void {
    this.emails.push(this.buildEmails());
  }

  addPhoneNumbers(): void {
    this.phoneNumbers.push(this.buildPhoneNumbers());
  }

  removeItem() {
    this.emails.removeAt(this.emails.length - 1);
  }
  removephoneNumbers() {
    this.phoneNumbers.removeAt(this.phoneNumbers.length - 1);
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
      pinCode: ["", Validators.required]
    });
  }

  buildEmails(): FormGroup {
    return this.fb.group({
      emailId: 0,
      emailType: "home",
      isPrimaryEmail: false,
      emailAddress: ["", [Validators.required, Validators.email]]
    });
  }

  buildPhoneNumbers(): FormGroup {
    return this.fb.group({
      phoneNumberId: "0",
      phoneNumberType: "home",
      isPrimaryNumber: false,
      number: ["", Validators.required],
      countryCode: ["", Validators.required],
      cityCode: ["", Validators.required]
    });
  }

  get f(): any {
    // return this.customerForm.controls;
    return (this.customerForm.get("address") as FormArray).controls;
  }

  get p(): any {
    // return this.customerForm.controls;
    return (this.customerForm.get("phoneNumber") as FormArray).controls;
  }

  get e(): any {
    // return this.customerForm.controls;
    return (this.customerForm.get("email") as FormArray).controls;
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = "";
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(" ");
    }
  }
  save() {
    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    this.errorMessage = null;
    // this.newCustomer = <Customer> this.customerForm.value;
    console.log(this.customerForm);
    console.log("Saved: " + JSON.stringify(this.customerForm.value));
    console.log("Saved: " + JSON.stringify(this.newCustomer));
    this.newCustomer = new Customer(this.customerForm.value);
    console.log("Saved customer: " + JSON.stringify(this.newCustomer));
    this.customerService.saveCustomer(this.newCustomer).subscribe({
      next: data => {
        this.newCustomer = data;
        this.customerForm.reset();
        this.successMessage = "Customer creation sucess";
        this.callUserService(data);
        console.log(data);
      },
      error: err => {
        this.errorMessage = err.error.errorMessage;

        console.log(this.errorMessage);
      }
    });
  }

  callUserService(customer: Customer) {
    this.newUser.firstName = customer.customerName;
    this.newUser.lastName = customer.lastName;
    this.newUser.password = `${environment.otp}`;
    this.newUser.username = customer.customerName;
    this.newUser.customerId = customer.customerId;
    this.newUser.customer = customer;
    console.log("customer::::" + JSON.stringify(customer));
    console.log("user customer::::" + JSON.stringify(this.newUser.customer));
    this.userService
      .register(this.newUser)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("Registration successful", true);
          this.router.navigate(["/login"]);
          console.log("user info:" + data);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          console.log(error);
        }
      );
  }
}
