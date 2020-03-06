import { Component, OnInit } from '@angular/core';
import { PayeeService } from '../_services/payee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-view-payee',
  templateUrl: './view-payee.component.html',
  styleUrls: ['./view-payee.component.css']
})
export class ViewPayeeComponent implements OnInit {
  headElements = ['Sl no.', 'A/I', 'Payee Details', 'Modify', 'Delete'];
  payees: Object;
  cid: string;
  payeeForm: FormGroup;
  pid: number = 0;
  successMessage: string;
  errorMessage: any;

  constructor(private _http: PayeeService, private fb: FormBuilder, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.cid = x.customerId);
  }

  ngOnInit(): void {
    this._http.getPayeeByCid(this.cid).subscribe(data => {
      this.payees = data
    }, err => {
      alert('Some Error Occurred!')
    });

    this.payeeForm = this.fb.group({
      customerId: ['*', Validators.required],
      name: ['*', Validators.required],
      nickName: ['*', Validators.required],
      payeeBankIFSC: ['*', Validators.required],
      payeeBankAddress: ['*', Validators.required],
      payeeBankName: ['*', Validators.required],
      payeeBankCity: ['*', Validators.required],
      payeeAccountNumber: ['*', Validators.required]
    })
  }

  activateButton(x: string) {
    return x !== "Active";
  }

  onClickActivate(pid: number, pname: string) {
    if (confirm("Are you sure to Activate the Payee : " + pname)) {
      this._http.activatePayee(pid).subscribe(data => {
        if (data == "OK")
          this.successMessage = "Payee " + pname + " Activated! Now you can start transferring funds.";
        alert(this.successMessage);
      },
        err => {
          this.errorMessage = err.Message;
          alert(this.errorMessage);
        });

    }
  }

  onClickDelete(pid: number, pname: string) {
    if (confirm("Are you sure to delete the Payee : " + pname)) {
      this._http.deletePayee(pid).subscribe(data => {
        if (data == "OK")
          this.successMessage = "Deleted the Payee : " + pname + " with ID : " + pid + " successfully!";
        alert(this.successMessage);
        window.location.reload();
      },
        err => {
          this.errorMessage = err.Message;
          alert(this.errorMessage);
        });

    }
  }
  
  populateEditForm(pid: number) {
    this._http.getPayeeByPID(pid).subscribe(
      data => {
        this.payeeForm = this.fb.group({
          customerId: [this.cid, Validators.required],
          name: [data['name'], Validators.required],
          nickName: [data['nickName'], Validators.required],
          payeeBankIFSC: [data['payeeBankIFSC'], Validators.required],
          payeeBankAddress: [data['payeeBankAddress'], Validators.required],
          payeeBankName: [data['payeeBankName'], Validators.required],
          payeeBankCity: [data['payeeBankCity'], Validators.required],
          payeeAccountNumber: [data['payeeAccountNumber'], Validators.required]
        })
        this.pid = data['payeeId'];
      },
      err => {
        this.errorMessage = err.Message;
        alert(this.errorMessage);
      });
  }

  updatePayeeOnClick() {
    this._http.updatePayee(this.pid, this.payeeForm.value).subscribe(data => {
      this.successMessage = "Successfully Updated the Payee: " + data['name'];
      alert(this.successMessage);
      window.location.reload();
    }, err => {
      this.errorMessage = err.Message;
      alert(this.errorMessage);
    });
  }
}
