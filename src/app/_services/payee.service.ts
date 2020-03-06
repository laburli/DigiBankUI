import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Payee } from "../_models/payee";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PayeeService {
  body: any;
  payeeBaseURL = `${environment.transactionServiceURL}` + "/payee/";
  constructor(private http: HttpClient) {}

  getPayeeByCid(cid: string): Observable<Payee[]> {
    return this.http.get<Payee[]>(this.payeeBaseURL + cid);
  }

  addPayee(p: Payee): Observable<Payee> {
    console.log("Inside Add payee method in Service", p);
    return this.http.post<Payee>(this.payeeBaseURL, p);
  }

  activatePayee(pid: number) {
    return this.http.put(this.payeeBaseURL + "activate/" + pid, this.body);
  }

  getPayeeByPID(pid) {
    console.log("Inside getPayeeByPID of Service Class" + pid);
    return this.http.get(this.payeeBaseURL, { params: { pid: pid } });
  }

  updatePayee(pId: number, p: Payee) {
    console.log("Inside Update payee method in Service", p);
    return this.http.put<Payee>(this.payeeBaseURL + pId, p);
  }

  deletePayee(pid: number) {
    return this.http.delete(this.payeeBaseURL + pid);
  }
}
