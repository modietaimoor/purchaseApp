import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

//import { LayoutService } from 'src/app/core/layout/layout.service';
import { DxChartComponent } from 'devextreme-angular';
import { List } from 'immutable';

import { ChartSeries } from '../chart-series';
import { SafeAny } from 'src/app/core/safe-any-type';

@Component({
  selector: 'app-graph-chart',
  templateUrl: './graph-chart.component.html',
  styles: [
    `
      ::ng-deep #chart {
        width: 100% !important;
        height: 100% !important;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphChartComponent implements OnInit, OnChanges {
  @ViewChild(DxChartComponent) chart: DxChartComponent;
  @Input() type: 'bar' | 'line' | 'stackedBar';
  @Input() xAxisType: 'datetime';
  @Input() xAxisFontSize?: number = 12;
  @Input() xAxisFontFamily?: string = 'Segoe UI Light';
  @Input() nameField: string;
  @Input() title: string;
  @Input() valueField: string;
  @Input() argumentField: string;
  @Input() dataSource: SafeAny[];
  @Input() rotateXAxisValue: boolean = false;
  @Input() seriesList: List<ChartSeries> = List();
  @Input() secondaryAxisName: string = '';
  @Input() yAxisTitle: string = '';
  @Input() visualRange: number[] = [];
  @Input() tickInterval: number;
  @Input() barOverlapGroup: string;
  @Input() barGroupPadding: number;
  @Input() position: 'outside' | 'inside' = 'outside';
  @Input() verticalAlignment: 'bottom' | 'top' = 'bottom';
  @Input() horizontalAlignment: 'center' | 'left' = 'center';
  @Input() showSeriesInLegend: boolean = true;
  @Input() showLegend: boolean = true;
  @Input() size: {
    height: number | string;
    width: number | string;
  };

  @Input() enableExport: boolean = false;
  @Input() legendFont: number = 12;
  @Input() titleFont: number = 14;
  @Input() onPointClick: (event: { target: SafeAny }) => void;
  @Input() customizeYAxisText: (value: number | string | Date, valueText: string) => string;
  @Input() customizeXAxisText: (value: number | string | Date, valueText: string) => string;
  @Input() customizeSecondaryYAxisText: (value: number | string | Date, valueText: string) => string;
  @Input() customizeTooltip: (data: SafeAny) => string;
  @Input() customizeLegendText: (data: SafeAny) => string;

  protected overlappingBehavior: 'rotate' | 'none' = 'none';
  protected rotationAngle: 0 | -60 = -60;
  protected xAxisDateTickInterval = 'month';
  protected dateFormat = 'MMM - yy';
  secondaryYAxisName = '';

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
    const isRotateXAxisValueChanged =
      simple.rotateXAxisValue && simple.rotateXAxisValue.currentValue !== simple.rotateXAxisValue.firstChange;
    if (isRotateXAxisValueChanged) this.updateRotateXAxis();
    this.updateSecondaryAxis();
  }

  updateRotateXAxis(): void {
    if (this.rotateXAxisValue) {
      this.rotationAngle = -60;
      this.overlappingBehavior = 'rotate';
    }
  }

  updateSecondaryAxis(): void {
    this.secondaryYAxisName = this.seriesList.find(r => r.isSecondaryAxis)?.axis;
  }
}
