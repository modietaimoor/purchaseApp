export interface CategoryResponse {
    CategoryID: number;
    CategoryName: string;
    ParentID: number;
    ParentName: string;
    CreationDate: Date,
    Retired: boolean,
    RetireDate: Date,
}