export interface ProductsGridModelResponse {
    ProductID: number;
    CreationDate: Date;
    ProductName: string;
    CategoryID: number;
    CategoryName: string;
    ProductPrice: number;
    IsByWeight: boolean;
    Retired: boolean;
    RetireDate: Date;
}