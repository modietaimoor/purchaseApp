import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from '@angular/common/http';

import { ConfigService } from "@core/services/config.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./pages/login/login.component";


export function configServiceFactory(config: ConfigService): () => Promise<boolean> {
  return (): Promise<boolean> => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,    
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, 
    HttpClientModule, 
    RouterModule,
    BrowserAnimationsModule],
  providers: [
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
