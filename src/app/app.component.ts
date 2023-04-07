import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/service/auth.service';

//getobservable - not sure what this does

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1; 
  title = 'contract-machine';

  constructor(
    public authService: AuthService,
    private router: Router
  ) { 
    this.navLinks = [
      {
          label: 'Upcoming',
          link: './general-view',
          index: 0
      }, {
          label: 'My contracts',
          link: './my-contracts',
          index: 1
      }, {
          label: 'Calendar',
          link: './calendar',
          index: 2
      }, {
          label: 'Dashboard',
          link: './dashboard',
          index: 3
      }, {
          label: 'Settings',
          link: './settings',
          index: 4
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  background: ThemePalette = undefined;
  
}

