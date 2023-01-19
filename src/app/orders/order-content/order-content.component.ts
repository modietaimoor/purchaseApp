import { Component, Input } from "@angular/core";
import { OrderItems } from "src/app/domain/models/orders";

@Component({
  selector: "app-order-content",
  templateUrl: "./order-content.component.html",
  styleUrls: ["./order-content.component.css"]
})
export class OrderContentComponent {
  @Input() orderItems: Array<OrderItems> = [];
  constructor() {}

  ngOnInit(): void {}
}
