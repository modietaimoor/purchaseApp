import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { SafeAny } from "@core/safe-any-type";
import { DxListComponent } from "devextreme-angular";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent<T> {
  @ViewChild(DxListComponent) dxList: DxListComponent;
  @Input() dataSource: Array<T> = [];
  @Input() selectedItemKeys: Array<SafeAny> = [];
  @Input() hoverStateEnabled: boolean = false;
  @Input() activeStateEnabled: boolean = false;
  @Input() focusStateEnabled: boolean = false;
  @Input() grouped: boolean = false;
  @Input() collapsibleGroups: boolean = false;
  @Input() keyExpr: string | null = null;
  @Input() displayExpr: string | null = null;
  @Input() elementAttr: SafeAny = { class: 'panel-list' };
  @Input() selectionMode: 'none' | 'single' | 'multiple' | 'all' = 'single';
  @Output() itemClick: EventEmitter<SafeAny> = new EventEmitter<SafeAny>();
  constructor() {}

  itemClicked(e: SafeAny): void {
    this.itemClick.emit(e);
  }

  refresh(): void {
    this.dxList.instance?.repaint();
  }
}
