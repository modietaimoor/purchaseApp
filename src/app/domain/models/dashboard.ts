export interface SalesModel {
    reportDate: Date;
    statusID: number;
    ordersCost: number;
    ordersItemsCount: number;
    ordersCount: number;
}

export interface SalesByCategoryModel {
    categoryID: number;
    categoryName: string;
    statusID: number;
    ordersCost: number;
    ordersItemsCount: number;
}

export enum InfoLabelType{
    Year,
    Month,
    Day
}