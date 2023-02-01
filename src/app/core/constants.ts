export const Menu: MenuItem[] = [
  {
    id: 1,
    title: 'Manage Categories', 
    url: '/admin/manage-categories', 
    icon: 'menu', 
    active: true,
    collapsedTemplate: '<span class="collapsed-item"><i class="dx-icon dx-icon-menu dx-list-item-icon"></i></span>'
  },
  {
    id: 2,
    title: 'Manage Orders', 
    url: '/admin/manage-orders', 
    icon: 'cart', 
    active: false,
    collapsedTemplate: '<span class="collapsed-item"><i class="dx-icon dx-icon-cart dx-list-item-icon"></i></span>'
  },
  {
    id: 3,
    title: 'Manage Products', 
    url: '/admin/manage-products', 
    icon: 'product', 
    active: false,
    collapsedTemplate: '<span class="collapsed-item"><i class="dx-icon dx-icon-product dx-list-item-icon"></i></span>'
  }
];

export interface MenuItem {
    id: number;
    icon?: string;
    title: string;
    url?: string | undefined;
    collapsedTemplate?: string;
    active?: boolean;
    subMenuItems?: MenuItem[] | undefined;
}

export enum BaseURL {
  LoginPage = 'auth/login',
  AdminURL = 'admin',
  PortalURL = 'portal'
}

export enum AdminPage {
  ManageCategories = 'manage-categories',
  ManageProducts = 'manage-products',
  ManageOrders = 'manage-orders'
}

export enum PortalPage {
  Products = 'products'
}