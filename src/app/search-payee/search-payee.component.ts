import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';

import {Payee} from './../_models/Payee';
import { User } from './../_models/User';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search-payee',
  templateUrl: './search-payee.component.html',
  styleUrls: ['./search-payee.component.css']
})
export class SearchPayeeComponent implements OnInit {

    customerId: User;
    payees: any[];

    payeeCtrl: FormControl;
    filteredPayees: Observable<any[]>;

    constructor(private httpObj: HttpClient,
                private router: Router,
                private authenticationService: AuthenticationService) {
        console.log("constructor");
        this.payeeCtrl = new FormControl();
        this.authenticationService.customerId.subscribe(x => this.customerId = x);
     }

    ngOnInit() {
        console.log("init");
        console.log(this.payees);
        this.httpObj.get<Payee[]>("http://localhost:8080/payee/" + this.customerId).subscribe((data) => {
                    this.payees = data;
                    console.log(this.payees);
                });
    }

    observeChanges() {
        this.filteredPayees = this.payeeCtrl.valueChanges
            .startWith(null)
            .map(state => state ? this.filterPayees(state) : this.payees.slice());
    }

    filterPayees(name: string) {
        return this.payees.filter(payee =>
          payee.name.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
                payee.payeeAccountNumber.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
}
