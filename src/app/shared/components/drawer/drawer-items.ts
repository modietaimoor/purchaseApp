import { Type } from '@angular/core';

export class DrawerItem {
  constructor(public component: Type<any>, public data: any) {}
}

export interface DynamicComponent {
  data: any;
}