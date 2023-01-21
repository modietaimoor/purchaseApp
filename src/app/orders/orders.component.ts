import { Component, OnInit, ViewChild } from "@angular/core";
import { NotificationService } from "@shared/service/notification.service";
import { SafeAny } from "@core/safe-any-type";
import { Order, OrderItems, StatusModel } from "@domain/models/orders";
import { DataGridClientSideComponent } from "@shared/components/grid/data-grid-client-side/data-grid-client-side.component";
import { Column } from "@shared/components/grid/model";
import { OrdersService } from "./orders.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  @ViewChild(DataGridClientSideComponent) grid: DataGridClientSideComponent<Order>;  
  ordersList: Array<Order> = [];
  statusLookup: Array<StatusModel> = [];
  orderItems: Array<OrderItems> = [];
  selectedStatus: number;
  customizeText = (cellInfo: SafeAny):string =>  {
    let s = cellInfo.value.toString();
    while (s.length < 5) s = "0" + s;
    return s;
  }
  orderColumns: Column[] = [
    { dataField: 'orderID', name: 'Order Number', alignment: 'center',  customizeText: this.customizeText},
    { dataField: 'username', name: 'Client Name', alignment: 'center' },
    { dataField: 'email', name: 'Email Address', alignment: 'center' },
    { dataField: 'phoneNumber', name: 'Phone Number', alignment: 'center' },
    { dataField: 'orderDate', name: 'Order Date', alignment: 'center', type: 'date', format: 'dd-MM-yyyy' },
    { dataField: 'orderTime', name: 'Ordered At', alignment: 'center', type: 'date', format: 'hh:mm a' },
    { dataField: 'statusName', name: 'Order Status', alignment: 'center' },
    { dataField: 'orderCost', name: 'Order Cost', alignment: 'right', type: 'currency' }
  ];

  constructor(private _ordersService: OrdersService,
    private _notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getOrders();
    this.getStatusList();
  }

  getOrders(): void{
    this._ordersService.getOrdersList().subscribe(x => {
      this.ordersList = x.map(y => { return {
        orderID: y.OrderID,
        orderDate: y.OrderDate,
        orderTime: y.OrderDate,
        userID: y.UserID,
        username: y.Username,
        phoneNumber: y.PhoneNumber,
        email: y.Email,
        isMale: y.IsMale,
        statusID: y.Status.StatusID, 
        statusName: y.Status.StatusName,
        orderCost: y.OrderCost,
        orderItems: []
      }});
    });
  }

  getStatusList(): void {
    this._ordersService.getStatusLookup().subscribe(x => {
      this.statusLookup = x.map(y => {
        return {
          statusID: y.StatusID,
          statusName: y.StatusName
        }
      });
    });
  }

  getOrderContent(orderID: number): void{
    this._ordersService.getOrderContent(orderID).subscribe(x => {
      this.orderItems = x.map(m => { 
          return {
            orderID: m.OrderID,
            productID: m.ProductID,
            productCode: m.ProductCode,
            productName: m.ProductName,
            productDescription: m.ProductDescription,
            productPrice: m.ProductPrice,
            totalPrice: m.ProductPrice * m.Quantity,
            size: m.Size.SizeDescription,
            quantity: m.Quantity
        }
      });
    });
  }

  bulkUpdateStatus(): void {
    if (!this.selectedStatus) {
      this._notificationService.error('Please select new status for update.');
      return;
    }
    let selectedRows = this.grid.dxDataGrid.instance.getSelectedRowsData();
    if (selectedRows == null || selectedRows.length <= 0) {
      this._notificationService.error('Please select at least one order');
      return;
    }
    this._ordersService.bulkChangeOrderStatus({
      Orders: selectedRows.map(x => {
        return x.orderID
      }),
      StatusID: this.selectedStatus
    }).subscribe(_ => {
      this._notificationService.success('Order(s) status updated successfully.');
      this.getOrders();
    });
  }

  updateOrderStatus(orderID: number): void {
    let statusID = 0;
    this._ordersService.changeOrderStatus(orderID, statusID).subscribe(_=> {
      this._notificationService.success('Order status updated successfully.');
      this.getOrders();
    });
  }  
}
