import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
  {
    path: "auth/login",
    component: LoginComponent
  },
  {
    path: "admin",
    loadChildren: (): Promise<any> => import('./pages/admin-access/admin.module').then(m => m.AdminModule)
  },
  {
    path: "portal",
    loadChildren: (): Promise<any> => import('./pages/portal-access/portal.module').then(m => m.PortalModule)
  },
  { path: "", redirectTo: "auth/login", pathMatch: "full" },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
