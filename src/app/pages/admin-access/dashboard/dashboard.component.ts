import { Component, OnInit } from "@angular/core";
import { Category } from "@domain/models/categories";
import { GetAnestorCategoriesUsecase } from "@domain/repositories/usecases/categories/get-ancestor-categories.usecase";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  reportDate: Date;
  ancestors: Category[];
  constructor(private _getAncestorCategoriesUsecase: GetAnestorCategoriesUsecase) {}

  ngOnInit(): void {
    this.reportDate = new Date();
    this._getAncestorCategoriesUsecase.execute().subscribe(x => (this.ancestors = x));
  }
}
