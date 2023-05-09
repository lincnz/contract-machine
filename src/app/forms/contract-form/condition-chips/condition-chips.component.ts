import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Timestamp } from '@angular/fire/firestore';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface ConditionChip {
  name: string;
  date?: string;
}

@Component({
  selector: 'app-condition-chips',
  templateUrl: './condition-chips.component.html',
  styleUrls: ['./condition-chips.component.css']
})
export class ConditionChipsComponent {

  @Output() newChipEvent = new EventEmitter<ConditionChip[]>
  @Input() conditions: ConditionChip[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor (public dialog: MatDialog) {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our condition
    if (value) {
      this.conditionDialog(value)
      this.newChipEvent.emit(this.conditions)
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(condition: ConditionChip): void {
    const index = this.conditions.indexOf(condition);

    if (index >= 0) {
      this.conditions.splice(index, 1);
      this.newChipEvent.emit(this.conditions)
    }
  }

  //not currently used
  edit(condition: ConditionChip, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove condition if it no longer has a name
    if (!value) {
      this.remove(condition);
      this.newChipEvent.emit(this.conditions)
      return;
    }

    // Edit existing condition
    const index = this.conditions.indexOf(condition);
    if (index >= 0) {
      this.conditions[index].name = value;
      this.newChipEvent.emit(this.conditions)
    }
  }

  conditionDialog(title?: string | null) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, 
      { 
        data: {name: title} 
      });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.conditions.push(result)
      this.newChipEvent.emit(this.conditions)
    })
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./condition-chips.component.css']
})

export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConditionChip,
  ) {}

  onNoClick(): void {
    // TODO: bug with keeping empty conditions - should delete
    this.dialogRef.close(this.data);
  }
}



