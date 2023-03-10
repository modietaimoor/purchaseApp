import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Category } from "@domain/models/categories";
import { Subscription } from "rxjs";
import { ManageCategoryService } from "../../admin-access/manage-categories/manage-categories.service";

@Component({
  selector: "app-category-products",
  templateUrl: "./category-products.component.html"
})
export class CategoryProductsComponent implements OnInit, OnDestroy {
  @Input() category: Category;
  categoryUpdate: Subscription;
  constructor(private _manageCategoryService: ManageCategoryService) {}
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.categoryUpdate?.unsubscribe();
  }
}
