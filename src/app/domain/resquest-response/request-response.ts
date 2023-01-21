import { SafeAny } from "@core/safe-any-type";

export interface OrderResponse {
    OrderID: number;
    UserID?: number;
    Username: string;
    PhoneNumber: string;
    Email: string;
    IsMale?: boolean;
    OrderDate: Date;
    Status: StatusModelResponse;
    OrderCost: number;
    OrderItems: Array<OrderItemsResponse>;
}

export interface StatusModelResponse {
    StatusID: number;
    StatusName: string;
}

export interface OrderItemsResponse {
    OrderID: number;
    ProductID: number;
    ProductCode: string;
    ProductName: string;
    ProductDescription: string;
    ProductPrice: number;
    Size: SizeModelResponse;
    Quantity: number;
}

export interface ProductModelRequestResponse {
    ID: number;
    CreationDate: Date;
    ProductCode: string;
    ProductName: string;
    ProductDescription: string;
    ProductPrice: number;
    ProductPhoto?: SafeAny;
    ProductSizes: Array<SizeModelResponse>;
    ProductCategories: Array<CategoryModelResponse>;
}

export interface ProductPhotoModelResponse {
    ProductID: number;
    PhotoBody: SafeAny;
}

export interface SizeModelResponse {
    SizeCode: string;
    SizeDescription: string;
}

export interface CategoryModelResponse {
    CategoryID: number;
    CategoryName: string;
}

export interface BulkChangeStatusRequest {
    Orders: Array<number>;
    StatusID: number;
}