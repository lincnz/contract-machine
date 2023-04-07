import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '15em',
        height: '15em',
      })),
      state('closed', style({
      })),
      transition('open <=> closed', [
        query('mat-icon', animate(500, style({transform: 'rotate(45deg)'}))),
        animate('500ms ease-in-out'),
      ],
      ), 
    ]),
    trigger('rotate', [
      state('forty-five', style({
        transform: 'rotate(45deg)'
      })),
      state('zero', style({
        transform: 'rotate(0)'
      })),
      transition('forty-five <=> zero', [
        animate('500ms ease-in-out')
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {
  isOpen = false;
  isRotated = false;

  toggle() {
    this.isOpen = !this.isOpen;
    this.isRotated = !this.isRotated
  }

  constructor() { }

  ngOnInit(): void {
  }

  testFunction() {
    console.log('test func ran')
  }

}
