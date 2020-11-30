import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {CarUpdateComponent} from './profile/cars/car-update/car-update.component';
import {QuoteBlockComponent} from './quote-block/quote-block.component';
import {CarListComponent} from './profile/cars/car-list/car-list.component';
import {InsuranceListComponent} from './profile/insurance/insurance-list/insurance-list.component';
import {ClaimListComponent} from './profile/claim/claim-list/claim-list.component';
import {ClaimComponent} from './claim/claim.component';
import {TestCommand} from '@angular/cli/commands/test-impl';
import {TestComponent} from './test/test.component';
import {QuoteComponent} from './quote/quote.component';
import {DashboardComponent} from './analysis/dashboard/dashboard.component';
import {PaymentComponent} from './payment/payment.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './auth.guard';
import {AdminProfileComponent} from './admin/profile/profile.component';
import {CheckHistoryComponent} from './admin/check-history/check-history.component';
import {CheckInsuranceComponent} from './admin/check-insurance/check-insurance.component';
import {CheckClaimComponent} from './admin/check-claim/check-claim.component';
import {ChangePasswordComponent} from './profile/change-password/change-password.component';
import {ChangeEmailComponent} from './profile/change-email/change-email.component';

// @ts-ignore
// @ts-ignore
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: QuoteBlockComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'updateCar/:id',
    component: CarUpdateComponent
  },
  {
    path: 'listCar/:id',
    component: CarListComponent
  },
  {
    path: 'listClaim/:id',
    component: ClaimListComponent
  },
  {
    path: 'listInsur',
    component: InsuranceListComponent
  },
  {
    path: 'claim',
    component: ClaimComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'quote',
    component: QuoteComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'card/:id',
    component: PaymentComponent
  },
  {
    path: 'adminProfile/:id',
    component: AdminProfileComponent
  },
  {
    path: 'checkHistory/:id',
    component: CheckHistoryComponent
  },
  {
    path: 'checkInsurance/:id',
    component: CheckInsuranceComponent
  },
  {
    path: 'checkClaim/:id',
    component: CheckClaimComponent
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'changePsw',
    component: ChangePasswordComponent
  },
  {
    path: 'changeEmail',
    component: ChangeEmailComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
