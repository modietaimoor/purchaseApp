import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnChanges,
  Type,
  ViewContainerRef
} from '@angular/core';

//import { BoldTextColumnComponent } from 'src/app/shared/components/grid/columns/bold-text-column.component';
//import { CircleSignColumnComponent } from 'src/app/shared/components/grid/columns/circle-sign-column.component';
//import { CustomButtonDropdownComponent } from 'src/app/shared/components/grid/columns/custom-button-dropdown.component';
import { formatDate as dxFormatDate } from 'devextreme/localization';
import { SafeHardAny } from 'src/app/core/safe-any-type';

import { BooleanSignColumnComponent } from '../columns/boolean-sign-column.component';
import { ButtonColumnComponent } from '../columns/button-column.component';
import { ButtonDropdownColumnComponent } from '../columns/button-dropdown.component';
import { ButtonsColumnComponent } from '../columns/buttons-column.component';
import { CustomColumnComponent } from '../columns/custom-column.component';
import { LinkColumnComponent } from '../columns/link-column.component';
import { NumberColumnComponent } from '../columns/number-column.component';
import { Column, ColumnType } from '../model';

@Component({
  selector: 'app-column-cell',
  template: `<ng-template #widgetContainer></ng-template> `
})
export class ColumnCellComponent implements OnChanges {
  @Input() column: Column;
  @Input() columns: Column[];
  @Input() text: string;
  @Input() id: string | number;
  @Input() enable: boolean;
  @Input() rowIndex: number;
  @Input() row: SafeHardAny;
  @Input() dataField: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentRef: ComponentRef<any>;
  columnsComponents: Map<ColumnType, unknown> = new Map<ColumnType, unknown>([
    ['button', ButtonColumnComponent],
    ['link', LinkColumnComponent],
    ['bool-sign', BooleanSignColumnComponent],
    //['circle-sign', CircleSignColumnComponent],
    ['number', NumberColumnComponent],
    ['custom', CustomColumnComponent],
    ['buttonDropdown', ButtonDropdownColumnComponent],
    //['customButtonDropdown', CustomButtonDropdownComponent],
    ['buttons', ButtonsColumnComponent]/*,
    ['bold-text', BoldTextColumnComponent]*/
  ]);

  constructor(private viewContainerRef: ViewContainerRef, private resolver: ComponentFactoryResolver) {}

  ngOnChanges(): void {
    if (this.columns?.length > 0) {
      this.column = this.columns.find(d => d.dataField === this.dataField);
      this.enable = this.row[this.column.enableButtonBasedOn];
    }
    this.createComponent();
  }

  createComponent(): void {
    this.viewContainerRef.clear();
    const factory: ComponentFactory<unknown> = this.resolver.resolveComponentFactory(
      this.columnsComponents.get(this.column.isLink ? 'link' : this.column.type) as Type<unknown>
    );
    this.componentRef = this.viewContainerRef.createComponent(factory) as ComponentRef<unknown>;
    this.componentRef.instance.row = this.row;
    this.componentRef.instance.id = this.id;
    this.componentRef.instance.value =
      this.column.type === 'date' ? dxFormatDate(new Date(this.text), 'dd-MM-yyyy h:mm:ss a') : this.text; // TODO :: find a better way to combine date with link component
    this.componentRef.instance.column = this.column;
    this.componentRef.instance.templateRef = this.column.templateRef;
    this.componentRef.instance.clickEvent = this.column.clickEvent;
    this.componentRef.instance.enableExpression = this.enable;
    this.componentRef.instance.rowIndex = this.rowIndex;
  }

  destroyComponent(): void {
    if (this.componentRef) {
      this.viewContainerRef.detach();
      this.viewContainerRef.clear();
      this.viewContainerRef.remove();
      this.componentRef.destroy();
    }
  }
}
