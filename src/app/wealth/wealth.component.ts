import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-wealth',
  templateUrl: './wealth.component.html',
  styleUrls: ['./wealth.component.css']
})
export class WealthComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  // openLogin(){
  //   this.router.navigate(['/login']);
  // }
  

}
