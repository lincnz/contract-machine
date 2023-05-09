import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-condition-form',
  templateUrl: './condition-form.component.html',
  styleUrls: ['./condition-form.component.css']
})
export class ConditionFormComponent {
  @Input() item = '';
  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value: string) {
    this.newItemEvent.emit(value)
  }
}
