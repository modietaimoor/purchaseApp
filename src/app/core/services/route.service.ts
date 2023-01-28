import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//import { Path } from '@core/constants/path';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  constructor(private router: Router) {}

  /*
  navigateToAuth(path: string, ...params: Array<string | number>): void {
    if (params.length > 0) this.navigate(`${Path.AuthBaseUrl}/${path}`, ...params);
    else this.navigate(`${Path.AuthBaseUrl}/${path}`);
  }

  navigateToUserAccess(path: string): void {
    this.navigate(`${Path.UserBaseUrl}/${path}`);
  }

  navigateToCompanyAccess(path: string, ...params: Array<string | number>): void {
    this.navigate(`${Path.CompanyBaseUrl}/${path}`, ...params);
  }

  navigateToCostCenterAccess(path: string, ...params: Array<string | number>): void {
    this.navigate(`${Path.CostCenterBaseUrl}/${path}`, ...params);
  }

  navigateToUnauthorized(brand: string): void {
    this.router.navigate([`${brand}/${Path.Unauthorized}`]);
  }

  navigateToLogin(): void {
    this.navigate(`${Path.AuthBaseUrl}/${Path.Login}`);
  }

  private navigate(path: string, ...params: Array<string | number>): void {
    this.router.navigate([`${AuthService.instance.currentBrand}/${path}`, ...params]);
  }

  navigateToHome(userType: UserType): void {
    switch (userType) {
      case UserType.Company:
        this.navigateToCompanyAccess(Path.CompanySummary);
        break;

      case UserType.CostCenter:
        this.navigateToCompanyAccess(Path.CompanySummary);
        break;

      case UserType.User:
        this.navigateToUserAccess(Path.UserSummary);
        break;

      default:
        this.navigateToLogin();
        break;
    }
  }*/
}
