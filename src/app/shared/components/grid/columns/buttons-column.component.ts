import { Component, Input } from '@angular/core';

import { SafeAny } from '@core/safe-any-type';

import { Column } from '../model';

@Component({
  selector: 'app-buttons-column',
  template: ` <ng-container *ngFor="let button of column.buttons">
    <app-button
      (clickEvent)="button.onClick(id, $event)"
      [title]="button.title"
      [type]="button.icon"
      [cssClasses]="button.cssClasses"
      [buttonsList]="button.buttonsList"
      [id]="id"
      [row]="row"
      [show]="button.show"
    ></app-button>
  </ng-container>`
})
export class ButtonsColumnComponent {
  @Input() id: string | number;
  @Input() row: SafeAny;
  @Input() value: string;
  @Input() type = 'pdf';
  @Input() column: Column;
  @Input() enableExpression: boolean;
}
