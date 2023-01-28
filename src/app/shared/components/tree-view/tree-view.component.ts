import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Size } from '@shared/size';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html'
})
export class TreeViewComponent<T> {
  @Input() dataSource: Array<T>;
  @Input() searchMode: 'contains' | 'startswith' | 'equals' = 'contains';
  @Input() searchExpr: string;
  @Input() keyExpr: string;
  @Input() displayExpr: string;
  @Input() parentIdExpr: string;
  @Input() searchEnabled: boolean = false;
  @Input() size: Size =  { height: '100%', width: '100%' };
  @Output() readonly onItemClick: EventEmitter<T> = new EventEmitter<T>();
  constructor() {}

  selectItem(e: T) {
    this.onItemClick.emit(e);
  }
}
