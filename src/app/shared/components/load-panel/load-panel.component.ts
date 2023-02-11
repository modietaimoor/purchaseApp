import { Component, Input } from '@angular/core';
import { SafeAny } from '@core/safe-any-type';

@Component({
  selector: 'app-load-panel',
  templateUrl: './load-panel.component.html'
})
export class LoadPanelComponent {
  @Input() loadingVisible: boolean = false;
  @Input() position: SafeAny;
  constructor() {}
}
