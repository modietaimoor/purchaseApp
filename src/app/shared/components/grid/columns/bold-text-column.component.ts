import { Component, Input } from '@angular/core';
import { SafeAny } from '@core/safe-any-type';

import { Column } from '../model';

@Component({
  selector: 'app-bold-text-column',
  template: `<b *ngIf="value">{{ value }}</b> <span *ngIf="!value">{{ value }}</span>`
})
export class BoldTextColumnComponent {
  @Input() id: string;
  @Input() value: string;
  @Input() column: Column;
  @Input() row: SafeAny;
}
