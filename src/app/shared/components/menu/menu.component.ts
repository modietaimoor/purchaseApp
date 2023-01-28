import { Component, Input } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html"
})
export class MenuComponent {
  @Input() dataSource;
  @Input() displayExpr: string;
  @Input() width: string | number;
  @Input() height: string | number;
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
  @Input() hideSubmenuOnMouseLeave: boolean = false;
  constructor() {}
}
