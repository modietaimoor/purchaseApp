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
    productCode: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    totalPrice: number;
    size: string;
    quantity: number;
}

export interface StatusModel { 
    statusID: number;
    statusName: string;
}