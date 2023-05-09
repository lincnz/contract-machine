import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Contract } from 'src/app/shared/component/contract/contract';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class getObservable {

}


export class GetObservableService {
  getObservable = (collection: AngularFirestoreCollection<Contract>) => {
    const subject = new BehaviorSubject<Contract[]>([]);
    collection.valueChanges({ idField: 'id' }).subscribe((val: Contract[]) => {
     subject.next(val);
    });
    return subject;
  };

  
  constructor() { }
}
