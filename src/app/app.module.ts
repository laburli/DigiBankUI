import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PersonalComponent } from './personal/personal.component';
import {RouterModule,Routes} from '@angular/router';
import { PrivilegeComponent } from './privilege/privilege.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { WealthComponent } from './wealth/wealth.component';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../_helpers/error.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';
import { fakeBackendProvider } from '../_helpers/fake-backend';
import { BankingComponent } from './banking/banking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { DemoMaterialModule } from './material-module';
import { ScrollSlideshowComponent } from './scroll-slideshow/scroll-slideshow.component';
import { ScrollSlideshowItemComponent } from './scroll-slideshow-item/scroll-slideshow-item.component';
import { MouseWheelDirective } from './mouse-wheel.directive';
import { CustomerComponent } from './customers/customer.component';
import { StatementFormComponent } from './statement-form/statement-form.component';
import { TableComponent } from './table/table.component';
import { StatementService } from './statement.service';
import { MatSelectModule } from '@angular/material/select';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AccountSummaryComponentComponent } from './account-summary-component/account-summary-component.component';


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
    AccountSummaryComponentComponent
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
    MatSelectModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff', 
        secondaryColour: '#ffffff', 
        tertiaryColour: '#ffffff'
    }),
   ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,StatementService
  ],
  bootstrap: [AppComponent],
  
})


  

export class AppModule {






 }
