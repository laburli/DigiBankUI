import { Component, OnInit } from '@angular/core';
import { PayeeService } from '../payee.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-payee',
  templateUrl: './add-payee.component.html',
  styleUrls: ['./add-payee.component.css']
})
export class AddPayeeComponent implements OnInit {

  payeeForm: FormGroup;

  constructor(private payee_http: PayeeService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.payeeForm = this.fb.group({
      customerId: ['1132738', Validators.required],
      name: ['', Validators.required],
      nickName: ['', Validators.required],
      payeeBankIFSC: ['', Validators.required],
      payeeBankAddress: ['', Validators.required],
      payeeBankName: ['', Validators.required],
      payeeBankCity: ['', Validators.required],
      payeeAccountNumber: ['', Validators.required]
    });
  }

  addPayeeOnClick() {
    console.log("hi");
    this.payee_http.addPayee(this.payeeForm.value);
    console.log(this.payeeForm.value);
  }
}
