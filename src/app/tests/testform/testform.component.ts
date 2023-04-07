import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';


@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.css']
})
export class TestformComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TestFormData,
  ) { }

  ngOnInit(): void {
  }

}

export interface TestFormData {
  stringTest: String;
}

export interface TestFormResult {
  stringTest: String;
}
