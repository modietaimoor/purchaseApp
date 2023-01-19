/* eslint-disable @typescript-eslint/no-explicit-any */
import { RestClient } from '../rest-client';

/**
 * Defines the adapter function to modify the API response suitable for the app
 *
 * @param TFunction adapterFn - function to be called
 */
export function Map<R>(mapperFn: (par: any) => R): (target: RestClient, propertyKey: string, descriptor: any) => any {
  return (target: RestClient, propertyKey: string, descriptor: any): any => {
    descriptor.mapper = mapperFn || null;
    return descriptor;
  };
}
