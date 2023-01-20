import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styles: [
    `
      ::ng-deep .product {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      ::ng-deep .product .title {
        flex: 1;
      }
      ::ng-deep.dx-list-item-content {
        padding: 5px 5px;
      }
    `
  ]
})
export class DataListComponent {
  @Input() readonly list: CustomStore[] = [];
  @Input() readonly searchEnabled: boolean = false;
  @Input() readonly searchExpr: string = '';
  @ContentChild(TemplateRef) templateRef: TemplateRef<unknown>;
  index = 0;
  constructor() {}
}
