import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Contract } from '../shared/component/contract/contract';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/service/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { colors } from '../demo-utils/colors';
import { Timestamp } from "@angular/fire/firestore";

const getObservable = (collection: AngularFirestoreCollection<Contract>) => {
  const subject = new BehaviorSubject<Contract[]>(new Array);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Contract[]) => {
    let settlements = [];
    for (const contract of val) {
      if (contract.settlementDate) {
        settlements.push(contract)
      }
    }
    subject.next(settlements);
  });
  return subject;
};

@Component({
  selector: 'app-test-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './test-calendar.component.html',
  styleUrls: ['./test-calendar.component.css']
})

export class TestCalendarComponent {
  userFolder = `users/${this.authService.userData.uid}/`

  mycontracts = getObservable(this.angularfirestore.collection(this.userFolder + 'mycontracts')) as Observable<Contract[]>

  view: CalendarView = CalendarView.Month;

  viewDate = new Date ();

  events: CalendarEvent[] = [
    {
      title: 'Click Me',
      start: new Date(),
    },
    {
      title: 'Or click me',
      start: new Date(),
    }
  ]


  settlementDateEvents: CalendarEvent[] = [

  ]

  constructor(
    private angularfirestore: AngularFirestore,
    public authService: AuthService,
  ){

  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event)
    console.log(this.mycontracts)
  }
}
