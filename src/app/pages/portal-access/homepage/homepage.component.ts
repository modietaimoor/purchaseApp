import { Component, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdPopuplist, BaseURL, Menu, PortalPage } from "@core/constants";
import { SafeAny, SafeObjectAny } from "@core/safe-any-type";
import { Category } from "@domain/models/categories";
import { GroupedListItem } from "@shared/components/list/list";
import { ToolbarItem } from "@shared/components/toolbar/toolbar";
import { ManageCategoryService } from "../../admin-access/manage-categories/manage-categories.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})
export class HomepageComponent implements OnInit {
  categories: Category[];
  selectedItemKeys: number[];
  menu: GroupedListItem[];
  popoverShow = false;
  position = 'bottom';
  elementAttr: SafeAny = { class: 'bg-teal-500' };
  itemsCount = 99;
  popupText = '';
  searchText = '';
  searchToolBarItmes: ToolbarItem[] = [
    {
      widget: 'dxTextBox',
      location: 'center',
      options: {
        showClearButton: true,
        placeholder: 'Search Products...',
        valueChangeEvent: "keyup",
        onValueChanged:(e: SafeAny) => {
          this.searchText = e.value?.toString();
        },
        elementAttr: { class: 'w-search text-blueGray-600 bg-white rounded input-text shadow'}
      }
    },
    {
      widget: 'dxButton',
      location: 'center',
      options: {
        icon: 'search',
        onClick:() => this.searchProducts()
      }
    }];
    
  public hoverText: string;
  target: string;
  popoverDetails = AdPopuplist;
  constructor(private _router: Router, private _manageCategoryService: ManageCategoryService) {}

  ngOnInit(): void {
  }

  searchProducts(): void {
    console.log(this.searchText);
  }

  textChanged(e: SafeAny) : void {
    console.log(e);
  }

  showCartDetails() : void {

  }

  showPopup(e: MouseEvent): void {
    this.target = '#' + e.target['id'];
     this.popupText = this.popoverDetails.find(x => x.id == e.target['id']).text;
    this.popoverShow = true;
  }

  hidePopup() : void {
    this.popoverShow = false;
  }

  navigate(e: { itemData: Category }): void {
    this.updateCategory(e.itemData);
  }

  updateCategory(category: Category) : void {
    //this._manageCategoryService.updateSelectedCategory(category);
  }

  backToLogin(): void{
    this._router.navigate([BaseURL.LoginPage]);
  }

  getIconById(id: number): string {
    return Menu.find(x => x.id === id).icon;
  }

  getHtmlById(id: number): string {
    return Menu.find(x => x.id === id).collapsedTemplate;
  }
}
