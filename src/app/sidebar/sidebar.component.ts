import { Component } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent {
  collapseShow = "hidden";
  constructor() {}

  toggleCollapseShow(classes: string): void {
    this.collapseShow = classes;
  }
}
