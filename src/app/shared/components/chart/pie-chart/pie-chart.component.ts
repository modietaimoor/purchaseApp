import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DxPieChartComponent } from 'devextreme-angular';
import { SafeAny } from '@core/safe-any-type';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styles: [
    `
      ::ng-deep #chart {
        width: 100% !important;
        height: 100% !important;
      }
      ::ng-deep .dxc-tooltip {
        z-index: 100000 !important;
      }
    `
  ]
})
export class PieChartComponent implements OnInit, OnChanges {
  @ViewChild(DxPieChartComponent) chart: DxPieChartComponent;
  @Input() dataSource: SafeAny[];
  @Input() title: string = '';
  @Input() titlePosition: string = 'top';
  @Input() titleSize: number = 28;
  @Input() showLegend: boolean = true;
  @Input() showLabel: boolean = true;
  @Input() legendAlignment: string = 'bottom';
  @Input() legendOrientation: string = 'horizontal';
  @Input() seriesList: Array<{
    valueField: string;
    argumentField?: string;
    name?: string;
    id?: string;
    axis?: string;
  }> = [];

  @Input() resolveLabelOverlapping: "shift" | "hide" | "none" = "shift";

  @Input() size: {
    height: number;
    width: number;
  };

  @Input() customizeText: (data: SafeAny) => string;
  @Input() customizeTooltip: (data: SafeAny) => SafeAny;
  @Input() onPointClick: (event: { target: SafeAny }) => void;

  constructor() {}

  ngOnInit(): void {
    /*this.layoutService.menuStatChanged.subscribe(x => {
      this.chart.instance.refresh();
      this.chart.instance.render();
    });*/
  }

  ngOnChanges(simple: SimpleChanges): void {
    if (simple.dataSource.currentValue) {
      if (this.chart) {
        this.chart.instance.refresh();
        this.chart.instance.render();
      }
    }
  }
}
