import { Component, OnInit } from '@angular/core';
import { Contract } from '../../shared/component/contract/contract';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../shared/service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

const getObservable = (collection: AngularFirestoreCollection<Contract>) => {
  const subject = new BehaviorSubject<Contract[]>(new Array);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Contract[]) => {
    subject.next(val);
  });
  return subject;
};

const getObservableByWeek = (collection: AngularFirestoreCollection<Contract>) => {
  const subject = new BehaviorSubject<Contract[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Contract[]) => {
      let comingFriday = new Date();
      let today = new Date();
      let todayDay = today.getDay(); //day of week sun = 0, sat = 6
      let daysTillFriday = 5 - todayDay;
      comingFriday.setDate((today.getDate()) + daysTillFriday);
      let thisWeekContracts = [];
      
      for (const contract of val) {
        if (contract.settlementDate 
            && contract.settlementDate.seconds*1000 < comingFriday.getTime() 
            && contract.settlementDate.seconds*1000 > today.getTime()) {
          thisWeekContracts.push(contract)
        } 
      }
      subject.next(thisWeekContracts);
  });
  return subject;
};

const getObservableByMonth = (collection: AngularFirestoreCollection<Contract>) => {
  const subject = new BehaviorSubject<Contract[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Contract[]) => {

    let today = new Date();
    let endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let thisMonthContracts = [];

    for (const contract of val) {
      if (contract.settlementDate) {
        if (contract.settlementDate.seconds*1000 < endOfMonth.getTime() && contract.settlementDate.seconds*1000 > today.getTime()) {
          thisMonthContracts.push(contract)
        } 
      }
    }

    subject.next(thisMonthContracts);
  });
  return subject;
};

                                           
@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.css']
})
export class GeneralViewComponent implements OnInit {

  constructor(
    private angularfirestore: AngularFirestore,
    public authService: AuthService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
  ) { 

    console.log('constructor');
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log('getting user...')
        localStorage.setItem('user', JSON.stringify(this.authService.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  
  testFunction(): void {
    console.log('function ran');
  }

  userFolder = `users/${this.authService.userData.uid}/`

  //'as' is a type assertion
  mycontracts = getObservable(this.angularfirestore.collection(this.userFolder + 'mycontracts')) as Observable<Contract[]>
  mycontractsByMonth = getObservableByMonth(this.angularfirestore.collection(this.userFolder + 'mycontracts')) as Observable<Contract[]>;
  mycontractsByWeek = getObservableByWeek(this.angularfirestore.collection(this.userFolder + 'mycontracts')) as Observable<Contract[]>;
  
  ngOnInit(): void {

  }
}
