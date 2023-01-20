import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html'
})
export class CheckboxListComponent implements OnInit {
  form: UntypedFormGroup;
  @Input() checkboxesFormArray: UntypedFormArray;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      checkboxes: this.checkboxesFormArray
    });
  }
}
