import { Directive, Optional, TemplateRef } from '@angular/core';

import { ModalUtils } from './modal-utils';

@Directive({
  selector: '[modalFooter]'
})
export class ModalFooterDirective {
  constructor(@Optional() modalUtils: ModalUtils, public templateRef: TemplateRef<Record<string, never>>) {
    if (modalUtils) modalUtils.pushConfig(templateRef);
  }
}
