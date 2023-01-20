import {
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';

import { ColumnType } from '../model';

@Component({
  selector: 'app-column',
  template: `<ng-template [ngTemplateOutlet]="templateRef"></ng-template> `
})
export class ColumnComponent {
  @Input() name: string;
  @Input() type: ColumnType;
  @Input() dataField: string;
  @Input() filterName: string;
  @Input() fixed: boolean;
  @Input() fixedPosition: 'left' | 'right';
  @Input() alignment: 'right' | 'left' | 'center';
  @Input() isLink: boolean = false;
  @Input() allowSorting?: boolean = true;
  @Input() allowHeaderFiltering?: boolean = true;

  @ContentChild(TemplateRef) templateRef: TemplateRef<unknown>;
  @Output() readonly clickEvent: EventEmitter<string | number> = new EventEmitter<string | number>();
  @ContentChildren(ColumnComponent) public nestedColumns!: QueryList<ColumnComponent>;

  constructor() {}
}
