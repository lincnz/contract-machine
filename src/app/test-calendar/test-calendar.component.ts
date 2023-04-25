import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Contract } from '../shared/component/contract/contract';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/service/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, first, last, mergeWith } from 'rxjs/operators'
import { colors } from '../demo-utils/colors';
import { Timestamp } from "@angular/fire/firestore";

const getObservable = (collection: AngularFirestoreCollection<Contract>) => {
  const subject = new BehaviorSubject<Contract[]>(new Array); //BehaviourSubject is just a form of observable. <Contract[]>(new Array) assigns the type array to 
  collection.valueChanges({ idField: 'id' }).subscribe((val: Contract[]) => {
    subject.next(val);
  });
  return subject;
};

// https://www.youtube.com/watch?v=2LCo926NFLI&ab_channel=Fireship  -- for info on filtering observables
const getObservable2 = (collection: AngularFirestoreCollection<Contract>) => {
  const subject = new BehaviorSubject<Contract[]>(new Array);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Contract[]) => {
    subject.next(val);
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

  //circumvents need for "Behavioursubject", but has weakness for array stability during live updates for drag-and-drop (not used). "
  //This is probably what should be used across the app to get data from the database, as observable filtering etc can be applied to it
  //***EXCEPT IF I WANT TO USE DRAG-DROP */
  myContractsArray = this.angularfirestore.collection(this.userFolder + 'mycontracts').valueChanges({ idField: 'id' }) as Observable<Contract[]>
  // myContractsArrayFiltered = this.myContractsArray.filter()
  someContracts = getObservable(this.angularfirestore.collection(this.userFolder + 'mycontracts')) as Observable<Contract[]>

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

  settlements: CalendarEvent[] = []  //not used

  constructor(
    private angularfirestore: AngularFirestore,
    public authService: AuthService,
  ){ 
    
  }

  //adds settlements to calandar when an even indicator is clicked 
  //TODO: fix so this happens at page load
  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event)
    console.log(this.mycontracts)
    console.log(this.someContracts)

    //creates an array of settlement dates TODO: tidy considerably
    this.someContracts.subscribe((val: Contract[]) => {
      val.forEach(entry => {
          console.log(entry.settlementDate);
          if (entry.settlementDate) {
            let settlementDate = new Date(entry.settlementDate.seconds*1000)
            this.events.push(
              {
                title: entry.clientref,
                start: settlementDate
              }
            )
          }
      })
    })
  }
}
