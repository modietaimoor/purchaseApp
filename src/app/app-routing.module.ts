import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin/admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { ManageCategoriesComponent } from "./manage-categories/manage-categories.component";

import { ManageProductComponent } from './manage-products/manage-products.component';
import { OrdersComponent } from "./orders/orders.component";

const routes: Routes = [
  
  {
    path: "auth/login",
    component: LoginComponent
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "manage-products", component: ManageProductComponent },
      { path: "manage-orders", component: OrdersComponent },
      { path: "manage-categories", component: ManageCategoriesComponent }
    ]
  },
  { path: "", redirectTo: "/auth/login", pathMatch: "full" },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
