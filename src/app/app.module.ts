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
import { DialogOverviewExampleDialog } from './forms/contract-form/condition-chips/condition-chips.component';
import { TestformComponent } from './tests/testform/testform.component';
import { NotificationComponent } from './pages/settings/notification/notification.component';
import { SearchBarComponent } from './pages/my-contracts/search-bar/search-bar.component';
import { CalendarHeaderComponent } from './demo-utils/calendar-header.component';
import { ConditionFormComponent } from './forms/condition-form/condition-form.component';
import { CalendarViewComponent } from './shared/component/calendar/calendar-view/calendar-view.component';
import { ConditionChipsComponent } from './forms/contract-form/condition-chips/condition-chips.component';

import { AuthService } from "./shared/service/auth.service";
import { AuthGuard } from './shared/guard/auth.guard';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatDialogModule as MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule as MatTabsModule} from '@angular/material/tabs';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule as MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule as MatCheckboxModule}  from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarCommonModule } from 'angular-calendar';
import { CalendarMonthModule } from 'angular-calendar';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http'

import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { SearchpipePipe } from './pages/my-contracts/searchpipe.pipe';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


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
    NotificationComponent,
    SearchBarComponent,
    CalendarHeaderComponent,
    ConditionFormComponent,
    CalendarViewComponent,
    ConditionChipsComponent,
    SearchpipePipe,
    DialogOverviewExampleDialog
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
    MatCheckboxModule,
    NgbModule,
    NgbModalModule,
    FlatpickrModule,
    CalendarModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CalendarCommonModule,
    CalendarMonthModule,
    MatChipsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    AuthService,
    CurrencyPipe, 
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'en-nz' }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
