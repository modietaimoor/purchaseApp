import { Component, EventEmitter, Input, TemplateRef } from '@angular/core';

import { Column } from '../model';

@Component({
  selector: 'app-boolean-sign-column',
  template: `
    <app-button
      [cssClasses]="value ? 'btn-circle btn-green btn-size no-borders' : 'btn-circle btn-red btn-size no-borders'"
      [title]="value ? 'Success' : 'Error'"
    ></app-button>
    <ng-template [ngTemplateOutlet]="templateRef" [ngTemplateOutletContext]="{ $implicit: rowIndex }"></ng-template>
  `
})
export class CircleSignColumnComponent {
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
