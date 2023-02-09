import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-load-panel',
  templateUrl: './load-panel.component.html'
})
export class LoadPanelComponent {
  @Input() loadingVisible: boolean = false;
  constructor() {}
}
