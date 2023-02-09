export interface SalesResponse {
    StatusID: number;
    OrdersCost: number;
    OrdersItems: number;
    OrdersCount: number;
}

export interface SalesByCategoryResponse extends SalesResponse {
    AncestorID: number;
    AncestorName: string
}

export interface DailySalesResponse extends SalesResponse {
    ReportDay: Date;
}

export interface MonthlySalesResponse extends SalesResponse {
    ReportMonth: Date;
}

export interface YearlySalesResponse extends SalesResponse {
    ReportYear: number;
}