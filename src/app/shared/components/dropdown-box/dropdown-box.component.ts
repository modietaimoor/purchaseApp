import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SafeAny } from '@core/safe-any-type';
import { Size } from '@shared/size';
import { DxDropDownBoxComponent } from 'devextreme-angular';
import { DropDownTemplateType} from './template-type';

@Component({
  selector: 'app-dropdown-box',
  templateUrl: './dropdown-box.component.html'
})
export class DropdownBoxComponent<T> {
  @Input() size: Size =  { height: '100%', width: '100%' };
  @Input() dataSource: Array<T> = [];
  @Input() valueExpr: string;
  @Input() displayExpr: string;
  @Input() parentIdExpr?: string;
  @Input() templateViewType: DropDownTemplateType = DropDownTemplateType.TreeView;
  @ViewChild(DxDropDownBoxComponent) dropDown: DxDropDownBoxComponent;
  @Output() readonly valueChanged: EventEmitter<T> = new EventEmitter<T>();
  value: T;
  opened = false;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  setTreeSelection(e: { itemData: T }): void {
    this.value = e.itemData[this.valueExpr];
    this.opened = false;
    this._changeDetectorRef.detectChanges();
    this.valueChanged.emit(this.value);
  }

  checkForClear(e: { value : SafeAny}): void{
    if(this.value == null){
      this.valueChanged.emit(this.value);
    }
  }

}
