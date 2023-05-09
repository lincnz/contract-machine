import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './authcomponents/sign-in/sign-in.component';
import { SignUpComponent } from './authcomponents/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './authcomponents/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './authcomponents/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { MyContractsComponent } from './pages/my-contracts/my-contracts.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { GeneralViewComponent } from './pages/general-view/general-view.component';
import { CalendarMonthViewComponent } from 'angular-calendar';

const routes: Routes = [
  { path: '', redirectTo: '/general-view', pathMatch: 'full' },
  { path: 'general-view', component: GeneralViewComponent, canActivate: [AuthGuard] },
  { path: 'my-contracts', component: MyContractsComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent},
  { path: 'calendar', component: CalendarMonthViewComponent, outlet: 'secondary'},
  { path: 'settings', component: SettingsComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
