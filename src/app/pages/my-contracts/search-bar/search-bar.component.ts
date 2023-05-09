import { Component, OnInit } from '@angular/core';
import { Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Contract } from 'src/app/shared/component/contract/contract';
import { Observable, of, BehaviorSubject, fromEvent, tap, pipe } from 'rxjs';
import { filter, map, delay, distinctUntilChanged, debounceTime, switchMap} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthService } from '../../../shared/service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GetObservableService } from '../../../shared/service/get-observable/get-observable.service'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [GetObservableService]
})
export class SearchBarComponent implements OnInit {

  @Output() typeSearch = new EventEmitter<string>()
  searchString: string;
    
  // getContractStrings = (contract: Contract) => {
  //   return `${contract.title.toLocaleLowerCase()}
  //   ${contract.clientName.toLocaleLowerCase()} 
  //   ${contract.clientref.toLocaleLowerCase()}
  //   ${contract.description.toLocaleLowerCase()}
  //   `;
  // }

  onSearchText = (value: string) => {
    this.typeSearch.emit(value);
  }

  constructor(
    private store: AngularFirestore,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private changeDetection: ChangeDetectorRef,
    public getObservable: GetObservableService
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
    console.log(this.searchString)
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

  ngOnInit(): void {
  }

}
