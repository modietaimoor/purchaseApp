import { Component } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent {
  menu = [{
    menuItem: 'Manage Products',
    children: [
      { pageName: 'Products List', routerLink: 'admin/manage-products' }
    ]
  },
  {
    menuItem: 'Manage Orders',
    children: [
      { pageName: 'Orders List', routerLink: 'admin/manage-orders' }
    ]
  },
  {
    menuItem: 'Configurations',
    children: [
      { pageName: 'Manage Categories', routerLink: 'admin/manage-categories' }
    ]
  }];
  constructor() {}
}
