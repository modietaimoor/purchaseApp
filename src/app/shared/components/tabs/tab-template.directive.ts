import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[app-tab]'
})
export class TabTemplateDirective {
  constructor(public template: TemplateRef<unknown>) {}
}
