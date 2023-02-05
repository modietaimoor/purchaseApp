import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin/admin.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageCategoryService } from './manage-categories/manage-categories.service';
import { AddProductComponent } from './manage-products/add-product/add-product.component';
import { ProductSpecificationsComponent } from './manage-products/add-product/product-specifications/product-specifications.component';
import { ManageProductComponent } from './manage-products/manage-products.component';
import { ManageProductService } from './manage-products/manage-products.service';
import { OrderContentComponent } from './orders/order-content/order-content.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersService } from './orders/orders.service';
import { SpecificationFieldsComponent } from './specification-fields/specification-fields.components';
import { SpecificationFieldsService } from './specification-fields/specification-fields.service';

@NgModule({
  declarations: [ManageProductComponent,
    DashboardComponent,
    AdminComponent,
    OrdersComponent,
    OrderContentComponent,
    AddProductComponent,
    ManageCategoriesComponent,
    ProductSpecificationsComponent,
    SpecificationFieldsComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, AdminRoutingModule],
  providers: [ManageProductService, ManageCategoryService, OrdersService, SpecificationFieldsService],
  exports: [ManageProductComponent,
    DashboardComponent,
    AdminComponent,
    OrdersComponent,
    OrderContentComponent,
    AddProductComponent,
    ManageCategoriesComponent,
    ProductSpecificationsComponent,
    SpecificationFieldsComponent]
})
export class AdminModule {}
