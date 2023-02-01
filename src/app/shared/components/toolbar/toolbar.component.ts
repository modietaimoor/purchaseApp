import { Component, Input } from '@angular/core';
import { SafeAny } from '@core/safe-any-type';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  @Input() items: string = '';
  @Input() index: number;
  @Input() elementAttr: SafeAny;

  constructor() {}
}
