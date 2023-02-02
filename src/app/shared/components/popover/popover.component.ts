import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html'
})
export class PopoverComponent {
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';
  @Input() target: string;
  @Input() title: string;
  @Input() visible: boolean;
  @Input() showTitle: boolean = true;
  @Input() closeOnMouseOut: boolean = true;
  @Input() position: string = 'right';
  @Input() showCloseButton: boolean = false;
  @Input() wrapperAttr = {};
  @Output() readonly visibleChange = new EventEmitter<boolean>();
  @ContentChild(TemplateRef) templateRef: TemplateRef<unknown>;
  constructor() {}

  onContentReady(e: { component: { content(): HTMLElement; hide(): void } }): void {
    if (!this.closeOnMouseOut) return;
    e.component.content().addEventListener('mouseleave', _ => {
      e.component.hide();
    });
  }


}
