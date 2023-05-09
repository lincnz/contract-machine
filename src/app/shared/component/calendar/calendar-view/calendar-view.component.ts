import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Contract } from '../../contract/contract'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../../../service/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators'
import { colors } from '../../../../demo-utils/colors';
import { Timestamp } from '@angular/fire/firestore';
import { GetObservableService } from '../../../service/get-observable/get-observable.service';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
  providers: [GetObservableService]

})
export class CalendarViewComponent {

  filepath = `users/${this.authService.userData.uid}/mycontracts`
  myContracts = this.getObservable.getObservable(this.angularfirestore.collection(this.filepath)) as Observable<Contract[]>

  //TODO: not needed - remove - does show how to filter observables succintly
  myContractsFiltered: Observable<Contract[]> = this.myContracts.pipe(
    map((contracts: Contract[]) => contracts.filter(
      (contract: Contract) => contract.settlementDate
    ))
  );

  asyncEvents$: Observable<CalendarEvent[]>

  view: CalendarView = CalendarView.Month;
  viewDate = new Date ();
  activeDayIsOpen: boolean = false;

  constructor(
    private angularfirestore: AngularFirestore,
    public authService: AuthService,
    private getObservable: GetObservableService
  ){ 
    this.fetchEventsAsync();
  }

  //TODO: Rewrite this
  fetchEventsAsync(): void {
    this.asyncEvents$ = this.myContracts.pipe(map((contracts) => {
    return contracts.map((contract) => {
      //TODO: hacky - needs fix - type error
        let settlementDatetoDate = () => {
          if (contract.settlementDate) {return new Date(contract.settlementDate.seconds*1000)} 
          else {return new Date(0)}
        }
        return {
          title: contract.title,
          start: settlementDatetoDate()
        }
      })
    }))
  }

  //TODO: implement event functionality here
  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('event clicked', event)
  }

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent<{contract: Contract}>[];
  }): void {
    console.log('clicked')
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
}


