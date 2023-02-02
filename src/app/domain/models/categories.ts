export interface CategoryModel {
    categoryID: number;
    categoryName: string;
    parentID: number;
    parentName: string;
    specFields: Array<SpecFields>;
}

export interface SpecFields {
    specFieldID: number;
    fieldName: string;
    fieldType: string;
    isMandatory: boolean;
}

export interface ProductSpecValues {
    specFieldID: number;
    fieldName: string;
    fieldType: string;
    isMandatory: boolean;
    specValue: unknown;
}

export enum CategoryFieldType {
    Text = 'Text',
    Number = 'Number',
    DayMonthYear = 'Day-Month-Year',
    MonthYear = 'Month-Year',
    Year = 'Year',
    YesNo = 'Yes/No'
}