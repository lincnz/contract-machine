import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [

  ]
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  testFunction() {
    console.log("test function ran")
  }

}
