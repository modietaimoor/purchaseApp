export interface BulkChangeStatusRequest {
    Orders: Array<number>;
    StatusID: number;
}