import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppInjector } from '@shared/service/app-Injector.service';

import { HttpAdapter } from './http-adapter';
import { HttpResponseHandler } from './http-response-handler';
import { AppSettings } from '@core/services/app.settings.service';

@Injectable({
  providedIn: 'root'
})
export class RestClient {
  public constructor(protected http: HttpClient) {}

  public getBaseUrl(): string {
    return AppSettings.configuration.api.baseUrl;
  }

  public getDefaultHeaders(): { [key: string]: string } {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
  }

  public getPDFHeaders(): { [key: string]: string } {
    return {
      Accept: 'application/pdf, text/plain',
      'Content-Type': 'application/json'
    };
  }

  public isWithCredentials(): boolean {
    return false;
  }

  public requestInterceptor(request: HttpRequest<string>): HttpRequest<string> {
    // TODO: find a better solution to handle endpoints headers
    /*if (
      !request.url.includes('GetLogin') &&
      !request.url.includes('ValidateNewAccount') &&
      !request.url.includes('SendResetPasswordEmail') &&
      !request.url.includes('RegisterNewUser') &&
      !request.url.includes('CompanyUserCountDownTimerGet') &&
      !request.url.includes('ResetPassword') &&
      !request.url.includes('GetBrandingLogin')
    ) {
      const serverToken = AuthService.instance.token;
      request = request.clone({
        setHeaders: {
          AuthorizationHeader: serverToken
        }
      });
    }
    // TODO: find a better solution to handle endpoints headers
    if (request.url.includes('SaveRouter') || request.url.includes('EditRouter')) {
      request = request.clone({ headers: request.headers.delete('Content-Type') });
    }*/
    return request;
  }

  public responseInterceptor(observableRes: Observable<HttpResponse<unknown>>): Observable<unknown> {
    return observableRes.pipe(
      map(res => HttpAdapter.baseAdapter(res)),
      catchError((err, source) => {
        return AppInjector.getInjector().get(HttpResponseHandler).onCatch(err, source);
      })
    );
  }
}
