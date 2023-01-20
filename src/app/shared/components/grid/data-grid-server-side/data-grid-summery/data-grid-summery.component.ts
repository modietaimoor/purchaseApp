import { Component } from '@angular/core';

@Component({
  selector: 'app-data-grid-summery',
  templateUrl: './data-grid-summery.component.html',
  styles: [
    `
      span {
        color: green;
      }

      div {
        color: #4a4a4a;
        font-weight: bold;
      }

      ::ng-deep .summary-content > div {
        margin-right: 8px;
        font-size: 10px;
      }

      ::ng-deep .summary-content {
        display: flex;
      }
    `
  ]
})
export class DataGridSummeryComponent {
  summaries: Array<{ label: string; value: string }> = [];
  colspan = 0;
  public _collection: Array<{ summeryFormat: string; summeryNumbers: string }>;

  constructor() {}

  set collection(collection: Array<{ summeryFormat: string; summeryNumbers: string }>) {
    this.colspan = collection.length + 1;
    this._collection = collection;
    this.onCollectionChange(collection);
  }

  onCollectionChange(collection: Array<{ summeryFormat: string; summeryNumbers: string }>): void {
    for (const summary of Array.from(collection)) {
      if (summary.summeryFormat.split(':').length == 1) {
        const label = '';
        const value = summary.summeryFormat.replace('{0}', summary.summeryNumbers.toString());
        this.summaries.push({ label, value });
      } else {
        const summaryStructure = summary.summeryFormat.split(':');
        const label = summaryStructure[0].trim();
        const value = summaryStructure[1].trim().replace('{0}', summary.summeryNumbers.toString());
        this.summaries.push({ label, value });
      }
    }
  }
}
