import { Component, OnInit, ViewChild } from "@angular/core";
import { NotificationService } from "@shared/service/notification.service";
import { SafeAny } from "@core/safe-any-type";
import { Order, OrderItems, StatusModel } from "@domain/models/orders";
import { DataGridClientSideComponent } from "@shared/components/grid/data-grid-client-side/data-grid-client-side.component";
import { Column } from "@shared/components/grid/model";
import { OrdersService } from "./orders.service";
import { GetStatusLookupUsecase } from "@domain/repositories/usecases/orders/get-status-lookup.usecase";
import { GetOrdersListUsecase } from "@domain/repositories/usecases/orders/get-orders-list.usecase";
import { GetOrderContentUsecase } from "@domain/repositories/usecases/orders/get-order-content.usecase";
import { BulkChangeOrderStatusUsecase } from "@domain/repositories/usecases/orders/bulk-change-order-status.usecase";
import { ChangeOrderStatusUsecase } from "@domain/repositories/usecases/orders/change-order-status.usecase";

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
    private _getStatusLookupUsecase: GetStatusLookupUsecase,
    private _getOrderContentUsecase: GetOrderContentUsecase,
    private _bulkChangeOrderStatusUsecase: BulkChangeOrderStatusUsecase,
    private _changeOrderStatusUsecase: ChangeOrderStatusUsecase,
    private _getOrdersListUsecase: GetOrdersListUsecase,
    private _notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getOrders();
    this.getStatusList();
  }

  getOrders(): void{
    this._getOrdersListUsecase.execute().subscribe(res => (this.ordersList = res), err => this._notificationService.error(err));
  }

  getStatusList(): void {
    this._getStatusLookupUsecase.execute().subscribe(x => (this.statusLookup = x), err => this._notificationService.error(err));
  }

  getOrderContent(orderID: number): void{
    this._getOrderContentUsecase.execute(orderID).subscribe(x => (this.orderItems = x), err => this._notificationService.error(err));
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
    this._bulkChangeOrderStatusUsecase.execute({
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
    this._changeOrderStatusUsecase.execute(orderID, statusID).subscribe(_=> {
      this._notificationService.success('Order status updated successfully.');
      this.getOrders();
    });
  }  
}
