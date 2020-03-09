import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

import { Observable, of, Subject, BehaviorSubject, throwError } from "rxjs";

import { catchError, tap } from "rxjs/operators";

import { Customer } from "./customer";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  // private customer: Customer;
  private baseUrl = `${environment.customerServiceURL}` + "/api/";

  constructor(private http: HttpClient) {}

  getCustomerDetails(customer) {
  console.log("inside method")
    const url = this.baseUrl + "search/" + customer.customerId + "/" + customer.username;
    return this.http.get<Customer>(url);
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    console.log("inside save before call" + customer);
    const url = this.baseUrl + "/save-customer-details";
    return this.http.post<Customer>(url, customer);
  }

  updatePhoneNumber(customer: Customer): Observable<Customer> {
      console.log("inside update before call" + customer);
      const url = this.baseUrl + "update-phonenumber-details";
      return this.http.put<Customer>(url, customer);
  }
}
