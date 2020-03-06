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

  constructor(private http: HttpClient) { }

  saveCustomer(customer: Customer): Observable<Customer> {
    const url = this.baseUrl + "/save-customer-details";
    return this.http.post<Customer>(url, customer);
  }
}
