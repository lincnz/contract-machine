import { Component, Inject, Input, ViewContainerRef } from '@angular/core';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA as MAT_DIALOG_DATA, MatDialogRef as MatDialogRef } from '@angular/material/dialog';
import { Contract } from '../../shared/component/contract/contract';
import { Router } from '@angular/router';
import { ConditionFormComponent } from '../condition-form/condition-form.component';
import { Condition } from 'src/app/shared/component/condition/condition'

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
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    @Inject(MAT_DIALOG_DATA) public data: ContractFormData,
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

  ngOnInit (): void {

  }

  cancel(): void {
    /* TODO: remove irrelevant */
    this.data.contract.title = this.backupTask.title;
    this.data.contract.description = this.backupTask.description;
    this.data.contract.startDate = this.backupTask.startDate;
    this.data.contract.settlementDate = this.backupTask.settlementDate;
    this.data.contract.color = this.backupTask.color;
    this.data.contract.timeZoneOffset = this.backupTask.timeZoneOffset;

    //test
    //this.data.contract.stdConditionDates.ksaver = this.backupTask.stdConditionDates.ksaver;

    this.dialogRef.close(this.data);
  }

  newCondition(): void {
    console.log("New condition added");
    const conditionBox = this.viewContainerRef.createComponent(ConditionFormComponent)
    //need 2-way binding adding data from the condition component to the contract-form data, when contract form is closed, 
    //data is treated as any other. This can probably be done with injections
    //https://angular.io/guide/component-interaction
    //https://angular.io/api/core/ViewContainerRef





    // const dialogRef = this.dialog.open(ConditionFormComponent, {
    //   width: '100%',
    //   data: {
    //     condition: {
    //     },
    //   },
    // });
    // dialogRef.afterClosed().subscribe((result: ConditionFormComponent) => {
    //     if (!result) {
    //       return;
    //     }
    //     this.store.collection(this.userFolder + 'mycontracts').add(result.condition)
    // });
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
