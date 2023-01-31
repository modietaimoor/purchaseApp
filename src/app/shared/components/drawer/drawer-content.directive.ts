import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[drawer-content]',
})
export class DrawerContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}