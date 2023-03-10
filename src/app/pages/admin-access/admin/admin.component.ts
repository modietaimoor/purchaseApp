import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { BaseURL, Menu, MenuItem } from "@core/constants";
import { SafeAny, SafeObjectAny } from "@core/safe-any-type";
import { MenuListItem } from "@shared/components/list/list";
import { ListComponent } from "@shared/components/list/list.component";
import { ToolbarItem } from "@shared/components/toolbar/toolbar";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  logout = () => {
    this._router.navigate([BaseURL.LoginPage]);
  };

  menu: MenuListItem[];
  currentPage: string;
  collapsed: boolean = false;
  selectedItemKeys: string[];
  toolbarItems: ToolbarItem[];
  @ViewChild(ListComponent) listComponent: ListComponent<MenuItem>;
  elementAttr: SafeAny = { class: 'bg-blueGray-500 text-white overflow-y-hidden' };

  constructor(private _router: Router) {}
  
  ngOnInit() {
    this.initializeListAndToolbar();
    this.initializeToolbar();
  }

  initializeListAndToolbar(): void {
    let activeUrl = this._router.url;
    this.menu = Menu.map(x => ({
      id: x.id,
      url: x.url,
      title: x.title,
      active: x.active,
      icon: x.icon,
      html: x.title
    }));
    this.menu.forEach(x => {
      x.icon = this.collapsed ? '' : this.getIconById(x.id);
      x.html = this.collapsed ? this.getHtmlById(x.id) : x.title;
      x.active = x.url === activeUrl;
    });

    this.currentPage = this.menu.find(x => x.url === activeUrl).title;
    this.selectedItemKeys = this.menu.filter(x => x.active === true).map(x => {
      return x.url
    });
    this.listComponent?.refresh();
  }

  initializeToolbar(): void {
    this.toolbarItems = [{
      widget: 'dxButton',
      location: 'before',
      options: {
        icon: 'hidepanel',
        onClick:(e: SafeObjectAny) => { 
          this.collapsed = !this.collapsed;
          e.component.option('icon', this.collapsed ? "showpanel" : "hidepanel");
          this.initializeListAndToolbar();
        }
      },
    },
    {
      widget: 'dxButton',
      location: 'before',
      options: {
        icon: 'dragvertical',
        text: this.currentPage
      },
    }, 
    {
      widget: 'dxButton',
      location: 'after',
      options: {
        icon: 'fa fa-sign-out',
        onClick:() => this.logout()
      },
    }]; 
  }

  getIconById(id: number): string {
    return Menu.find(x => x.id === id).icon;
  }

  getHtmlById(id: number): string {
    return Menu.find(x => x.id === id).collapsedTemplate;
  }

  navigate(e: { itemData: SafeAny }): void {
    this.currentPage = e.itemData.title as string;
    this.initializeToolbar();
    this.menu.forEach(x => x.active = x.url === e.itemData.url);
    this._router.navigate([e.itemData.url]);
  }
}
