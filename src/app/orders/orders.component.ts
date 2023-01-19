import { Component, OnInit, ViewChild } from "@angular/core";
import { Order, StatusModel } from "../domain/models/orders";
import { DataGridComponent } from "../shared/data-grid/data-grid.component";
import { Column } from "../shared/data-grid/model/grid-model";
import { OrdersService } from "./orders.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  @ViewChild(DataGridComponent) grid: DataGridComponent | undefined;  
  ordersList: Array<Order> = [];
  statusLookup: Array<StatusModel> = [];
  selectedStatus: StatusModel | undefined;
  selectAll = false;
  dropDownOpened = false;
  columns: Column[] = [
    { dataField: 'orderID', name: 'Order Number', alignment: 'center', width: 9  },
    { dataField: 'username', name: 'Client Name', alignment: 'center', width: 15 },
    { dataField: 'email', name: 'Email Address', alignment: 'center', width: 20 },
    { dataField: 'phoneNumber', name: 'Phone Number', alignment: 'center', width: 9 },
    { dataField: 'orderDate', name: 'Order Date', alignment: 'center', width: 9 },
    { dataField: 'orderDate', name: 'Ordered At', alignment: 'center', width: 7 },
    { dataField: 'statusName', name: 'Order Status', alignment: 'center', width: 9 },
    { dataField: 'orderCost', name: 'Order Cost', alignment: 'center', width: 9 }
  ];
  constructor(private _ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
    this.getStatusList();
  }

  getOrders(): void{
    this._ordersService.getOrdersList().subscribe(x => {
      this.ordersList = x.map(y => { return {
        orderID: y.OrderID,
        orderDate: y.OrderDate,
        userID: y.UserID,
        username: y.Username,
        phoneNumber: y.PhoneNumber,
        email: y.Email,
        isMale: y.IsMale,
        status: { statusID: y.Status.StatusID, statusName: y.Status.StatusName },
        orderCost: y.OrderCost,
        orderItems: [],
        editMode: false,
        rowExpanded: false,
        selected: false,
        dropDownOpened: false
      }});
    });
  }

  getStatusList(): void {
    this._ordersService.getStatusLookup().subscribe(x => {
      this.statusLookup = x.map(y => {
        return {
          statusID: y.StatusID,
          statusName: y.StatusName,
          selected: false
        }
      });
    });
  }

  statusSelected(statusID: number): void {
    this.statusLookup.forEach(x => x.selected = (x.statusID == statusID));
  }

  toggleDropDown(): void {
    this.dropDownOpened = !this.dropDownOpened;
  }

  getOrderContent(orderID: number, i: number): void{
    this.ordersList[i].rowExpanded = !this.ordersList[i].rowExpanded;
    if(this.ordersList[i].rowExpanded){
      this._ordersService.getOrderContent(orderID).subscribe(x => {
            this.ordersList[i].orderItems = x.map(m => { 
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

  setSelection(status: StatusModel): void{
    this.selectedStatus = status;
  }

  bulkUpdateStatus(): void {
    if(!this.selectedStatus){
      alert('Please select new status for update.');
      return;
    }
    let selectedRows = this.grid?.getSelectedRowsData();
    if(selectedRows == null || selectedRows.length <= 0){
      alert('Please select at least one order');
      return;
    }
    this._ordersService.bulkChangeOrderStatus({
      Orders: selectedRows.map(x => {
        return x.orderID
      }),
      StatusID: this.selectedStatus.statusID
    }).subscribe(_=> {
      alert('Order(s) status updated successfully.');
      this.getOrders();
      this.statusSelected(0);
    });
  }

  updateOrderStatus(orderID: number): void {
    let statusID = this.statusLookup.filter(x => x.selected == true)[0].statusID;
    this._ordersService.changeOrderStatus(orderID, statusID).subscribe(_=> {
      alert('Order status updated successfully.');
      this.getOrders();
      this.statusSelected(0);
    });
  }
}
