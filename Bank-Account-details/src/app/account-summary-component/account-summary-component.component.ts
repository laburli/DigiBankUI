import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { CreditDebitRequestDTO } from '../CreditDebitRequestDTO';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-account-summary-component',
  templateUrl: './account-summary-component.component.html',
  styleUrls: ['./account-summary-component.component.scss']
})
export class AccountSummaryComponentComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public loading = false;

  firstDisplayedColumns: string[] = ['totalDebitSum', 'totalCreditSum','availableBalance'];
  firstDataSource  ;

  secondDisplayedColumns: string[] = ['accountType', 'accountNumber','branchAddress','ifscCode'];
  secondDataSource : any ;

  thirdDisplayedColumns: string[] = ['currency', 'allBankAccount','allDepositAccount','allDematAccount','allLoanAccount','allCreditCardAccount'];
  thirdDataSource ;

 

  
   totalBankBalance : any;
   
   totalAvailableBalance:any;
   returnObj : any;
   acctDetails : any[];

   accountNumber : string ;
   customerDetails : any[];
   branchName : any;
   branchCity : any ;
   branchState : any ;
   branchCountry : any;
   ifscCode : any ;
   accountDetails : any[];
   accountType : any;

   accounts: any[] = [
    {value: 'Bank Account', viewValue: 'Bank Account'}
  ];

   creditDebitRequestDTO : CreditDebitRequestDTO ;
  
   ngOnInit(): void {
    
    this.creditDebitRequestDTO = new CreditDebitRequestDTO(); 
    this.creditDebitRequestDTO.customerId = "1";
    this.creditDebitRequestDTO.startDate = "06-05-2019";
    this.creditDebitRequestDTO.endDate = "06-05-2020";
    this.getActuallApiCall();
  }

  constructor(private apiService: ApiServiceService) { }

  @ViewChild('button') button: ElementRef;

  clickEvent(){
    this.getActuallApiCall();
  }

  getActuallApiCall(){
   // this.spinner.show();
   this.loading = true;

    this.apiService.getTotalDebitSum(this.creditDebitRequestDTO).subscribe(totalSumAmt => {
    this.apiService.getAvailableBalance(this.creditDebitRequestDTO.customerId).subscribe(avlBalance => {
      this.totalAvailableBalance = avlBalance;

      let firstModelData =  { totalDebitSum: totalSumAmt.debitSum, 
        totalCreditSum: totalSumAmt.creditSum ,
         availableBalance: this.totalAvailableBalance} ;
      
      const ELEMENT_DATA: FirstTableData[] = [
          firstModelData
      ];
      this.firstDataSource =  new MatTableDataSource(ELEMENT_DATA);
      this.totalBankBalance= totalSumAmt.creditSum - totalSumAmt.debitSum;

     },error => {
       console.error(JSON.stringify(error));
     });
    });

  

    this.apiService.getCustomerDetails(this.creditDebitRequestDTO.customerId).subscribe(customer => {
      this.customerDetails =customer;
      this.acctDetails = this.customerDetails[0].account;
      
      this.branchName =  this.acctDetails[0].branchName ;
      this.branchCity = this.acctDetails[0].branchCity;
      this.branchState =this.acctDetails[0].branchState;
      this.branchCountry =this.acctDetails[0].branchCountry ;
      this.ifscCode =  this.acctDetails[0].ifscCode;   
      this.accountNumber =  this.acctDetails[0].accountNumber;
      this.accountType  = this.acctDetails[0].accountType;

      const ELEMENT_DATA_SECOND: SecondTableData[] = [];

      this.acctDetails.forEach(acctDetails => {
       let model= { accountType: acctDetails.accountType, accountNumber: acctDetails.accountNumber ,
          branchAddress:  acctDetails.branchName + ","+  acctDetails.branchCity + ","
          +acctDetails.branchState + ","+acctDetails.branchCountry, 
          ifscCode:acctDetails.ifscCode, availableBalance: this.totalAvailableBalance };
          
          ELEMENT_DATA_SECOND.push(model);
      });
      this.secondDataSource =  new MatTableDataSource(ELEMENT_DATA_SECOND);

      const ELEMENT_DATA_THIRD: ThirdTableData[] = [
        { currency: 'INR', allBankAccount: this.totalBankBalance ,
        allDepositAccount: '1', allDematAccount: '0', allLoanAccount: '0',allCreditCardAccount: '0'  }
      ];

      this.thirdDataSource = new MatTableDataSource(ELEMENT_DATA_THIRD);
      this.loading = false;

        this.secondDataSource.paginator = this.paginator;

     
  });

  //this.spinner.hide();

 

    
  }
}

export interface FirstTableData {
  totalCreditSum: string;
  totalDebitSum: string;
  availableBalance : string;
}


export interface SecondTableData {
  accountType: string;
  accountNumber: string;
  branchAddress: string;
  ifscCode : string;
  availableBalance : string;
}




export interface ThirdTableData {
  currency: string;
  allBankAccount: string;
  allDepositAccount: string;
  allDematAccount : string;
  allLoanAccount : string;
  allCreditCardAccount : string;
}


