import { Component, OnInit } from '@angular/core';
import { PayeeService } from '../payee.service';
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

  constructor(private payee_http: PayeeService, private fb: FormBuilder, private authenticationService: AuthenticationService) {
  this.authenticationService.currentUser.subscribe(x => this.cid = x.customerId);
  }

  ngOnInit(): void {
    this.payee_http.getPayeeByCid(this.cid).subscribe(data => {
      this.payees = data
      console.log(this.payees);
    }, err => { alert(err) });

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
    console.log(this.payeeForm.value);
  }

  activateButton(x: string) {
    return x !== "Active";
  }

  onClickActivate(pid: number, pname: string) {
    if (confirm("Are you sure to Activate the Payee : " + pname)) {
      this.payee_http.activatePayee(pid).subscribe(data => {
        if (data == "OK")
          alert("Payee " + pname + " Activated! Now you can start transferring funds.")
        window.location.reload();
      }, err => { alert(err) });

    }
  }

  onClickDelete(pid: number, pname: string) {
    if (confirm("Are you sure to delete the Payee : " + pname)) {
      this.payee_http.deletePayee(pid).subscribe(data => {
        if (data == "OK")
          alert("Deleted the Payee : " + pname + " with ID : " + pid + " successfully!")
        window.location.reload();
      }, err => { alert(err) });

    }
  }
  populateEditForm(pid: number) {
    console.log('Inside Populate Edit Form');
    this.payee_http.getPayeeByPID(pid).subscribe(
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
      err => { console.log(err) }
    );
  }

  updatePayeeOnClick() {
    this.payee_http.updatePayee(this.pid, this.payeeForm.value).subscribe(data => {
      console.log(data['name'])
      alert('Successfully Updated the Payee: ' + data['name'])
      window.location.reload();
    }, err => { console.log(err) })

  }
}
