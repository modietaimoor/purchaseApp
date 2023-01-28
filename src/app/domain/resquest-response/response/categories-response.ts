export interface CategoryModelResponse {
    CategoryID: number;
    CategoryName: string;
    ParentID: number;
    ParentName: string;
    CreationDate: Date,
    SpecFields: Array<CategorySpecFields>;
}

export interface CategorySpecFields {
    SpecFieldID: number;
    CategoryID: number;
    FieldName: string;
    FieldType: string;
    IsMandatory: boolean;
}

export interface Category {
    CategoriesList: Array<CategoryModelResponse>;
    SpecFieldsList: Array<CategorySpecFields>;
}