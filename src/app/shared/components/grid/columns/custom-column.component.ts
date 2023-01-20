import { Component, Input, TemplateRef } from '@angular/core';

import { SafeAny } from 'src/app/core/safe-any-type';

@Component({
  selector: 'app-custom-column',
  template: `
    <ng-template [ngTemplateOutlet]="templateRef" [ngTemplateOutletContext]="{ $implicit: row }"></ng-template>
  `
})
export class CustomColumnComponent {
  @Input() templateRef: TemplateRef<unknown>;
  @Input() row: SafeAny;
}
