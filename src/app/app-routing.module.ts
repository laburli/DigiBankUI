import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PersonalComponent } from './personal/personal.component';
import { PrivilegeComponent } from './privilege/privilege.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { WealthComponent } from './wealth/wealth.component';
import { BankingComponent } from './banking/banking.component';
import { CustomerComponent } from './customers/customer.component';
import { StatementFormComponent } from './statement-form/statement-form.component';
import { RechargeNowComponent } from './navbar/recharge-now/recharge-now.component';
import { SendMoneyComponent } from './navbar/send-money/send-money.component';
import { PayMoneyComponent } from './navbar/pay-money/pay-money.component';
import { OpenWishComponent } from './navbar/open-wish/open-wish.component';
import { AccountSummaryComponentComponent } from './account-summary-component/account-summary-component.component';
import { ViewPayeeComponent } from './view-payee/view-payee.component';
import { AddPayeeComponent } from './add-payee/add-payee.component';




const routes: Route[] = [
    { path: 'viewStatement', component: StatementFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: CustomerComponent },
    { path: '', redirectTo: '/personal', pathMatch: 'full' },
    { path: 'personal', component: PersonalComponent },
    { path: 'privilege', component: PrivilegeComponent },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'wealth', component: WealthComponent },
    { path: 'banking', component: BankingComponent },
    { path: 'RechargeNow', component: RechargeNowComponent },
    { path: 'SendMoney', component: SendMoneyComponent },
    { path: 'AccountSummary', component: AccountSummaryComponentComponent },
    { path: 'OpenWish', component: OpenWishComponent },
    { path: 'payeeList', component: ViewPayeeComponent },
    { path: 'addPayee', component: AddPayeeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
