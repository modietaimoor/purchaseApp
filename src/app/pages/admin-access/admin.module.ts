import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin/admin.component';
import { DailySalesByCategoryComponent } from './dashboard/daily-sales/daily-sales-by-category/daily-sales-by-category.component';
import { DailySalesComponent } from './dashboard/daily-sales/daily-sales.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationLabelsComponent } from './dashboard/information-labels/information-labels.component';
import { MonthlySalesByCategoryComponent } from './dashboard/monthly-sales/monthly-sales-by-category/monthly-sales-by-category.component';
import { MonthlySalesComponent } from './dashboard/monthly-sales/monthly-sales.component';
import { YearlySalesByCategoryComponent } from './dashboard/yearly-sales/yearly-sales-by-category/yearly-sales-by-category.component';
import { YearlySalesComponent } from './dashboard/yearly-sales/yearly-sales.component';
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
    SpecificationFieldsComponent,
    DailySalesComponent,
    DailySalesByCategoryComponent,
    MonthlySalesComponent,
    MonthlySalesByCategoryComponent,
    YearlySalesComponent,
    YearlySalesByCategoryComponent,
    InformationLabelsComponent],
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
    SpecificationFieldsComponent,
    DailySalesComponent,
    DailySalesByCategoryComponent,
    MonthlySalesComponent,
    MonthlySalesByCategoryComponent,
    YearlySalesComponent,
    YearlySalesByCategoryComponent,
    InformationLabelsComponent]
})
export class AdminModule {}
