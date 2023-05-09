import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmailServiceService {

  //email = {headers: {}}
  baseURL: string = "http://localhost:4200";

  constructor(
    private http: HttpClient
  ) { }

  sendEmail(): Observable<string> {
    return  this.http.get<string>(this.baseURL + 'people')
  }

  ngOnInit() {
    
  }
}
