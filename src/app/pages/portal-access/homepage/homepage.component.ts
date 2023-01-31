import { Component, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SafeAny } from "@core/safe-any-type";
import { CategoryModel } from "@domain/models/categories";
import { DrawerItem } from "@shared/components/drawer/drawer-items";
import { ManageCategoryService } from "../../admin-access/manage-categories/manage-categories.service";
import { CategoryProductsComponent } from "../category-products/category-products.component";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
})
export class HomepageComponent implements OnInit {
  menu: CategoryModel[];
  elementAttr: SafeAny = { class: 'bg-teal-500' };
  drawItem: DrawerItem;
  categoryUpdate: EventEmitter<CategoryModel> = new EventEmitter<CategoryModel>();
  constructor(private _router: Router, private _manageCategoryService: ManageCategoryService) {}

  ngOnInit(): void {
    this._manageCategoryService.getAllCategories().subscribe(x => {
      this.menu = x;
      this.drawItem = new DrawerItem(CategoryProductsComponent, { category: x[0] });
      this._router.navigate(['portal/products']);
    });
  }

  navigate(e: { itemData: CategoryModel }): void {
    this._manageCategoryService.updateSelectedCategory(e.itemData);
  }

  backToLogin(): void{
    this._router.navigate(['auth/login']);
  }
}
