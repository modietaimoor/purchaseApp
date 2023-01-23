import { Component } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent {
  collapseShow = "hidden";
  menu = [{
    menuItem: 'Products',
    children: [
      { pageName: 'Manage Products', routerLink: 'admin/manage-products' },
      { pageName: 'Manage Orders', routerLink: 'admin/orders' }
    ]
  }];
  constructor() {}

  toggleCollapseShow(): void {
    this.collapseShow = this.collapseShow === '' ? "hidden" : "";
  }
}
