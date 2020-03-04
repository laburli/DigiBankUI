import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { Observable } from 'rxjs';
//import { of } from 'rxjs';
import { Observable  } from 'rxjs';
import { formatDate } from "@angular/common";
import { CreditDebitRequestDTO } from '../CreditDebitRequestDTO';



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private http: HttpClient
  ) { }

  


  getTotalDebitSum(creditDebitRequestDTO : CreditDebitRequestDTO ) : Observable<any>{
    let appHeader = new HttpHeaders();
    appHeader.append('Content-Type', 'application/json');
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';

    return this.http.post('http://localhost:8080/transaction/viewCreditDebitSum',{
      "customerId": creditDebitRequestDTO.customerId,
      "startDate": formatDate(creditDebitRequestDTO.startDate, format, locale),
      "endDate": formatDate(creditDebitRequestDTO.endDate, format, locale)
  });

  }

    getAvailableBalance(accNum : string){
    let appHeader = new HttpHeaders();
    appHeader.append('Content-Type', 'application/json');
    appHeader.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    appHeader.append('Access-Control-Allow-Credentials', 'true');
    return this.http.get(`http://localhost:8080/transaction/getBalance/${accNum}`,{headers : appHeader});
    }

    getCustomerDetails(customerid : string) : Observable<any>{
      let appHeader = new HttpHeaders();
      appHeader.append('Content-Type', 'application/json');
      appHeader.append('Access-Control-Allow-Origin', 'http://localhost:6060');
      appHeader.append('Access-Control-Allow-Credentials', 'true');
      return this.http.post(`http://localhost:6060/customer-service/api/searchCustomer`,{
        "customerId": customerid
     });
 
    }
     

  }

   




