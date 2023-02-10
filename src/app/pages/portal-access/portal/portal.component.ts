import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdPopuplist, BaseURL } from "@core/constants";
import { SafeAny } from "@core/safe-any-type";
import { ToolbarItem } from "@shared/components/toolbar/toolbar";

@Component({
  selector: "app-portal",
  templateUrl: "./portal.component.html",
  styleUrls: ["./portal.component.css"]
})
export class PortalComponent implements OnInit {
  searchText = '';
  popoverShow = false;
  popupText = '';
  position = 'bottom';
  target: string;
  itemsCount = 99;
  popoverDetails = AdPopuplist;
  searchToolBarItmes: ToolbarItem[] = [
    {
      widget: 'dxTextBox',
      location: 'center',
      options: {
        showClearButton: true,
        placeholder: 'Search Products.',
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
  
  constructor(private _router: Router) {}
  
  ngOnInit() {
    
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

  backToLogin(): void {
    this._router.navigate([BaseURL.LoginPage]);
  }

  searchProducts(): void {
    console.log(this.searchText);
  }
}
