import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';

import { AuthService } from '@core/auth.service';
import { RouteService } from '@core/service/route.service';
import { AppInjector } from '@shared/service/app-Injector.service';
import { NotificationService } from '@shared/service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class HttpResponseHandler {
  private userFacingErrorMessage = 'Unexpected Scenario Encountered - Please try again later.';

  constructor() {}

  public onCatch(response: HttpErrorResponse, _source: Observable<unknown>): Observable<unknown> {
    let errorMessage;
    if (response.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `An error occurred: ${response.error.message}`;
    } else {
      // server-side error occurred.
      this.handleBackendError(response);
    }

    // Return an observable with a user-facing error message.
    return observableThrowError(errorMessage || this.userFacingErrorMessage);
  }

  private handleBackendError(response: HttpErrorResponse): void {
    switch (response.status) {
      case 400:
        // this.handleBadRequest(response);
        break;

      case 401:
        this.handleUnauthorized();
        break;

      case 403:
        // this.handleForbidden();
        break;

      case 404:
        // this.handleNotFound(response);
        break;

      case 500:
        this.handleServerError(response);
        break;

      default:
        break;
    }
  }

  // /**
  //  * Shows notification errors when server response status is 401
  //  */
  // private handleBadRequest(responseBody: unknown): void {}

  // /**
  //  * Shows notification errors when server response status is 401 and redirects user to login page
  //  */
  private handleUnauthorized(): void {
    AppInjector.getInjector().get(AuthService).logout();
    AppInjector.getInjector().get(RouteService).navigateToLogin();
  }

  // /**
  //  * Shows notification errors when server response status is 403
  //  */
  // private handleForbidden(): void {}

  // /**
  //  * Shows notification errors when server response status is 404
  //  */
  // private handleNotFound(responseBody: unknown): void {}

  // /**
  //  * Shows notification errors when server response status is 500
  //  */
  private handleServerError(response: HttpErrorResponse): void {
    if (response.error) this.userFacingErrorMessage = Object.values(response.error)[0].toString();
    AppInjector.getInjector().get(NotificationService).error(this.userFacingErrorMessage);
  }

  // /**
  //  * Parses server response and shows notification errors with translated messages
  //  */
  // private handleErrorMessages(response: unknown): void {}

  // /**
  //  * Returns relative url from the absolute path
  //  */
  // private getRelativeUrl(url: string): string {
  //   return url.toLowerCase().replace(/^(?:\/\/|[^\/]+)*\//, '');
  // }

  // /**
  //  * Shows error notification with given title and message
  //  */
  // private showNotificationError(title: string, message: string): void {}
}
