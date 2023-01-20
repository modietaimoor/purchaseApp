import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-step',
  template: '<ng-template #contentTemplate><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepComponent {
  @Input() text: string;
  @Input() index: number;

  @ViewChild('contentTemplate') private template: TemplateRef<void> | null = null;

  constructor() {}

  get content(): TemplateRef<unknown> {
    return this.template;
  }
}
