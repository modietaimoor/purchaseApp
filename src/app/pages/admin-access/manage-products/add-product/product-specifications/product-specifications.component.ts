import { Component, Input } from '@angular/core';
import { Countries } from '@core/constants';
import { CategoryFieldType } from '@domain/models/categories';
import { ProductSpecValues } from '@domain/models/products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-specs',
  templateUrl: './product-specifications.component.html'
})
export class ProductSpecificationsComponent {
  @Input() specFieldsValues: Array<ProductSpecValues>;
  requestSpecFieldsSubscription: Subscription;
  yearsArray: Array<number> = Array.from({ length: 70 }, (value, index) => (new Date()).getFullYear() + index * -1);
  Countries = Countries;
  public get CategoryFieldType() {
        return CategoryFieldType;
  }
  constructor() {}
}
