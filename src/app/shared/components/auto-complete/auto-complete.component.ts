import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { AuthService } from 'src/app/core/auth.service';
import { AppSettings } from 'src/app/core/service/app.settings.service';
import { DxAutocompleteComponent } from 'devextreme-angular';
import data from 'devextreme/data/odata/store';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html'
})
export class AutoCompleteComponent<T> implements OnChanges {
  @ViewChild('autoComplete') autoComplete: DxAutocompleteComponent;
  @Input() dataSource: T[] | data;
  @Input() loadUrl: string = '';
  @Input() searchColumnName: string;
  @Input() key: string = 'id';
  @Input() readonly placeholder: string = 'Search..';
  remoteDataSource: data;

  constructor(private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loadUrl && changes.key && changes.searchColumnName) {
      setTimeout(() => {
        if (this.autoComplete)
          this.setLoadUrl(
            changes.loadUrl.currentValue,
            changes.searchColumnName.currentValue,
            changes.key.currentValue
          );
      }, 500);
    }
    if (changes.dataSource) {
      setTimeout(() => {
        if (this.autoComplete) this.setDataSource(changes.dataSource.currentValue);
      }, 500);
    }
  }

  getValue(): string {
    return this.autoComplete.instance.option('value');
  }

  setLoadUrl(loadUrl: string, searchColumnName: string, key: string): void {
    this.loadUrl = loadUrl;
    this.searchColumnName = searchColumnName;
    this.key = key;
    this.autoComplete.instance.option(
      'dataSource',
      new data({
        url: `${AppSettings.configuration.api.baseUrl}/${this.loadUrl}`,
        key: this.key,
        beforeSend: (e): void => {
          e.params = {
            skip: 0,
            take: 10,
            group: JSON.stringify([{ selector: this.searchColumnName }]),
            filter: JSON.stringify([this.searchColumnName, 'contains', this.getValue()])
          };
          e.headers = {
            AuthorizationHeader: this.authService.token
          };
        }
      })
    );
  }

  setDataSource(dataSource: T[]): void {
    this.dataSource = dataSource;
    this.autoComplete.instance.option('dataSource', this.dataSource);
  }
}
