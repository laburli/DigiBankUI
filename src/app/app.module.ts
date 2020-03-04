import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule,Routes } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DemoMaterialModule } from './material-module';
import { MatSelectModule } from '@angular/material/select';

import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../_helpers/error.interceptor';

import { fakeBackendProvider } from '../_helpers/fake-backend';
import { MouseWheelDirective } from './mouse-wheel.directive';
import { StatementService } from './statement.service';

import { AppComponent } from './app.component';
import { PersonalComponent } from './personal/personal.component';
import { PrivilegeComponent } from './privilege/privilege.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { WealthComponent } from './wealth/wealth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';
import { BankingComponent } from './banking/banking.component';

import { ScrollSlideshowItemComponent } from './scroll-slideshow-item/scroll-slideshow-item.component';
import { ScrollSlideshowComponent } from './scroll-slideshow/scroll-slideshow.component';
import { CustomerComponent } from './customers/customer.component';
import { StatementFormComponent } from './statement-form/statement-form.component';
import { TableComponent } from './table/table.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RechargeNowComponent } from './navbar/recharge-now/recharge-now.component';
import { SendMoneyComponent } from './navbar/send-money/send-money.component';
import { PayMoneyComponent } from './navbar/pay-money/pay-money.component';
import { OpenWishComponent } from './navbar/open-wish/open-wish.component';
import { AddPayeeComponent } from './add-payee/add-payee.component';
import { ViewPayeeComponent } from './view-payee/view-payee.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonalComponent,
    PrivilegeComponent,
    AboutusComponent,
    WealthComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    HomeComponent,
    BankingComponent,ScrollSlideshowComponent,
    ScrollSlideshowItemComponent,
    MouseWheelDirective,
    CustomerComponent,
    StatementFormComponent,
    TableComponent,
    NavbarComponent,
    RechargeNowComponent,
    SendMoneyComponent,
    PayMoneyComponent,
    OpenWishComponent,
    AddPayeeComponent,
    ViewPayeeComponent,
   ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    DemoMaterialModule,
    MatSelectModule
   ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,StatementService
  ],
  bootstrap: [AppComponent],

})

export class AppModule {
 }
