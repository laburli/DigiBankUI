import { Component, OnInit, Input } from '@angular/core';

export class Transaction {
  transactionId: any;
  transactionType: any;
  availableBalance: any;
  transactionAmount: any;
  payeeName: any;
  transactionTime: any;
  customerId: any;
  payeeId: any;
  customerAccountNumber: any;
}

const ELEMENT_DATA: Transaction[] = [];
@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['transactionId', 'transactionType', 'payeeName', 'transactionAmount', 'transactionTime', 'availableBalance'];

  @Input()
  dataSource;
  constructor() { }

  ngOnInit(): void {
  }
}
