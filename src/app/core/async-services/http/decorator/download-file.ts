import { RestClient } from '../rest-client';
import { PropertyDescriptorMetadata } from './parameters';

export const DownloadFile =
  (downloadType: DownloadType) =>
  (target: RestClient, propertyKey: string, descriptor: PropertyDescriptorMetadata): PropertyDescriptorMetadata => {
    descriptor.downloadType = downloadType;
    return descriptor;
  };

export enum DownloadType {
  PDF,
  EXCEL,
  CSV
}
