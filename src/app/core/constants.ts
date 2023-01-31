export const Menu: MenuItem[] = [{
  title: 'Manage Categories', url: 'admin/manage-categories', icon: 'menu'
  },
  {
    title: 'Manage Orders', url: 'admin/manage-orders', icon: 'cart'
  },
  {
    title: 'Manage Products', url: 'admin/manage-products', icon: 'product'
}];

export interface MenuItem {
    //permission: string;
    icon?: string;
    title: string;
    url?: string | undefined;
    active?: boolean;
    subMenuItems?: MenuItem[] | undefined;
  }