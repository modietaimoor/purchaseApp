import { HttpClient } from '@angular/common/http';

import { RestClient } from '../rest-client';
import { DownloadType } from './download-file';
export const MetadataKeySuffix = {
  pathParam: `_PathParam_parameters`,
  queryParam: `_QueryParam_parameters`,
  plainQuery: `_PlainQuery_parameters`,
  body: `_Body_parameters`,
  plainBody: `_PlainBody_parameters`
};

export interface PropertyDescriptorMetadata extends PropertyDescriptor {
  headers?: { [key: string]: string };
  downloadType?: DownloadType;
  http?: HttpClient;
}

export interface ParameterMetadata {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: stringcore | any;
  index: number;
  format: string;
}

export const paramBuilder = (paramName: string) => (key: string) => {
  return (target: RestClient, propertyKey: string | symbol, index: number): void => {
    const metadataKey = `${propertyKey as string}${paramName}`;
    const metadata = { key: key, index };
    (target as unknown)[metadataKey] = (target as unknown)[metadataKey] || ([] as unknown[]);
    (target as unknown)[metadataKey].push(metadata);
  };
};

/**
 * Path variable of a method's url, type: string
 *
 * @param string key - path key to bind value
 */
export let PathParam = paramBuilder(MetadataKeySuffix.pathParam);
/**
 * Query value of a method's url, type: string
 *
 * @param string key - query key to bind value
 */
export let Query = paramBuilder(MetadataKeySuffix.queryParam);
/**
 * Body of a REST method, type: key-value pair object
 * Only one body per method!
 */
export let Body = paramBuilder(MetadataKeySuffix.body)(MetadataKeySuffix.body);
