import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PersonalComponent } from './personal/personal.component';
import { PrivilegeComponent } from './privilege/privilege.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { WealthComponent } from './wealth/wealth.component';
import { BankingComponent } from './banking/banking.component';
import { CustomerComponent } from './customers/customer.component';
import { StatementFormComponent } from './statement-form/statement-form.component';
import { AccountSummaryComponentComponent } from './account-summary-component/account-summary-component.component';

 

const routes: Route[] = [
    {path:'viewStatement', component: StatementFormComponent},  
    {path:'accountSummary/:customerId', component: AccountSummaryComponentComponent},             
{path:'login', component:LoginComponent},
 {path:'home',component:HomeComponent},
 {path:'register',component:CustomerComponent},
{path:'',redirectTo:'/personal', pathMatch:'full'},
 {path:'personal',component:PersonalComponent},
 {path:'privilege',component:PrivilegeComponent},
{path:'aboutus',component:AboutusComponent},
{path:'wealth',component:WealthComponent},
{path:'**',redirectTo:'banking', pathMatch:'full'},
{path:'banking',component:BankingComponent}

];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule {
   
 } 
 