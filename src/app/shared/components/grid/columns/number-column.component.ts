import { Component, Input } from '@angular/core';

import { Column } from '../model';

@Component({
  selector: 'app-number-column',
  template: `{{ value === null ? 'N/A' : value }} `
})
export class NumberColumnComponent {
  @Input() id: string;
  @Input() value: string;
  @Input() type = 'number';
  @Input() column: Column;
}
