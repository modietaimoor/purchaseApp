import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

import { ButtonType } from '@shared/components/button/button.component';

@Directive({
  selector: '[appButtonIcon]'
})
export class ButtonIconDirective implements OnChanges {
  @Input() appButtonIcon: ButtonType;
  icons: Map<ButtonType, string> = new Map<ButtonType, string>([
    ['pdf', 'far fa-file-pdf fa-2x pdf-icon'],
    ['excel', 'far fa-file-excel fa-2x'],
    ['download', 'fa fa-download text-color mr-2'],
    ['edit', 'fa fa-edit fa-2x'],
    ['info', 'fa fa-info-circle fa-2x main-color'],
    ['setting', 'fa fa-cog fa-2x main-color'],
    ['delete', 'fa fa-times fa-2x main-color'],
    ['lock', 'fa fa-lock fa-2x main-color'],
    ['undo', 'fa fa-undo fa-2x main-color'],
    ['list', 'fa fa-list fa-2x'],
    ['user', 'fa fa-user fa-2x'],
    ['sim-card', 'fa fa-sim-card fa-2x'],
    ['exchange', 'fa fa-exchange-alt fa-2x'],
    ['phone-slash', 'fa fa-phone-slash fa-2x'],
    ['trash', 'fa fa-trash-alt fa-2x'],
    ['address', 'fas fa-address-card fa-2x main-color'],
    ['three-dots', 'glyphicon glyphicon-th-list main-color'],
    ['add', 'fas fa-plus font-lg main-color'],
    ['mobile', 'fas fa-mobile fa-2x'],
    ['user-times', 'fa fa-user-times fa-2x'],
    ['save', '']
  ]);

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnChanges(): void {
    if (this.appButtonIcon && this.icons.has(this.appButtonIcon)) this.addClass();
  }

  addClass(): void {
    const classes = this.getClassName().split(' ');
    classes.filter(c => c).forEach(className => this.renderer.addClass(this.elementRef.nativeElement, className));
  }

  private getClassName(): string {
    return this.icons.get(this.appButtonIcon);
  }
}
