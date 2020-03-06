import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
  }
  // openLogin(){
  // this.router.navigate(['login']);  
  // //window.location.href='/login';
  // }

}
