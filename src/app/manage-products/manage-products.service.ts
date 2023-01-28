import { Injectable } from '@angular/core';
import { CategoryModel, ProductSpecValues } from '@domain/models/categories';
import { PhotoModel, ProductGridModel, ProductValidationEntity, ProductValidationModel, ProductValidationResult, QuantityType, ValidationErrorType } from '@domain/models/products';
import { DeleteProductsUsecase } from '@domain/repositories/usecases/products/delete-products.usecase';
import { GetAllProductsUsecase } from '@domain/repositories/usecases/products/get-all-products.usecase';
import { SaveProductUsecase } from '@domain/repositories/usecases/products/save-product.usecase';
import { ProductModelRequest } from '@domain/resquest-response/request/products-request';
import { Observable } from 'rxjs';

@Injectable()
export class ManageProductService {
  constructor(private _saveProductUsecase: SaveProductUsecase, 
    private _deleteProductsUsecase: DeleteProductsUsecase,
    private _getAllProductsUsecase: GetAllProductsUsecase) { }

  public validateProductData(productName: string, 
    productPrice: number, 
    productCategory: CategoryModel, 
    quantityType: number, 
    specValues: ProductSpecValues[]): ProductValidationModel {
    let validationModel: ProductValidationModel = { result: ProductValidationResult.Invalid, invalidData: [] };
    if(!productName) {
      validationModel.invalidData.push({ 
        dataEntityType: ProductValidationEntity.ProductName, errorType: ValidationErrorType.Error 
      });
    }
    if(!productCategory) {
      validationModel.invalidData.push({ 
        dataEntityType: ProductValidationEntity.ProductCategory, errorType: ValidationErrorType.Error 
      });
    }
    if(!productPrice || productPrice <= 0) {
      validationModel.invalidData.push({ 
        dataEntityType: ProductValidationEntity.ProductPrice, errorType: ValidationErrorType.Error 
      });
    }
    if(!quantityType) {
      validationModel.invalidData.push({ 
        dataEntityType: ProductValidationEntity.QuantityType, errorType: ValidationErrorType.Error 
      });
    }
    if(specValues?.length > 0) {
      productCategory?.specFields?.forEach(x => {
        if(!specValues.any(y => y.specFieldID === x.specFieldID)){
          validationModel.invalidData.push({ 
            dataEntityType: ProductValidationEntity.ProductName, 
            specFieldID: x.specFieldID, 
            errorType: x.isMandatory ? ValidationErrorType.Error : ValidationErrorType.Warning });
        }
      });
    }
    if(!(validationModel.invalidData?.length > 0)){
      validationModel.result = ProductValidationResult.Valid;
    }
    return validationModel;
  }

  public saveProduct(productName: string, 
    productPrice: number, 
    productCategory: CategoryModel, 
    quantityType: number, 
    photos?: PhotoModel[],
    specValues?: ProductSpecValues[]): Observable<void> {
      let productModel: ProductModelRequest = {
        ProductName: productName,
        CategoryID: productCategory.categoryID,
        ProductPrice: productPrice,
        IsByWeight: quantityType == QuantityType.ByWeight,
        Photos: photos?.map(x => { return x.file}),
        ProductSpecs: specValues?.map(x => {
            return {
                SpecID: x.specFieldID,
                SpecValue: x.specValue
            }
        })
    };
    return this._saveProductUsecase.execute(productModel);
  }

  public deleteProducts(productIDs: number[]): Observable<void> {
    return this._deleteProductsUsecase.execute(productIDs);
  }

  public getAllProducts(): Observable<ProductGridModel[]> {
    return this._getAllProductsUsecase.execute();
  }
}
