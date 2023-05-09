import { Component } from '@angular/core';
import { Contract } from '../../shared/component/contract/contract';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ContractFormComponent, ContractFormResult} from '../../forms//contract-form/contract-form.component';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router"
import { GetObservableService } from 'src/app/shared/service/get-observable/get-observable.service'

@Component({
  selector: 'app-task-view',
  templateUrl: './my-contracts.component.html',
  styleUrls: ['./my-contracts.component.css'],
  providers: [GetObservableService]
})

export class MyContractsComponent {

  userData: any;
  filePath = `users/${this.authService.userData.uid}/mycontracts`
  userFolder = `users/${this.authService.userData.uid}`
  searchText: string = "";

  constructor(
    private dialog: MatDialog, 
    private store: AngularFirestore,
    private router: Router,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private getObservable: GetObservableService,
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

  mycontracts = this.getObservable.getObservable(this.store.collection(this.filePath)) as Observable<Contract[]>;
  myothercontracts = this.getObservable.getObservable(this.store.collection(this.filePath)) as Observable<Contract[]>; //Not currently used but provides a second collection of contracts

  newTask(): void {
    let currentdate = new Date;
      
    let getPastelColor = ( ) => {
      let randomRGBValue = () => { return Math.floor(Math.random() * 255) }
      let randomAlphaValue = () => { return Math.floor(Math.random()*0.2) + 0.3 }
      return "rgb(" + randomRGBValue() + ", " + randomRGBValue() + ", " +  randomRGBValue() + ", " + randomAlphaValue() + ")";
    }

    const dialogRef = this.dialog.open(ContractFormComponent, {
      width: '100%',
      data: {
        contract: {
          timeZoneOffset: currentdate.getTimezoneOffset(), //suggest implementing warning if timezone is detected to be < UTC+12. Careful as due to daylight savings, may sometimes be UTC+11/13 //however at present all dates entered in NZ default to NZ time
          color: getPastelColor(),
          conditions: [],
          conditionChips: []
        },
      },
    });

    dialogRef.afterClosed().subscribe((result: ContractFormResult) => {
        if (!result) {
          return;
        }
        this.store.collection(this.filePath).add(result.contract)
    });
  }

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
        this.store.collection(this.filePath).doc(contract.id).delete();
      } else {
        this.store.collection(this.filePath).doc(contract.id).update(contract);
      }
    });
  }

  //not currently used
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

  updateSearchText(searchText: string) {
    this.searchText = searchText;
  }
}
