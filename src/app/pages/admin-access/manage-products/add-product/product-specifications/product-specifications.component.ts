import { Component, Input } from '@angular/core';
import { CategoryFieldType, ProductSpecValues } from '@domain/models/categories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-specs',
  templateUrl: './product-specifications.component.html'
})
export class ProductSpecificationsComponent {
  @Input() specFieldsValues: Array<ProductSpecValues>;
  requestSpecFieldsSubscription: Subscription;
  yearsArray: Array<number> = Array.from({ length: 70 }, (value, index) => (new Date()).getFullYear() + index * -1);
  
  public get CategoryFieldType() {
        return CategoryFieldType;
  }

  constructor() {}
}
