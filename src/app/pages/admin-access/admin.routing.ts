import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageProductComponent } from './manage-products/manage-products.component';
import { OrdersComponent } from './orders/orders.component';
import { SpecificationFieldsComponent } from './specification-fields/specification-fields.components';

export const routes: Routes = [
    { 
        path: "", 
        component: AdminComponent,
        children: [    
            { path: "dashboard", component: DashboardComponent },
            { path: "manage-products", component: ManageProductComponent },
            { path: "manage-orders", component: OrdersComponent },
            { path: "manage-categories", component: ManageCategoriesComponent },
            { path: "spec-fields", component: SpecificationFieldsComponent }
        ] 
    }
    //{ path: "**", redirectTo: "", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
