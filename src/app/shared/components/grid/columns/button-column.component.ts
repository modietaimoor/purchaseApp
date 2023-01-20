import { Component, Input } from '@angular/core';

import { Column } from '../model';

@Component({
  selector: 'app-button-column',
  template: `<div class="pdf-icon-wrapper"
    ><app-button *ngIf="enableExpression" (clickEvent)="column.onClick(id)" [type]="type"></app-button>
  </div> `,
  styles: [
    `
      .pdf-icon-wrapper {
        text-align: center;
        cursor: pointer;
      }
    `
  ]
})
export class ButtonColumnComponent {
  @Input() id: string;
  @Input() value: string;
  @Input() type = 'pdf';
  @Input() column: Column;
  @Input() enableExpression: boolean;
}
