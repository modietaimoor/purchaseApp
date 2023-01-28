import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryFieldType, CategoryModel, ProductSpecValues } from '@domain/models/categories';

@Component({
  selector: 'app-product-specs',
  templateUrl: './product-specifications.component.html'
})
export class ProductSpecificationsComponent implements OnInit{
  @Input()  category: CategoryModel;
  @Output() readonly valueChanged: EventEmitter<Array<ProductSpecValues>> = new EventEmitter<Array<ProductSpecValues>>();
  private yearsArray: Array<number>; 
  private elementAttr = { class: 'font-bold' }; 
  private specFieldsValues: Array<ProductSpecValues>;
  public get CategoryFieldType() {
        return CategoryFieldType;
  }
  public get productSpecs() {
        return this.specFieldsValues;
  }

  constructor() {}

  ngOnInit(): void {
    this.yearsArray = Array.from({ length: 70 }, (value, index) => (new Date()).getFullYear() + index * -1);
    this.specFieldsValues = this.category.specFields.map(x => {
      return {
        specFieldID: x.specFieldID,
        specValue: null
      }
    });
  }
}
