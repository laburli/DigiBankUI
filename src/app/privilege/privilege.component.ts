import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.css']
})
export class PrivilegeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  // openLogin(){
  //   this.router.navigate(['/login'])
  // }

}
