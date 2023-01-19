import { HttpParams } from '@angular/common/http';

import { ParameterMetadata } from '../decorator/parameters';

export function buildQueryParams(
  url: string,
  queryParamsMetadata: ParameterMetadata[],
  plainQueryParamsMetadata: ParameterMetadata[]
): HttpParams {
  let queryParams: HttpParams = new HttpParams();

  if (!queryParamsMetadata) {
    return queryParams;
  }

  queryParamsMetadata
    // .filter(m => m.value) // filter out optional parameters // allow sending null values because GetDataBlockCharts endpoint will not work without it
    .forEach(m => {
      const value = m.value !== undefined ? stringifyQueryParams(m.value) : '';
      const values = Array.isArray(value) ? value : [value];
      values.forEach(v => (queryParams = queryParams.append(m.key, v)));
    });

  return replacePlainQueryParams(url, plainQueryParamsMetadata, queryParams);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stringifyQueryParams(value: any): string {
  if (Array.isArray(value)) {
    // Array are passed as string parameter so formatData is ignored for now until we need it
    // return formatData(value, format);

    return JSON.stringify(value);
  }

  if (value instanceof Object) {
    return JSON.stringify(value);
  }

  return value;
}

function replacePlainQueryParams(fullUrl: string, metadata: ParameterMetadata[], httpParams: HttpParams): HttpParams {
  let finalHttpParams = httpParams;

  if (!metadata) {
    return finalHttpParams;
  }
  metadata
    .filter(m => m.value) // filter out optional parameters
    .forEach(m => {
      const value: unknown = m.value;

      if (value instanceof Object) {
        Object.entries(value).forEach(([key, value]) => (finalHttpParams = finalHttpParams.append(key, value)));
      } else if (typeof value === 'string') {
        removeLeadingQuestionMark(value)
          .split('&')
          .map(pair => pair.split('='))
          .forEach(([k, v]) => (finalHttpParams = finalHttpParams.append(k, v)));
      } else {
        throw new Error('Value type is not correct');
      }
    });

  return finalHttpParams;
}

function removeLeadingQuestionMark(value: string): string {
  return value.charAt(0) === '?' ? value.substr(1) : value;
}
