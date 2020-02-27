import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ApiServiceService } from './api-service.service';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material.module';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AccountSummaryComponentComponent } from './account-summary-component/account-summary-component.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountSummaryComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff', 
        secondaryColour: '#ffffff', 
        tertiaryColour: '#ffffff'
    })
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
