import { Component, OnInit } from '@angular/core';
import { Contract } from '../../shared/component/contract/contract';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ContractFormComponent, ContractFormResult} from '../../forms//contract-form/contract-form.component';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../shared/service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router"
import { TestformComponent, TestFormResult } from 'src/app/tests/testform/testform.component';

const getObservable = (collection: AngularFirestoreCollection<Contract>) => {
  const subject = new BehaviorSubject<Contract[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Contract[]) => {
    subject.next(val);
  });
  return subject;
};

// tests
const getTest = (collection: AngularFirestoreCollection<Object>) => {
  const subject = new BehaviorSubject<Object[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Object[]) => {
    subject.next(val)
  })
  console.log(subject);
  return subject;
}

const getTestSimple = (document: AngularFirestoreDocument) => {
  console.log('tick')
  return document;
} 
//endtests

@Component({
  selector: 'app-task-view',
  templateUrl: './my-contracts.component.html',
  styleUrls: ['./my-contracts.component.css']
})
export class MyContractsComponent {
  
  constructor(
    private dialog: MatDialog, 
    private store: AngularFirestore,
    private router: Router,
    public authService: AuthService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  userData: any;

  userStatus = this.afAuth.authState.subscribe(res => {
    if (res && res.uid) {
      return true
    }
    else {
      return false
    }
  });

  userFolder = `users/${this.authService.userData.uid}/`
  mycontracts = getObservable(this.store.collection(this.userFolder + 'mycontracts')) as Observable<Contract[]>;
  myothercontracts = getObservable(this.store.collection(this.userFolder + 'myothercontracts')) as Observable<Contract[]>;

  //tests
  //mytest = getTestSimple();
  gotTheContracts = this.store.doc(this.userFolder + 'test/testdoc')    
  //doc(this.userFolder + 'test/Bqp6MlAxuHMAHkkg2q8g');
  //consoleIt = console.log(this.gotTheContracts)
  //endtests

  newTask(): void {
    let currentdate = new Date;
      
    let getcolor = ( ) => {
      let randomRGBValue = () => { return Math.floor(Math.random() * 255) }
      let randomAlphaValue = () => { return Math.floor(Math.random()*0.2) + 0.3 }
      return "rgb(" + randomRGBValue() + ", " + randomRGBValue() + ", " +  randomRGBValue() + ", " + randomAlphaValue() + ")";
    }

    const dialogRef = this.dialog.open(ContractFormComponent, {
      width: '100%',
      data: {
        contract: {
          timeZoneOffset: currentdate.getTimezoneOffset(), //suggest implementing warning if timezone is detected to be < UTC+12. Careful as due to daylight savings, may sometimes be UTC+11/13 //however at present all dates entered in NZ default to NZ time
          color: getcolor(),
          stdConditionDates: {}
        },
      },
    });

    dialogRef.afterClosed().subscribe((result: ContractFormResult) => {
        if (!result) {
          return;
        }
        this.store.collection(this.userFolder + 'mycontracts').add(result.contract)
    });
  }

  //tests
  newTestObservable(): void {
    console.log("test observable initiated");
    let testObj = {one: "Hare"}
    this.store.collection(this.userFolder + 'test2').add(testObj)
    // const dialogRefTest = this.dialog.open(TestformComponent, {
    //   width: '100%',
    //   data: {
    //     string: {}
    //   }
    // })
    // dialogRefTest.afterClosed().subscribe((testData: TestFormResult) => {
    //   this.store.collection(this.userFolder + 'test').add(testData)
    // })
  }
  //endtests

  editTask(list: 'mycontracts' | 'myothercontracts', contract: Contract): void {
    const dialogRef = this.dialog.open(ContractFormComponent, {
      width: '95%',
      data: {
        contract,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: ContractFormResult) => {
      if (!result) {
        return;
      }
      const dataList = this[list];

      if (result.delete) {
        this.store.collection(this.userFolder + list).doc(contract.id).delete();
      } else {
        this.store.collection(this.userFolder + list).doc(contract.id).update(contract);
      }
    });
  }

  drop(event: CdkDragDrop<Contract[] | null>): void {
      if (event.previousContainer === event.container) {
        return;
      }
      if (!event.previousContainer.data || !event.container.data) {
        return;
      }
      const item = event.previousContainer.data[event.previousIndex];
      this.store.firestore.runTransaction(() => {
        const promise = Promise.all([
          this.store.collection(this.userFolder + event.previousContainer.id).doc(item.id).delete(),
          this.store.collection(this.userFolder + event.container.id).add(item),
        ]);
        return promise;
      });
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
  }
}
