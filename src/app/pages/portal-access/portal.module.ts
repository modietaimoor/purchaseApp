import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { ManageCategoryService } from '../admin-access/manage-categories/manage-categories.service';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PortalRoutingModule } from './portal.routing';
import { PortalComponent } from './portal/portal.component';

@NgModule({
  declarations: [PortalComponent,
    HomepageComponent,
    CategoryProductsComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, PortalRoutingModule],
  providers: [ManageCategoryService],
  exports: [PortalComponent,
    HomepageComponent,
    CategoryProductsComponent]
})
export class PortalModule {}
