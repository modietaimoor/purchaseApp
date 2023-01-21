import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

import { ManageProductComponent } from "./manage-products/manage-products.component";
import { ManageProductService } from "./manage-products/manage-products.service"
import { ConfigService } from "@core/services/config.service";
import { AdminComponent } from "./admin/admin.component";
import { OrderContentComponent } from "./orders/order-content/order-content.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrdersService } from "./orders/orders.service";
import { RemoveCommaPipe } from "@core/pipes/remove-comma.pipe";
import { SharedModule } from "@shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddProductComponent } from "./manage-products/add-product/add-product.component";


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
    AddProductComponent,
    RemoveCommaPipe
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, 
    HttpClientModule, 
    RouterModule,
    SharedModule,
    BrowserAnimationsModule],
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
