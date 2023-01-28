export interface Order {
    orderID: number;
    userID?: number;
    username: string;
    phoneNumber: string;
    email: string;
    isMale?: boolean;
    orderDate: Date;
    orderTime: Date;
    statusID: number;
    statusName: string;
    orderCost: number;    
}

export interface OrderItems {
    orderID: number;
    productID: number;
    categoryID: number;
    categoryName: string;
    productName: string;
    isByWeight: boolean;
    productPrice: number;
    totalPrice: number;
    quantity: number;
}

export interface StatusModel { 
    statusID: number;
    statusName: string;
}