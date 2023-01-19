import { RestClient } from '../rest-client';
import { PropertyDescriptorMetadata } from './parameters';

// Method header apply only on the decorated method
export const Headers =
  (httpHeaders: { [key: string]: string }) =>
  (target: RestClient, propertyKey: string, descriptor: PropertyDescriptorMetadata): PropertyDescriptorMetadata => {
    descriptor.headers = httpHeaders;
    return descriptor;
  };
