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
import { SafeAny } from '@core/safe-any-type';
import { startWith } from 'rxjs/operators';

import { TabComponent } from './tab.component';

export interface Tab {
  text: string;
  id: number | string;
}
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterViewInit {
  @Input() tabs: Tab[] = [];
  @Input() selectTabIndex: number = 0;
  @Input() showNavButtons: boolean = false;
  @Input() tabColor: 'BlueGray' | 'Red' | 'Orange' | 'Amber' | 'Emerald' | 'Teal' | 'LightBlue' | 'Indigo' | 'Purple' | 'Pink' = 'BlueGray';
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
    this.options.changes.pipe(startWith(this.options)).subscribe(() => {
      this.optionList = this.options.toArray();
      this.tabs = this.optionList.map(r => ({ id: r.index, text: r.title } as Tab));
      this.cdr.markForCheck();
    });
  }

  onContentReady($event: SafeAny): void {
    let tabElements = document.getElementsByClassName("dx-tab");
    if(tabElements?.length > 0) {
      for(let i = 0; i < tabElements.length; i++){
        tabElements[i].classList.add(this.tabColor);
      }
    }
  }

  selectTab(data: { itemData: Tab; itemIndex: number }): void {
    this.selectTabIndex = data.itemIndex;
    this.tabChanged.emit(data);
    this.selectTabIndexChange.emit(data.itemIndex);
  }
}
