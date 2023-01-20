import { Component, Input } from '@angular/core';
import { SafeAny } from 'src/app/core/safe-any-type';

import { ButtonType } from 'src/app/shared/components/button/button.component';

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
export class CustomButtonDropdownComponent {
  @Input() value: string;
  @Input() row: SafeAny;
  @Input() column: Column;
  @Input() items: Array<{ value: number; name: string; icon: 'exportxlsx' | 'exportpdf' }> = [];
  list: Array<{ id: number; name: string; buttonType: ButtonType }>;

  onButtonsGroupClick(data: { itemData: { value: number } }, func: (id: number | string) => void): void {
    func(data.itemData.value);
  }
}
