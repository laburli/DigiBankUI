import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "../../_services/authentication.service";
import { ApiServiceService } from "../../_services/api-service.service";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

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
  errorMessage: string;
  successMessage: string;
  cid: string;
  payees: any;
  pid: number;
  pname: string;
  payeeCtrl: FormControl;
  filteredPayees: Observable<any[]>;
  txnForm: FormGroup;
  txnUrl = "http://localhost:8090/transaction/";
  accountDetails: any[];

  constructor(
    private httpObj: HttpClient,
    private authenticationService: AuthenticationService,
    private payeeService: PayeeService,
    private apiService: ApiServiceService,
    private fb: FormBuilder
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
    this.payeeService.getPayeeByCid(this.cid).subscribe(
      data => {
        this.payees = data;
        console.log(this.payees);
      },
      err => {
        alert("Some Error Occurred!");
        console.log(err);
      }
    );
    this.txnForm = this.fb.group({
      customerId: ["*", Validators.required],
      customerAccountNumber: ["*", Validators.required],
      payeeId: [0, Validators.required],
      transactionType: ["*", Validators.required],
      transactionAmount: [0.0, Validators.required]
    });
    console.log(this.txnForm);
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

  getAccounts() {
    this.apiService.getCustomerDetails(this.cid).subscribe(customer => {
      console.log(customer);
      this.accountDetails = customer["account"];
      console.log(this.accountDetails);
    });
  }

  saveThisPayee(pid: number, pname: string) {
    var x = document.getElementById("imgdiv");
    var y = document.getElementById("txndiv");
    y.style.display = "block";
    x.style.display = "none";

    this.pid = pid;
    this.pname = pname;
    // this.getAccounts();
    this.populateForm();
    console.log("pid:" + this.pid + "pname:" + this.pname);
  }

  populateForm() {
    this.txnForm = this.fb.group({
      customerId: [this.cid, Validators.required],
      customerAccountNumber: ["(required)", Validators.required],
      payeeId: [this.pid, Validators.required],
      transactionType: ["Debit", Validators.required],
      transactionAmount: [0.0, Validators.required]
    });

    console.log(this.txnForm.value);
  }

  transaction() {
    console.log(this.txnForm.value);
    this.httpObj.post(this.txnUrl, this.txnForm.value).subscribe({
      next: data => {
        this.successMessage = "Transaction successfull";
        console.log(data);
      },
      error: err => {
        this.errorMessage = err;
        console.log(this.errorMessage);
      }
    });
  }
}
