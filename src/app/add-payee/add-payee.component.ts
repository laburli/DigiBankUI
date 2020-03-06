import { Component, OnInit } from "@angular/core";
import { PayeeService } from "../_services/payee.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthenticationService } from "../_services/authentication.service";

@Component({
  selector: "app-add-payee",
  templateUrl: "./add-payee.component.html",
  styleUrls: ["./add-payee.component.css"]
})
export class AddPayeeComponent implements OnInit {
  payeeForm: FormGroup;
  cid: string;
  successMessage: string;
  errorMessage: any;

  constructor(
    private _http: PayeeService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.cid = x.customerId)
    );
  }
  ngOnInit(): void {
    this.payeeForm = this.fb.group({
      customerId: [this.cid, Validators.required],
      name: ["", Validators.required],
      nickName: ["", Validators.required],
      payeeBankIFSC: ["", Validators.required],
      payeeBankAddress: ["", Validators.required],
      payeeBankName: ["", Validators.required],
      payeeBankCity: ["", Validators.required],
      payeeAccountNumber: ["", Validators.required]
    });
  }

  addPayeeOnClick() {
    this._http.addPayee(this.payeeForm.value).subscribe({
      next: data => {
        this.payeeForm.reset();
        this.successMessage = "Payee added successfully";
      },
      error: err => {
        this.errorMessage = err.Message;
      }
    });
  }
}
