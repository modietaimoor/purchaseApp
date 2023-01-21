import { Component, Input, OnInit } from '@angular/core';

import { SafeAny } from '@core/safe-any-type';
import { ButtonType } from '@shared/components/button/button.component';

import { Column } from '../model';

@Component({
  selector: 'app-button-dropdown-column',
  template: `<dx-drop-down-button
    text="Download"
    [items]="items"
    displayExpr="name"
    keyExpr="id"
    [useSelectMode]="false"
    [dropDownOptions]="{ width: 160 }"
    height="32px"
    (onItemClick)="onButtonsGroupClick($event, column.onClick)"
  ></dx-drop-down-button> `,
  styles: [
    `
      ::ng-deep .dx-list-item-icon-container {
        width: 28px;
        display: inline-block;
      }

      ::ng-deep .dx-icon-exportpdf,
      ::ng-deep .dx-icon-exportxlsx {
        font: 20px/1 DXIcons;
      }
    `
  ]
})
export class ButtonDropdownColumnComponent implements OnInit {
  @Input() value: string;
  @Input() row: SafeAny;
  @Input() column: Column;
  list: Array<{ id: number; name: string; buttonType: ButtonType }>;
  items: Array<{ value: number; name: string; icon: 'exportxlsx' | 'exportpdf' }> = [];

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.list = this.row[this.column.groupButtonGroupProperty] as any;
    if (this.list.length) {
      this.list.forEach(b =>
        this.items.push({
          name: b.name,
          value: b.id,
          icon: b.buttonType === 'pdf' ? 'exportpdf' : 'exportxlsx'
        })
      );
    }
  }

  onButtonsGroupClick(data: { itemData: { value: number } }, func: (id: number | string) => void): void {
    func(data.itemData.value);
  }
}
