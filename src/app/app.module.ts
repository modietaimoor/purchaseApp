import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

import { ManageProductComponent } from "./manage-products/manage-products.component";
import { ManageProductService } from "./manage-products/manage-products.service"
import { ConfigService } from "./core/services/config.service";
import { AdminComponent } from "./admin/admin.component";
import { OrderContentComponent } from "./orders/order-content/order-content.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrdersService } from "./orders/orders.service";
import { RemoveCommaPipe } from "./core/pipes/remove-comma.pipe";
import { DataGridComponent } from "./shared/data-grid/data-grid.component";
import { DataColumnComponent } from "./shared/data-grid/data-column/data-column.component";

export function configServiceFactory(config: ConfigService): () => Promise<boolean> {
  return (): Promise<boolean> => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManageProductComponent,
    DashboardComponent,
    SidebarComponent,
    AdminComponent,
    OrdersComponent,
    OrderContentComponent,
    DataGridComponent,
    DataColumnComponent,
    RemoveCommaPipe
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule, 
    RouterModule],
  providers: [
    ManageProductService, 
    OrdersService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
