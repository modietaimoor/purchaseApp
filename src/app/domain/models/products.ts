export interface PhotoModel {
    imageSrc: string; 
    name: string;
    file: File;
}

export interface ProductGridModel {
    productID: number;
    creationDate: Date;
    productName: string;
    categoryID: number;
    categoryName: string;
    productPrice: number;
    isByWeight: boolean;
}

export enum QuantityType {
    ByQuantity,
    ByWeight
}

export enum ProductValidationResult {
    Valid,
    Invalid
}

export enum ValidationErrorType {
    Error,
    Warning
}

export enum ProductValidationEntity{
    ProductName, 
    ProductPrice, 
    QuantityType, 
    ProductCategory, 
    SpecField
}

export interface QuantityTypeModel {
    id: number;
    name: string
}

export interface ProductValidationModel {
    result: ProductValidationResult;
    invalidData?: Array<InvalidDataEntity>;
}

export interface InvalidDataEntity {
    specFieldID?: number;
    dataEntityType: ProductValidationEntity;
    errorType: ValidationErrorType;
}