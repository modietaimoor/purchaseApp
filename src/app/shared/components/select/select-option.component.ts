import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-option',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class SelectOptionComponent {
  @Input()
  public key: number | null = null;

  @Input()
  public value: string = 'value';

  constructor() {}
}
