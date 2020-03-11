import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

import { startWith, map } from "rxjs/operators";
import { error } from "protractor";
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../_services/authentication.service';
import { PayeeService } from '../../../_services/payee.service';
import { ApiServiceService } from '../../../_services/api-service.service';

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
  txnUrl = `${environment.transactionServiceURL}` + "/transaction/";
  accountDetails: any[];

  constructor(
    private httpObj: HttpClient,
    private authenticationService: AuthenticationService,
    private payeeService: PayeeService,
    private apiService: ApiServiceService,
    private fb: FormBuilder
  ) {
    this.payeeCtrl = new FormControl();
    this.authenticationService.currentUser.subscribe(
      x => (this.cid = x.customerId)
    );
  }

  ngOnInit(): void {
    this.payeeService.getPayeeByCid(this.cid).subscribe(
      data => {
        this.payees = data;
      },
      err => {
        alert("Some Error Occurred!");
      }
    );

    this.apiService.getCustomerDetails(this.cid).subscribe(customer => {
      this.accountDetails = customer[0].account;
    });

    this.txnForm = this.fb.group({
      customerId: ["*", Validators.required],
      customerAccountNumber: ["*", Validators.required],
      payeeId: [0, Validators.required],
      transactionType: ["*", Validators.required],
      transactionAmount: [0.0, Validators.required]
    });
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

  saveThisPayee(pid: number, pname: string) {
    var x = document.getElementById("imgdiv");
    var y = document.getElementById("txndiv");
    y.style.display = "block";
    x.style.display = "none";

    this.pid = pid;
    this.pname = pname;
    this.populateForm();
  }

  populateForm() {
    this.txnForm = this.fb.group({
      customerId: [this.cid, Validators.required],
      customerAccountNumber: ["(required)", Validators.required],
      payeeId: [this.pid, Validators.required],
      transactionType: ["Debit", Validators.required],
      transactionAmount: [0.0, Validators.required]
    });
  }

  transaction() {
    this.httpObj.post(this.txnUrl, this.txnForm.value).subscribe({
      next: data => {
        this.successMessage = "Transaction Successfull";
      },
      error: err => {
        this.errorMessage = err.error.Message;
      }
    });
  }
}
