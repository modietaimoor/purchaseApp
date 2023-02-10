import { Component, Input } from "@angular/core";
import { Column } from "@shared/components/grid/model";
import { OrderItems } from "@domain/models/orders";

@Component({
  selector: "app-order-content",
  templateUrl: "./order-content.component.html",
  styleUrls: ["./order-content.component.css"]
})
export class OrderContentComponent {
  @Input() orderItems: Array<OrderItems> = [];
  itemColumns: Column[] = [
    { dataField: 'quantity', name: 'Quantity', alignment: 'center' },
    { dataField: 'productName', name: 'Product Name', alignment: 'center' },
    { dataField: 'categoryName', name: 'Category', alignment: 'center' },
    { dataField: 'productPrice', name: 'Unit Price', alignment: 'right', type: 'currency' },
    { dataField: 'totalPrice', name: 'Total Price', alignment: 'right', type: 'currency' }
  ];
  constructor() {}

  ngOnInit(): void {}
}
