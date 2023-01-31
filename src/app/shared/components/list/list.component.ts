import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { SafeAny } from "@core/safe-any-type";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html"
})
export class ListComponent<T> implements OnInit, OnChanges {
  @Input() dataSource: Array<T> = [];
  @Input() hoverStateEnabled: boolean = false;
  @Input() activeStateEnabled: boolean = false;
  @Input() focusStateEnabled: boolean = false;
  @Input() keyExpr: string | null = null;
  @Input() displayExpr: string | null = null;
  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void { 
    console.log(this.dataSource);
    console.log(this.keyExpr);
    console.log(this.displayExpr);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._changeDetectorRef.detectChanges();
    console.log(this.dataSource);
    console.log(this.keyExpr);
    console.log(this.displayExpr);
  }
}
