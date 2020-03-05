import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { AuthenticationService } from "../../_services/authentication.service";

import { Payee } from "./../../_models/payee";
import { User } from "./../../_models/User";
import { startWith, map } from "rxjs/operators";
import { environment } from "./../../../environments/environment";
import { PayeeService } from "./../../_services/payee.service";

@Component({
  selector: "app-send-money",
  templateUrl: "./send-money.component.html",
  styleUrls: ["./send-money.component.css"]
})
export class SendMoneyComponent implements OnInit {
  cid: string;
  payees: any[];
  payeeCtrl: FormControl;
  filteredPayees: Observable<any[]>;

  constructor(
    private httpObj: HttpClient,
    private authenticationService: AuthenticationService,
    private payeeService: PayeeService
  ) {
    console.log("constructor");
    this.payeeCtrl = new FormControl();
    this.authenticationService.currentUser.subscribe(
      x => (this.cid = x.customerId)
    );
  }

  ngOnInit(): void {
    console.log("init");
    console.log(this.payees);
    this.payeeService
      .getPayeeByCid(this.cid)
      .subscribe(data => (this.payees = data));
  }

  observeChanges() {
    this.filteredPayees = this.payeeCtrl.valueChanges.pipe(
      startWith(""),
      map(state => (state ? this.filterPayees(state) : this.payees.slice()))
    );
  }

  filterPayees(name: string) {
    return this.payees.filter(
      payee =>
        payee.name.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
        payee.payeeAccountNumber.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
}
