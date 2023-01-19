/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';

import { DownloadType } from '../decorator/download-file';
import { MetadataKeySuffix, ParameterMetadata, PropertyDescriptorMetadata } from '../decorator/parameters';
import { RequestMethod } from '../decorator/request-methods';
import { RestClient } from '../rest-client';
import { buildBody } from './body-builder';
import { buildHeaders } from './header-builder';
import { buildQueryParams } from './query-params-builder';
import { buildUrl } from './url-builder';

export const methodBuilder = function (method: RequestMethod): any {
  return function (annotationArgs: string): any {
    return function (target: RestClient, propertyKey: string, descriptor: PropertyDescriptorMetadata): any {
      descriptor.value = function (...targetMethodArgs: any[]): Observable<HttpResponse<any>> {
        const metadata = getMetadata(target, propertyKey, targetMethodArgs);
        // TODO:: find a better way to detect dynamic urls
        const path = metadata.pathParams.find(e => e.key === 'loadUrl')?.value ?? getPath(annotationArgs);
        const url = buildUrl(target.getBaseUrl(), path, metadata.pathParams);
        const body = buildBody(metadata.body, metadata.plainBody);
        const headers = buildHeaders(
          descriptor.downloadType === DownloadType.PDF ? target.getPDFHeaders() : target.getDefaultHeaders(),
          descriptor.headers
        );
        const params = buildQueryParams(url, metadata.queryParams, metadata.plainQueryParams);

        const mapper = getMapper(descriptor);

        // Make the HTTP request
        let request = new HttpRequest(method, url, body, {
          headers,
          params,
          withCredentials: target.isWithCredentials(),
          responseType:
            descriptor.downloadType === DownloadType.PDF || descriptor.downloadType === DownloadType.EXCEL
              ? ('blob' as 'blob')
              : descriptor.downloadType === DownloadType.CSV
              ? 'text'
              : 'json'
        });

        // intercept the request
        request = target.requestInterceptor(request);

        // make the request and store the observable for later transformation
        const response$: Observable<HttpEvent<any>> = this.http.request(request);

        // filter by HttpResponse to avoid returning {type:0}
        let observable: Observable<HttpResponse<any>> = response$.pipe(
          filter((event: any) => event instanceof HttpResponse)
        );

        // intercept the response
        const observableResponse = target.responseInterceptor(observable);

        // apply mappers
        // observable = observable.pipe(map((response: any) => applyMapDecorator(mapper, response)));

        // apply mappers , use shareReplay to use the same request with multiples subscribers
        // Example
        // will cause additional requests (two in total)
        // this.getData().subscribe();
        // this.getData().subscribe();

        // will be shared using shareReplay (one in total)
        // const data$ = this.getData();
        // data$.subscribe();
        // data$.subscribe();
        const observableAfterMapping = observableResponse.pipe(
          shareReplay(1),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          map((response: any) => applyMapDecorator(mapper, response))
        );

        return observableAfterMapping;
      };

      return descriptor;
    };
  };
};
function getMetadata(
  target: RestClient,
  propertyKey: string,
  methodArgs: string[]
): { [key: string]: ParameterMetadata[] } {
  return {
    pathParams: enrichMetadata(target[propertyKey + MetadataKeySuffix.pathParam], methodArgs),
    body: enrichMetadata(target[propertyKey + MetadataKeySuffix.body], methodArgs),
    plainBody: enrichMetadata(target[propertyKey + MetadataKeySuffix.plainBody], methodArgs),
    queryParams: enrichMetadata(target[propertyKey + MetadataKeySuffix.queryParam], methodArgs),
    plainQueryParams: enrichMetadata(target[propertyKey + MetadataKeySuffix.plainQuery], methodArgs)
  };
}

function enrichMetadata(metadata: ParameterMetadata[], methodArgs: string[]): ParameterMetadata[] {
  if (!metadata) {
    return [];
  }

  if (!methodArgs) {
    return metadata;
  }

  return metadata.map(m => ({ ...m, value: methodArgs[m.index] ?? m.value }));
}

function getPath(request: string): string {
  return request;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMapper(descriptor: any): (resp: any) => any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return descriptor.mapper ? descriptor.mapper : x => x;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyMapDecorator(mapper: (resp: any) => any, responseBody: any): any {
  return mapper(responseBody);
}
