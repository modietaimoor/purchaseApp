import { Component, Input, OnInit } from "@angular/core";
import { Column } from "../model/grid-model";

@Component({
  selector: "app-data-column",
  templateUrl: "./data-column.component.html",
  styleUrls: ["./data-column.component.css"]
})
export class DataColumnComponent implements OnInit {
    @Input() column: Column | undefined;
    constructor() {}

    ngOnInit(): void { }

}
