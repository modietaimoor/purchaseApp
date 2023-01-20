import { Component } from '@angular/core';

import { SafeHardAny } from 'src/app/core/safe-any-type';

import { ColumnType } from './model';

@Component({
  selector: 'app-base',
  template: ``
})
export abstract class BaseGridComponent {
  customTemplate: ColumnType[] = [
    'link',
    'button',
    'bool-sign',
    'circle-sign',
    'custom',
    'number',
    'KB',
    'buttonDropdown',
    'buttons',
    'text-icon',
    'bold-text'
  ];

  // Grid Formats
  numberFormat = {
    type: 'fixedPoint',
    precision: 1
  };

  currencyFormat = {
    type: 'currency',
    precision: 2,
    currency: 'GBP'
  };

  dateUKFormat = 'dd-MM-yyyy';

  getColumnFormat = (type: ColumnType): SafeHardAny => {
    switch (type) {
      case 'number':
      case 'one-decimal-number':
        return this.numberFormat;
      case 'currency':
        return this.currencyFormat;
      case 'date':
        return this.dateUKFormat;

      default:
        return null;
    }
  };

  getColumnGridType = (type: ColumnType): SafeHardAny => {
    switch (type) {
      case 'currency':
      case 'one-decimal-number':
        return 'number';
      case 'link':
        return 'string';
      default:
        return type;
    }
  };

  getColumnAlignment = (col: ColumnType): SafeHardAny => {
    switch (col) {
      case 'number':
      case 'one-decimal-number':
      case 'currency':
      case 'date':
        return 'right';
      case 'date':
        return 'right';
      default:
        return 'left';
    }
  };

  hasCustomTemplate(type: ColumnType): boolean {
    return this.customTemplate.indexOf(type) > -1;
  }

  onEditorPreparing(e: { parentType: string; editorOptions: { onEnterKey: () => void } }): void {
    if (e.parentType == 'filterRow') {
      e.editorOptions.onEnterKey = (): void => {
        const applyButtons = document.getElementsByClassName('dx-apply-button');
        applyButtons[0].dispatchEvent(new Event('dxclick'));
        if (applyButtons.length > 1)
          //TODO:: In AllTicketsPerTicketTypeGridComponent && ChangeUsersListComponent
          // components this array has two elements which is not clear why there is more than on apply button ,
          // investigate to know why this is happen
          document.getElementsByClassName('dx-apply-button')[1].dispatchEvent(new Event('dxclick'));
      };
    }
  }
}
