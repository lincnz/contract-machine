import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Contract } from './contract';

@Component({
  selector: 'app-task',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})

export class ContractComponent {
  @Input() contract: Contract | null = null;

  @Input() compactView: boolean | null = false;
  @Input() settView: boolean | null = false;
  @Input() exView: boolean | null = false;
  
  @Output() edit = new EventEmitter<Contract>();

  constructor(

  ) { }

  
  getprogress (contract: Contract) {
    let progress!: number;
    let today = new Date;
    let todaySeconds = today.getTime()/1000
      if (contract.settlementDate && contract.startDate) {
        progress = Math.round(((todaySeconds - contract.startDate.seconds)/(contract.settlementDate.seconds - contract.startDate.seconds))*100);
      }
    return progress
  }

  ngOnInit() : void {

  }

}