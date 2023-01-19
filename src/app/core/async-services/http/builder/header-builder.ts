import { HttpHeaders } from '@angular/common/http';

export function buildHeaders(
  classLevelHeaders: { [key: string]: string },
  methodLevelHeaders: { [key: string]: string }
): HttpHeaders {
  let headers = new HttpHeaders(methodLevelHeaders ? undefined : classLevelHeaders);

  // set method specific Headers
  // for (const key in methodLevelHeaders) {
  //   if (methodLevelHeaders.hasOwnProperty(key)) {
  //     if (headers.has(key)) {
  //       headers = headers.append(key, `${methodLevelHeaders[key]}`);
  //     } else {
  //       headers = headers.set(key, `${methodLevelHeaders[key]}`);
  //     }
  //   }
  // }

  return headers;
}
