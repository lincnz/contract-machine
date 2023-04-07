import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContractComponent } from './shared/component/contract/contract.component';
import { ContractFormComponent } from './forms/contract-form/contract-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignInComponent } from './authcomponents/sign-in/sign-in.component';
import { SignUpComponent } from './authcomponents/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './authcomponents/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './authcomponents/verify-email/verify-email.component';
import { GeneralViewComponent } from './pages/general-view/general-view.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MyContractsComponent } from './pages/my-contracts/my-contracts.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';

import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { FormsModule } from '@angular/forms';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from "./shared/service/auth.service";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatLegacyCheckboxModule as MatCheckboxModule}  from '@angular/material/legacy-checkbox';
import { TestformComponent } from './tests/testform/testform.component';
import { ShortFormComponent } from './forms/short-form/short-form.component';
import { NotificationComponent } from './pages/settings/notification/notification.component';
import { ConditionComponent } from './shared/component/condition/condition.component';
import { SearchBarComponent } from './pages/my-contracts/search-bar/search-bar.component';
import { AngCalendarComponent } from './ang-calendar/ang-calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    GeneralViewComponent,
    MyContractsComponent,
    CalendarComponent,
    SettingsComponent,
    CalendarComponent,
    DashboardComponent,
    VerifyEmailComponent,
    ContractComponent,
    ContractFormComponent,
    ForgotPasswordComponent,
    TestformComponent,
    ShortFormComponent,
    NotificationComponent,
    ConditionComponent,
    SearchBarComponent,
    AngCalendarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    DatePipe,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatCheckboxModule
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    AuthService,
    CurrencyPipe, 
    { provide: LOCALE_ID, useValue: 'en-nz' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
