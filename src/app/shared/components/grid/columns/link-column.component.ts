import { Component, EventEmitter, Input } from '@angular/core';

import { Column } from '../model';

@Component({
  selector: 'app-link-column',
  template: ` <app-button [type]="type" (clickEvent)="click()" [innerText]="value"></app-button> `
})
export class LinkColumnComponent {
  @Input() id: string;
  @Input() value: string;
  @Input() type = 'link';
  @Input() column: Column;
  @Input() readonly clickEvent: EventEmitter<string>;

  click(): void {
    if (this.column.onClick) this.column.onClick(this.id);
    else this.clickEvent.emit(this.id);
  }
}
