import { DxDataGridComponent } from 'devextreme-angular';
import { formatDate as dxFormatDate } from 'devextreme/localization';
import { format } from 'devextreme/ui/widget/ui.widget';
import { SafeAny } from 'src/app/core/safe-any-type';

export class DxFormatter {
  public static getFormattedDataSet<T>(dataSource: T[], dxDataGrid: DxDataGridComponent): SafeAny[] | T[] {
    let columnDefinitions = dxDataGrid.instance.getVisibleColumns().filter(e => e.type === undefined && e.dataField);
    return dataSource.map(source => {
      return this.generateFormattedRow(columnDefinitions, source);
    });
  }

  private static generateFormattedRow<T>(columnDefinitions, source: T): SafeAny {
    let formattedRowData: SafeAny = {};
    for (const columnDefinition of columnDefinitions) {
      formattedRowData[columnDefinition.dataField] = this.format(source, {
        dataField: columnDefinition.dataField,
        dataType: columnDefinition.dataType,
        format: columnDefinition.format
      });
    }
    return formattedRowData;
  }

  private static format<T>(
    source: T,
    columnDefinition: {
      dataType: 'string' | 'number' | 'boolean' | 'object' | 'date' | 'datetime';
      dataField: string | number;
      format: format;
    }
  ): number | string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = source[columnDefinition.dataField] as any;
    if (columnDefinition.dataType === 'date') return this.formatDate(value, columnDefinition.format);
    else return value;
  }

  private static formatDate(value: string | number, format: format): string {
    return dxFormatDate(new Date(value), format);
  }
}
