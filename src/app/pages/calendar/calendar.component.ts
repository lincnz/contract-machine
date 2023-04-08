import { Component, OnInit } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatCard } from '@angular/material/card';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Contract } from '../../shared/component/contract/contract';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../shared/service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Timestamp } from '@angular/fire/firestore';

const getSettlements = (collection: AngularFirestoreCollection<Contract>) => {
  const subject = new BehaviorSubject<Contract[]>([]);
  let settlementDates: Date[] = [];
  collection.valueChanges({ idField: 'id' }).subscribe((val: Contract[]) => {
    for (const contract of val) {
      if (contract.settlementDate && (contract.settlementDate.seconds != undefined)) {
          let newDate = new Date(contract.settlementDate.seconds*1000);
          settlementDates.push(newDate)
      }
    }
    //subject.next(settlementDates);
  });
  return settlementDates;
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  selected = new Date("2023-04-07") ; //test
  userFolder = `users/${this.authService.userData.uid}/`;

  constructor(
    private angularfirestore: AngularFirestore,
    public authService: AuthService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.userFolder = `users/${this.authService.userData.uid}/`;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
   }

  userData: any;
  
  testFunc() {
    console.log(this.selected)
  }

  ngOnInit(): void { 
  }

  //highlight-date - doesnt' work
  // dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  //     const date = cellDate.getDate();
  //     if (view == 'month') {
  //       return (date == 1) ? 'highlight-date' : "";
  //   }
  //   return "";
  // }

}


