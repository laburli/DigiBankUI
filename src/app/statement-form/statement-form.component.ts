import { Component, OnInit, Input } from '@angular/core';
import { StatementService } from "../statement.service";
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from "@angular/common";
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { error } from 'protractor';
import { User } from '../_models/User';
import { AuthenticationService } from '../_services/authentication.service';
import { environment } from "./../../environments/environment";
import { CreditDebitRequestDTO } from '../CreditDebitRequestDTO';
import { ApiServiceService } from '../_services/api-service.service';
@Component({
  selector: 'statement-form',
  templateUrl: './statement-form.component.html',
  styleUrls: ['./statement-form.component.css']
})

export class StatementFormComponent implements OnInit {

  myForm: FormGroup;
  custId: string;
  accountNumber: number;
  startDate: string;
  endDate: string;
  maxDate: Date;
  disableSelect: boolean;
  flagValue: boolean;
  tabledata: any;
  errorMessage: any;
  disableDate: boolean;
  currentUser: User;
  creditDebitRequestDTO = new CreditDebitRequestDTO();;
  constructor(private svc: StatementService, private http: HttpClient, private route: ActivatedRoute,  private authenticationService: AuthenticationService, private service: ApiServiceService) {
    this.maxDate = new Date();
    this.currentUser = this.authenticationService.currentUserValue;
    this.custId = this.authenticationService.currentUserValue.customerId;

  }

  ngOnInit(): void {
   // this.accountNumber = parseInt(this.route.snapshot.paramMap.get('accNo'));
    this.myForm = new FormGroup({
      'startDate': new FormControl('', Validators.required),
      'endDate': new FormControl('', Validators.required),
      'monthsDD': new FormControl('')
    });
    
  }

  onChange(e) {
    var edate = new Date();
    var sdate = new Date().setMonth(edate.getMonth() - e);
    if (e == undefined) {
      this.disableDate = false;
      this.myForm.get('endDate').setValue(null);
      this.myForm.get('startDate').setValue(null);
    } else {
      this.myForm.get('endDate').setValue(edate);
      this.myForm.get('startDate').setValue(new Date(sdate));
      this.disableDate = true;
    }
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.tabledata = null;
    if (!this.myForm.get('startDate').value || !this.myForm.get('endDate').value) {
      alert('please select either both dates or months to view the statement');
      return;
    }
    if(this.myForm.get('startDate').value > this.myForm.get('endDate').value){
      alert('start date must be either less than or equal to end date. Please re-select the dates');
      return;
    }
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.creditDebitRequestDTO.customerId =  this.custId;
    this.creditDebitRequestDTO.startDate = formatDate(this.myForm.get('startDate').value, format, locale);
    this.creditDebitRequestDTO.endDate = formatDate(this.myForm.get('endDate').value, format, locale);
    console.log(JSON.stringify(this.creditDebitRequestDTO));
    this.service.getViewStatement(this.creditDebitRequestDTO).subscribe({
      next: (data) => { this.tabledata = data },
      error: err => { 
        this.errorMessage = "There is no Transaction associated with your Customer Id:"+this.custId 
      }
    }
    );
  }



  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (this.myForm.get('startDate').value != null || this.myForm.get('endDate').value != null) {
      this.flagValue = true;
    } else {
      this.flagValue = false;
    }

  }

}
