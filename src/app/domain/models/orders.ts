import { SizeModel } from "./products";

export interface Order {
    orderID: number;
    userID?: number;
    username: string;
    phoneNumber: string;
    email: string;
    isMale?: boolean;
    orderDate: Date;
    status: StatusModel;
    orderCost: number;
    orderItems: Array<OrderItems>;
    selected: boolean;
    rowExpanded: boolean;
    editMode: boolean;
    dropDownOpened: boolean;
}

export interface OrderItems {
    orderID: number;
    productID: number;
    productCode: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    size: SizeModel;
    quantity: number;
}

export interface StatusModel { 
    statusID: number;
    statusName: string;
    selected?: boolean;
}