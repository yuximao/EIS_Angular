import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {CustomStyleModule} from './shared/models/custom-style/custom-style.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './shared/services/authService';
import {HttpClientModule} from '@angular/common/http';
import { QuoteBlockComponent } from './quote-block/quote-block.component';
import { RegisterComponent } from './register/register.component';
import {HomeComponent} from './home/home.component';
import {RepeatValidatorDirective} from './register/RepeatValidatorDirective';
import {MatChipsModule} from '@angular/material/chips';
import { ProfileComponent } from './profile/profile.component';
import { CarUpdateComponent } from './profile/cars/car-update/car-update.component';
import {CarListComponent} from './profile/cars/car-list/car-list.component';
import {InsuranceService} from './shared/services/insuranceService';
import {InsuranceListComponent} from './profile/insurance/insurance-list/insurance-list.component';
import { InsuranceProfileComponent } from './profile/insurance/insurance-profile/insurance-profile.component';
import { ClaimListComponent } from './profile/claim/claim-list/claim-list.component';
import { ClaimProfileComponent } from './profile/claim/claim-profile/claim-profile.component';
import {ClaimImageComponent} from './profile/claim/claim-image/claim-image.component';
import { ClaimComponent } from './claim/claim.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormField} from '@angular/material/form-field';
import { TestComponent } from './test/test.component';
import {MatStepperModule} from '@angular/material/stepper';
import { QuoteComponent } from './quote/quote.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgxEchartsModule} from 'ngx-echarts';
import { DashboardComponent } from './analysis/dashboard/dashboard.component';
import { PaymentComponent } from './payment/payment.component';
import { NgPaymentCardModule } from 'ng-payment-card';
import {AdminService} from './shared/services/adminService';
import {AdminProfileComponent} from './admin/profile/profile.component';
import {CheckHistoryComponent} from './admin/check-history/check-history.component';
import {CheckInsuranceComponent} from './admin/check-insurance/check-insurance.component';
import {CheckClaimComponent} from './admin/check-claim/check-claim.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { ChangeEmailComponent } from './profile/change-email/change-email.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuoteBlockComponent,
    RegisterComponent,
    HomeComponent,
    RepeatValidatorDirective,
    ProfileComponent,
    CarUpdateComponent,
    CarListComponent,
    InsuranceListComponent,
    InsuranceProfileComponent,
    ClaimListComponent,
    ClaimProfileComponent,
    ClaimImageComponent,
    ClaimComponent,
    TestComponent,
    QuoteComponent,
    DashboardComponent,
    PaymentComponent,
    AdminProfileComponent,
    CheckHistoryComponent,
    CheckInsuranceComponent,
    CheckClaimComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    CustomStyleModule,
    FormsModule,
    HttpClientModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatStepperModule,
    MDBBootstrapModule.forRoot(),
    NgxEchartsModule,
    NgPaymentCardModule,

  ],
  providers: [AuthService, InsuranceService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
