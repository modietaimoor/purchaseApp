export interface StatusModelResponse {
    StatusID: number;
    StatusName: string;
}

export interface OrderContentResponse {
    OrderID: number;
    ProductID: number;
    ProductName: string;
    ProductPrice: number;
    IsByWeight: boolean;
    CategoryID: number;
    CategoryName: string;
    Quantity: number;
}

export interface OrderResponse {
    key: string;
    count: number;
    OrderID: number;
    UserID?: number;
    Username: string;
    PhoneNumber: string;
    Email: string;
    IsMale?: boolean;
    OrderDate: Date;
    OrderCost: number;
    StatusID: number;
    StatusName: string;
}

export interface OrdersListResponse {
    data: OrderResponse[];
    totalCount: number;
  }

export interface OrderItemsResponse {
    OrderID: number;
    ProductID: number;
    ProductCode: string;
    ProductName: string;
    ProductDescription: string;
    ProductPrice: number;
    Quantity: number;
}