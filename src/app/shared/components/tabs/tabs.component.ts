import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { startWith } from 'rxjs/operators';

import { TabComponent } from './tab.component';

export interface Tab {
  text: string;
  id: number | string;
}
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterViewInit {
  @Input() tabs: Tab[] = [];
  @Input() selectTabIndex: number = 0;
  @Input() showNavButtons: boolean = false;
  @Output() readonly selectTabIndexChange = new EventEmitter<number>();
  // TODO:: this way is deprecated and need to remove it from all the components that implement this way
  @Output() readonly tabChanged: EventEmitter<{ itemData: Tab; itemIndex: number }> = new EventEmitter<{
    itemData: Tab;
    itemIndex: number;
  }>();

  @ContentChildren(TabComponent, { descendants: false })
  public options!: QueryList<TabComponent>;

  public optionList: TabComponent[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // when the component get initialized options.changes Observable was not loaded and at the same time
    // there are list of select options already exists in this.options so we use startWith
    // to run the subscribe manually for one time to get the options array
    this.options.changes.pipe(startWith(this.options)).subscribe(() => {
      this.optionList = this.options.toArray();
      this.tabs = this.optionList.map(r => ({ id: r.index, text: r.title } as Tab));
      this.cdr.markForCheck();
    });
  }

  selectTab(data: { itemData: Tab; itemIndex: number }): void {
    this.selectTabIndex = data.itemIndex;
    this.tabChanged.emit(data);
    this.selectTabIndexChange.emit(data.itemIndex);
  }
}
