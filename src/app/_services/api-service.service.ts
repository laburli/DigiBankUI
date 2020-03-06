import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
//import { Observable } from 'rxjs';
//import { of } from 'rxjs';
import { Observable } from "rxjs";
import { formatDate } from "@angular/common";
import { CreditDebitRequestDTO } from "../CreditDebitRequestDTO";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  getTotalDebitSum(
    creditDebitRequestDTO: CreditDebitRequestDTO
  ): Observable<any> {
    let appHeader = new HttpHeaders();
    appHeader.append("Content-Type", "application/json");
    const format = "yyyy-MM-dd";
    const locale = "en-US";

    return this.http.post(
      `${environment.transactionServiceURL}` +
        "/transaction/viewCreditDebitSum",
      {
        customerId: creditDebitRequestDTO.customerId,
        startDate: formatDate(creditDebitRequestDTO.startDate, format, locale),
        endDate: formatDate(creditDebitRequestDTO.endDate, format, locale)
      }
    );
  }

  getAvailableBalance(accNum: string) {
    return this.http.get(
      `${environment.customerServiceURL}` + "/transaction/getBalance/${accNum}"
    );
  }

  getCustomerDetails(customerid: string): Observable<any> {
    return this.http.post(
      `${environment.customerServiceURL}` + "/api/searchCustomer",
      {
        customerId: customerid
      }
    );
  }

  getViewStatement( creditDebitRequestDTO: CreditDebitRequestDTO): Observable<any> {
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    return this.http.post(
      `${environment.transactionServiceURL}` +'/transaction/viewStatement',
      {
        "customerId": creditDebitRequestDTO.customerId,
        "startDate":creditDebitRequestDTO.startDate,
        "endDate": creditDebitRequestDTO.endDate
      }
    );
  }
}
