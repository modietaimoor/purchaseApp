import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Menu, MenuItem } from "@core/constants";
import { SafeAny } from "@core/safe-any-type";
import { DrawerItem } from "@shared/components/drawer/drawer-items";
import { ManageCategoriesComponent } from "../manage-categories/manage-categories.component";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  menu: MenuItem[];
  drawItem: DrawerItem;
  elementAttr: SafeAny = { class: 'bg-blueGray-500' };
  constructor(private _router: Router) {}
  
  ngOnInit() {
    this.menu = Menu;
    this.drawItem = new DrawerItem(ManageCategoriesComponent, { });
    this._router.navigate(['admin/manage-categories']);
  }

  navigate(e: MenuItem): void {
    this._router.navigate([e.url]);
  }
}
