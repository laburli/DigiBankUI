import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payee } from './add-payee/payee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  body: any;
  payeeBaseUrl:string = "http://localhost:8080/payee/";

  constructor(private http: HttpClient) { }

  getPayeeByCid(cid: string) {
    return this.http.get( this.payeeBaseUrl + cid)
  }

  addPayee(p: Payee) {
    console.log('Inside Add payee method in Service', p);
    return this.http.post<Payee>(this.payeeBaseUrl, p).subscribe(data => {
      console.log(data)
      console.log(data['name'])
      alert('Successfully added the Payee: ' + data['name'])
    }, err => {
      console.log(err)
    })
  }

  activatePayee(pid: number) {
    return this.http.put(this.payeeBaseUrl+'activate/' + pid, this.body)
  }

  getPayeeByPID(pid) {
    console.log('Inside getPayeeByPID of Service Class' + pid)
    return this.http.get(this.payeeBaseUrl, { params: { 'pid': pid } })
  }

  updatePayee(pId: number, p: Payee) {
    console.log('Inside Update payee method in Service', p);
    return this.http.put<Payee>(this.payeeBaseUrl + pId, p);
  }

  deletePayee(pid: number) {
    return this.http.delete(this.payeeBaseUrl + pid)
  }
}
