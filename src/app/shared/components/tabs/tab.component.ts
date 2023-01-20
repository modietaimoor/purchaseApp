import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';

import { TabTemplateDirective } from './tab-template.directive';

@Component({
  selector: 'app-tab',
  template: `<ng-template #contentTemplate><ng-content></ng-content></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {
  @Input() title: string = '';
  @Input() index: number;

  @ContentChild(TabTemplateDirective, { static: false, read: TemplateRef }) template: TemplateRef<void> | null = null;

  constructor() {}

  get content(): TemplateRef<unknown> {
    return this.template;
  }
}
