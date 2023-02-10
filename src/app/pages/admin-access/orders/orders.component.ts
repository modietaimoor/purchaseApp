import { Component, OnInit, ViewChild } from "@angular/core";
import { NotificationService } from "@shared/service/notification.service";
import { Order, OrderItems, StatusModel } from "@domain/models/orders";
import { DataGridClientSideComponent } from "@shared/components/grid/data-grid-client-side/data-grid-client-side.component";
import { Column, DataSourceSteamResult, PageChange } from "@shared/components/grid/model";
import { OrdersService } from "./orders.service";
import { Observable, Subject } from "rxjs";
import { OrderResponse } from "@domain/resquest-response/response/orders-response";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  @ViewChild(DataGridClientSideComponent) grid: DataGridClientSideComponent<OrderResponse>; 
  ordersList: Subject<DataSourceSteamResult<OrderResponse>>; 
  ordersList$: Observable<DataSourceSteamResult<OrderResponse>>;
  statusLookup: Array<StatusModel> = [];
  orderItems: Array<OrderItems> = [];
  selectedStatus: number;
  pageChange: PageChange;
  orderColumns: Column[] = [
    { dataField: 'OrderID', name: 'Order Number', alignment: 'center' },
    { dataField: 'Username', name: 'Client Name', alignment: 'center' },
    { dataField: 'Email', name: 'Email Address', alignment: 'center' },
    { dataField: 'PhoneNumber', name: 'Phone Number', alignment: 'center' },
    { dataField: 'OrderDate', name: 'Order Date', alignment: 'center', 
      type: 'date', format: 'dd-MM-yyyy', allowHeaderFiltering: false, allowSearch: false },
    { dataField: 'StatusName', name: 'Order Status', alignment: 'center' },
    { dataField: 'OrderCost', name: 'Order Cost', alignment: 'right', type: 'currency' }
  ];

  constructor(private _ordersService: OrdersService,
    private _notificationService: NotificationService) {}

  ngOnInit(): void {
    this.ordersList = new Subject();
    this.ordersList$ = this.ordersList.asObservable();
    this.getOrders();
    this.getStatusList();
  }

  onPageChange(pageChange: PageChange): void {
    this.pageChange = pageChange;
    this.getOrders();
  }

  getOrders(): void{
    if(this.pageChange) {
    this._ordersService.getOrdersList(true, this.pageChange.skip, this.pageChange.take, this.pageChange.sort, this.pageChange.filter,
      this.pageChange.group).subscribe(res => this.ordersList.next({
        data: {
          data: res.data,
          summary: res.summary,
          totalCount: res.totalCount
        }
      }), err => this._notificationService.error(err));
      }
      else{
        this.ordersList.next({
          data: {
            data: [],
            summary: [],
            totalCount: 0
        }
      });
    }
  }

  getStatusList(): void {
    this._ordersService.getStatusLookup().subscribe(x => (this.statusLookup = x), err => this._notificationService.error(err));
  }

  getOrderContent(orderID: number): void{
    this._ordersService.getOrderContent(orderID).subscribe(x => (this.orderItems = x), err => this._notificationService.error(err));
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
