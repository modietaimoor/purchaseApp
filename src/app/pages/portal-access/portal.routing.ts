import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PortalComponent } from './portal/portal.component';

export const routes: Routes = [
    { 
        path: "", 
        component: HomepageComponent,
        children: [    
            { path: "homepage", component: PortalComponent },
            { path: "products", component: CategoryProductsComponent }/*,
            { path: "manage-orders", component: OrdersComponent },
            { path: "manage-categories", component: ManageCategoriesComponent }*/
        ] 
    }
    //{ path: "**", redirectTo: "", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule {}
