import { Component, EventEmitter, Input, TemplateRef } from '@angular/core';

import { Column } from '../model';

@Component({
  selector: 'app-boolean-sign-column',
  template: `
    <i
      class="fa fa-2x clickable"
      [ngClass]="{
        'fa-times-circle danger': value === true,
        'fa-check-circle green': value !== true
      }"
      (click)="onClick($event)"
    >
    </i>
    <ng-template [ngTemplateOutlet]="templateRef" [ngTemplateOutletContext]="{ $implicit: rowIndex }"></ng-template>
  `
})
export class BooleanSignColumnComponent {
  @Input() id: string;
  @Input() value: boolean;
  @Input() column: Column;
  @Input() templateRef: TemplateRef<unknown>;
  @Input() rowIndex: number;

  @Input() readonly clickEvent: EventEmitter<{ event: Event; id: string; rowIndex: number }>;

  onClick(event: Event): void {
    this.clickEvent.emit({ event: event, id: this.id, rowIndex: this.rowIndex });
  }
}
