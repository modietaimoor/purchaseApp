import { Component, Input, OnInit } from "@angular/core";
import { Order, StatusModel } from "src/app/domain/models/orders";
import { OrdersService } from "src/app/orders/orders.service";
import { Column } from "./model/grid-model";

@Component({
  selector: "app-data-grid",
  templateUrl: "./data-grid.component.html",
  styleUrls: ["./data-grid.component.css"]
})
export class DataGridComponent implements OnInit {
  @Input() dataSource: Array<Order> = [];
  @Input() statusLookup: Array<StatusModel> = [];
  @Input() columns: Array<Column> = [];
  @Input() expandRowDetails: boolean = false;
  @Input() selectionMode: 'single' | 'multiple' | 'none' = 'multiple';
  selectAll: boolean = false;
  constructor(private _ordersService: OrdersService) {}

  ngOnInit(): void { }

  statusSelected(statusID: number): void {
    this.statusLookup.forEach(x => x.selected = (x.statusID == statusID));
  }

  toggleSelectAll(): void {
    this.dataSource.forEach(x => {
      x.selected = this.selectAll;
    });
  }

  updateOrderStatus(orderID: number): void {
    let statusID = this.statusLookup.filter(x => x.selected == true)[0].statusID;
    this._ordersService.changeOrderStatus(orderID, statusID).subscribe(_=> {
      alert('Order status updated successfully.');
      this.statusSelected(0);
    });
  }

  rowCheckChanged(): void{
    this.selectAll = this.dataSource.filter(x => x.selected == false).length == 0;
  }

  rowChecked(row: Order): void {
    this.dataSource.forEach(x => {
        x.selected = x.orderID == row.orderID;
    });
  }

  getSelectedRowsData(): Array<Order> {
    return this.dataSource.filter(x => x.selected == true);
  }

  getOrderContent(orderID: number, i: number): void{
    this.dataSource[i].rowExpanded = !this.dataSource[i].rowExpanded;
    if(this.dataSource[i].rowExpanded){
      this._ordersService.getOrderContent(orderID).subscribe(x => {
            this.dataSource[i].orderItems = x.map(m => { 
            return {
              orderID: m.OrderID,
              productID: m.ProductID,
              productCode: m.ProductCode,
              productName: m.ProductName,
              productDescription: m.ProductDescription,
              productPrice: m.ProductPrice,
              size: { sizeCode: m.Size.SizeCode, sizeDescription: m.Size.SizeDescription },
              quantity: m.Quantity
          }
        });
      });
    }
  }

}
