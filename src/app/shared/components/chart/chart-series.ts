export interface ChartSeries {
  valueField?: string;
  argumentField: string;
  type?: string;
  name?: string;
  id?: string;
  axis?: string;
  stack?: string;
  isSecondaryAxis?: boolean;
  rangeValue1Field?: string;
  rangeValue2Field?: string;
  showSeriesInLegend?: boolean;
  color?: string;
  border?: {
    color?: string;
    dashStyle?: string;
    visible?: boolean;
    width?: number;
  };
  chartColumnType?: string;
}
