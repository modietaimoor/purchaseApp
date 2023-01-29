export interface ProductModelRequest {
    ProductName: string;
    CategoryID: number;
    ProductPrice: number;
    IsByWeight: boolean;
    ProductSpecs: ProductSpecsModel[];
}

export interface ProductSpecsModel {
    SpecID: number;
    SpecValue: unknown;
}