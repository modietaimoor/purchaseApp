import { Component, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseURL, Menu, PortalPage } from "@core/constants";
import { SafeAny, SafeObjectAny } from "@core/safe-any-type";
import { CategoryModel } from "@domain/models/categories";
import { GroupedListItem } from "@shared/components/list/list";
import { ToolbarItem } from "@shared/components/toolbar/toolbar";
import { ManageCategoryService } from "../../admin-access/manage-categories/manage-categories.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
})
export class HomepageComponent implements OnInit {
  categories: CategoryModel[];
  selectedItemKeys: number[];
  menu: GroupedListItem[];
  collapsed: boolean = false;
  elementAttr: SafeAny = { class: 'bg-teal-500' };
  toolbarItems: ToolbarItem[] = [{
    widget: 'dxButton',
    location: 'before',
    options: {
      icon: 'hidepanel',
      onClick:(e: SafeObjectAny) => { 
        this.collapsed = !this.collapsed;
        e.component.option('icon', this.collapsed ? "showpanel" : "hidepanel");
        this.initializeList();
      }
    },
  }, 
  {
    widget: 'dxButton',
    location: 'after',
    options: {
      icon: 'fa fa-sign-out',
      onClick:() => this.backToLogin()
    },
  }];
  categoryUpdate: EventEmitter<CategoryModel> = new EventEmitter<CategoryModel>();
  constructor(private _router: Router, private _manageCategoryService: ManageCategoryService) {}

  ngOnInit(): void {
    this._manageCategoryService.getAllCategories().subscribe(x => {
      this.categories = x;
      this.menu = x.filter(y => y.parentID <= 0).map(y => {
        return {
          key: y.categoryName,
          items: x.filter(h => h.parentID === y.categoryID)
        }
      });
      //this.selectedItemKeys = [this.categories[0].categoryID];
      this._router.navigate([BaseURL.PortalURL + '/' + PortalPage.Products]);
      this.updateCategory(this.categories[0]);
    });
  }

  navigate(e: { itemData: CategoryModel }): void {
    this.updateCategory(e.itemData);
  }

  updateCategory(category: CategoryModel) : void {
    this._manageCategoryService.updateSelectedCategory(category);
  }

  backToLogin(): void{
    this._router.navigate([BaseURL.LoginPage]);
  }

  initializeList(): void {
    /*this.menu.forEach(x => {
      x.icon = this.collapsed ? '' : this.getIconById(x.id);
      x.html = this.collapsed ? this.getHtmlById(x.id) : x.title;
    });
    this.selectedItemKeys = this.menu.filter(x => x.active === true).map(x => {
      return x.url
    });
    this.listComponent?.refresh();*/
  }

  getIconById(id: number): string {
    return Menu.find(x => x.id === id).icon;
  }

  getHtmlById(id: number): string {
    return Menu.find(x => x.id === id).collapsedTemplate;
  }
}
