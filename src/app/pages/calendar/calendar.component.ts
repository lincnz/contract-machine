import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Contract } from '../../shared/component/contract/contract';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../shared/service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

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
  
  ngOnInit(): void { 
  }

}


