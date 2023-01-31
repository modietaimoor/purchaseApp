import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { SafeAny } from "@core/safe-any-type";
import { DrawerContentDirective } from "./drawer-content.directive";
import { DrawerItem, DynamicComponent } from "./drawer-items";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.css"]
})
export class DrawerComponent implements OnInit {
  @Input() opened: boolean = true;
  @Input() openedStateMode: 'overlap' | 'shrink' | 'push' = 'shrink';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'left';
  @Input() revealMode: 'slide' | 'expand' = 'slide';
  @Input() closeOnOutsideClick: boolean = false;
  @Input() keyExpr: string;
  @Input() displayExpr: string;
  @Input() height: string | number = '100%';
  @Input() drawItem: DrawerItem;
  @Input() dataSource: Array<any>;
  @Input() elementAttr: string;
  @Output() itemClick: EventEmitter<SafeAny> = new EventEmitter<SafeAny>();
  @ViewChild(DrawerContentDirective, { static: true }) content!: DrawerContentDirective;

  constructor() {}

  ngOnInit(): void { 
    const contentContainerRef = this.content.viewContainerRef;
    contentContainerRef.clear();
    const contentComponentRef = contentContainerRef.createComponent<DynamicComponent>(this.drawItem.component);
    for (let key in this.drawItem.data) {
        (contentComponentRef.instance as unknown)[key] = this.drawItem.data[key];
    }
    contentComponentRef.changeDetectorRef.detectChanges();
  }

  itemClicked(e: SafeAny): void {
    this.itemClick.emit(e);
  }
}


  