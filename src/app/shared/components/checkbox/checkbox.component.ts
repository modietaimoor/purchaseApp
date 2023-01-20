import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent {
  @Input() control: UntypedFormControl;
  constructor() {}

  changeValue(event: { target: { checked: boolean } }): void {
    this.control.setValue({ ...this.control.value, checked: event.target.checked });
  }
}
