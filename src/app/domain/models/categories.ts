export interface Category {
    categoryID: number;
    categoryName: string;
    parentID: number;
    parentName: string;
    creationDate: Date;
    retired: boolean;
    retireDate: Date;
}

export enum CategoryFieldType {
    Text = 'Text',
    Number = 'Number',
    DayMonthYear = 'Day-Month-Year',
    MonthYear = 'Month-Year',
    Year = 'Year',
    YesNo = 'Yes/No',
    Country = 'Country'
}