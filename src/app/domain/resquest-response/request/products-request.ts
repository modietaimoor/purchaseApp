import { SafeAny } from "@core/safe-any-type";

export interface ProductModelRequest {
    ProductName: string;
    CategoryID: number;
    ProductPrice: number;
    IsByWeight: boolean;
    Photos: File[];
    ProductSpecs: ProductSpecsModel[];
}

export interface ProductSpecsModel {
    SpecID: number;
    SpecValue: SafeAny;
}