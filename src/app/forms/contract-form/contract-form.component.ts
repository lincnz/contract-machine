import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contract } from '../../shared/component/contract/contract';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css'],
})

export class ContractFormComponent {

  @Input() contract: Contract | null = null;

  //makes a backup the same as this.data.contract. The '...' copies the properties from that contract
  private backupTask: Partial<Contract> = { ...this.data.contract };

  contractFormPages: any[];
  activePageIndex = 0; 

  constructor(
    public dialogRef: MatDialogRef<ContractFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContractFormData,
    private router: Router
  ) {
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

  ngOnInit (): void {

  }

  cancel(): void {
    this.data.contract.title = this.backupTask.title;
    this.data.contract.description = this.backupTask.description;
    this.data.contract.startDate = this.backupTask.startDate;
    this.data.contract.settlementDate = this.backupTask.settlementDate;
    this.data.contract.color = this.backupTask.color;
    this.data.contract.timeZoneOffset = this.backupTask.timeZoneOffset;
    this.data.contract.purchasePrice = this.backupTask.purchasePrice;
    this.data.contract.deposit = this.backupTask.deposit;
    this.data.contract.plusGST = this.backupTask.plusGST;

    //test
    //this.data.contract.stdConditionDates.ksaver = this.backupTask.stdConditionDates.ksaver;


    this.dialogRef.close(this.data);
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
