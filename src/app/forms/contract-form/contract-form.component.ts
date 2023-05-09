import { Component, Inject, Input, ViewContainerRef } from '@angular/core';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA as MAT_DIALOG_DATA, MatDialogRef as MatDialogRef } from '@angular/material/dialog';
import { Contract } from '../../shared/component/contract/contract';
import { Router } from '@angular/router';
import { ConditionChip } from 'src/app/forms/contract-form/condition-chips/condition-chips.component'
import {FormControl} from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'contract-form-dialog',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css'],
})

export class ContractFormComponent {

  @Input() contract: Contract | null = null;

  timeStampToDate = (timestamp: Timestamp) => {
    return new Date (timestamp.seconds * 1000)
  }
  
  //makes a backup the same as this.data.contract. The '...' copies the properties from that contract
  private backupTask: Partial<Contract> = { ...this.data.contract };
  contractFormPages: any[];
  activePageIndex = 0; 
  startDateDefaultValue = new FormControl(new Date())
  settlementDateDefaultValue = new FormControl(new Date())

  constructor(
    public dialogRef: MatDialogRef<ContractFormComponent>,
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    @Inject(MAT_DIALOG_DATA) 
    public data: ContractFormData,
    private router: Router
  ) {
    // wizard not currently used
    this.contractFormPages = [
      {
          label: 'Main Details',
          link: './wizard/main-details',
          index: 0
      }, {
          label: 'PPSA and GST',
          link: './wizard/ppsa-gst',
          index: 1
      }, {
          label: 'Property Details',
          link: './wizard/property-details',
          index: 2
      }, {
          label: 'Price Details',
          link: './wizard/price-details',
          index: 3
      }, {
          label: 'Standard Conditions',
          link: './wizard/standard-conditions',
          index: 4
      }, {
        label: 'Tenancy Details',
        link: './wizard/tenancy-details',
        index: 5
      }
    ];

  }

  cancel(): void {
    this.data.contract.title = this.backupTask.title;
    this.data.contract.clientref = this.backupTask.clientref
    this.data.contract.startDate = this.backupTask.startDate;
    this.data.contract.settlementDate = this.backupTask.settlementDate;
    this.data.contract.color = this.backupTask.color;
    this.data.contract.timeZoneOffset = this.backupTask.timeZoneOffset;
    this.data.contract.conditionChips = this.backupTask.conditionChips;
    this.dialogRef.close(this.data);
  }

    //need 2-way binding adding data from the condition component to the contract-form data, when contract form is closed, 
    //data is treated as any other. This can probably be done with injections
    //https://angular.io/guide/component-interaction
    //https://angular.io/api/core/ViewContainerRef

  updateConditions(conditions: ConditionChip[]): void {
    this.data.contract.conditionChips = conditions;
  }

}

export interface ContractFormData {
  contract: Partial<Contract>;
  enableDelete: boolean;
}

export interface ContractFormResult {
  contract: Contract;
  delete?: boolean;
}
