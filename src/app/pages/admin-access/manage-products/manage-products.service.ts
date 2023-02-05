import { Injectable } from '@angular/core';
import { Category } from '@domain/models/categories';
import { PhotoModel, ProductGridModel, ProductSpecValues, ProductValidationEntity, ProductValidationModel, ProductValidationResult, QuantityType, ValidationErrorType } from '@domain/models/products';
import { DeleteProductsUsecase } from '@domain/repositories/usecases/products/delete-products.usecase';
import { GetAllProductsUsecase } from '@domain/repositories/usecases/products/get-all-products.usecase';
import { GetCategoryProductsUsecase } from '@domain/repositories/usecases/products/get-category-products.usecase';
import { SaveProductUsecase } from '@domain/repositories/usecases/products/save-product.usecase';
import { ProductModelRequest } from '@domain/resquest-response/request/products-request';
import { Observable } from 'rxjs';

@Injectable()
export class ManageProductService {
  constructor(private _saveProductUsecase: SaveProductUsecase, 
    private _deleteProductsUsecase: DeleteProductsUsecase,
    private _getCategoryProductsUsecae: GetCategoryProductsUsecase,
    private _getAllProductsUsecase: GetAllProductsUsecase) { }

  public validateProductData(productName: string, 
    productPrice: number, 
    productCategory: Category, 
    quantityType: number): ProductValidationModel {
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
    if(quantityType !== QuantityType.ByQuantity && quantityType !== QuantityType.ByWeight) {
      validationModel.invalidData.push({ 
        dataEntityType: ProductValidationEntity.QuantityType, errorType: ValidationErrorType.Error 
      });
    }
    if(!validationModel.invalidData?.any(x => x.errorType === ValidationErrorType.Error)){
      validationModel.result = ProductValidationResult.Valid;
    }
    return validationModel;
  }

  public saveProduct(productName: string, 
    productPrice: number, 
    productCategory: Category, 
    quantityType: number, 
    photos?: PhotoModel[],
    specValues?: ProductSpecValues[]): Observable<void> {
      let productModel: ProductModelRequest = {
        ProductName: productName,
        CategoryID: productCategory.categoryID,
        ProductPrice: productPrice,
        IsByWeight: quantityType == QuantityType.ByWeight,
        ProductSpecs: specValues?.map(x => {
              return {
                  SpecID: x.specFieldID,
                  SpecValue: x.specValue
              }
          })
      };
      const result = new FormData();
      result.append('productModel', JSON.stringify(productModel));
      photos?.forEach((file, index) => {
        result.append(`img${index}`, file.file);
      });      
      return this._saveProductUsecase.execute(result);
  }

  public deleteProducts(productIDs: number[]): Observable<void> {
    return this._deleteProductsUsecase.execute(productIDs);
  }

  public getAllProducts(): Observable<ProductGridModel[]> {
    return this._getAllProductsUsecase.execute();
  }

  public getCategoryProducts(categoryID: number): Observable<ProductGridModel[]> {
    return this._getCategoryProductsUsecae.execute(categoryID);
  }

  public generateErrorMessageFromValidationBody(objBody: ProductValidationModel): string {
    if(objBody.result === ProductValidationResult.Valid) {
      return null;
    }
    let strErrorMsg = 'Please make sure to fill the following fields: ';
    for(let i = 0; i < objBody.invalidData?.length; i++){
      strErrorMsg += objBody.invalidData[i].dataEntityType + ','; 
    }
    return strErrorMsg;
  }
}
