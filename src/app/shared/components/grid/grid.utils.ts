import { exportDataGrid } from 'devextreme/excel_exporter';
import { Column } from 'devextreme/ui/data_grid';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import { ColumnType, SummeryType } from './model';

export function GenerateSummeryMessage(data: { message: string; summeryType?: SummeryType }): string {
  switch (data.summeryType) {
    case SummeryType.Currency:
      return `${data.message}: ${SummeryType.Currency} {0}`;
    case SummeryType.Minute:
      return `${data.message}: {0} ${SummeryType.Minute}`;
    case SummeryType.MegaByte:
      return `${data.message}: {0} ${SummeryType.MegaByte}`;
    default:
      return `${data.message}: {0}`;
  }
}

export function GenerateSummeryWithoutMessage(summeryType?: SummeryType): string {
  switch (summeryType) {
    case SummeryType.Currency:
      return `${SummeryType.Currency} {0}`;
    case SummeryType.Minute:
      return `{0} ${SummeryType.Minute}`;
    case SummeryType.MegaByte:
      return `{0} ${SummeryType.MegaByte}`;
    default:
      return `{0}`;
  }
}

export function customExport<T>(gridComponent, fileName: string, exportType: 'CSV' | 'Excel'): void {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');

  exportDataGrid({
    component: gridComponent,
    worksheet,
    autoFilterEnabled: true
  }).then(() => {
    // Save file
    saveExcelFile(workbook, fileName);
  });
  gridComponent.cancel = true;
}

export function exportExcel<T>(
  items: T[],
  fileName: string,
  exportType: 'CSV' | 'Excel',
  headers: string[],
  columnDefinition: Array<{ dataField: string; type: ColumnType }>,
  isCustomColumns?: boolean,
  gridColumns?: Column[]
): void {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');

  const tempColumnDefinition = isCustomColumns
    ? gridColumns.filter(d => d.dataField).map(r => ({ dataField: r.dataField, type: r.dataType }))
    : columnDefinition;

  // Add headers
  let headerRow = worksheet.addRow(headers);
  headerRow.eachCell(cell => {
    cell.font = { name: 'Calibri', family: 4, size: 11, bold: true };
    cell.alignment = {
      horizontal: 'center',
      vertical: 'top'
    };
  });

  // Add data rows
  items.forEach(item =>
    worksheet.addRow(
      createRowValues(
        item,
        tempColumnDefinition.map(d => d.dataField)
      )
    )
  );

  // Auto column width
  worksheet.columns.forEach((column, index) => {
    var maxLength = 0;
    column['eachCell']({ includeEmpty: true }, function (cell) {
      var columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    if (tempColumnDefinition[index]?.type === 'currency') column.numFmt = '£#,##0.00';
    if (tempColumnDefinition[index]?.type === 'one-decimal-number') column.numFmt = '#,##0.0';
    column.width = (maxLength < 10 ? 10 : maxLength) + 10; // + 10 used to make the column width more wider
  });

  // Save file
  switch (exportType) {
    case 'CSV':
      saveCsvFile(workbook, fileName);
      break;
    case 'Excel':
      saveExcelFile(workbook, fileName);
      break;
  }
}

function createRowValues<T>(item: T, dataFields: string[]): Array<string | number> {
  let values: Array<string | number> = [];
  const keyValue = Object.entries(item);

  // pick all the properties that already displayed in the ui grid
  keyValue.filter(([key]) => dataFields.includes(key)).forEach(([, value]: string[]) => values.push(value));

  return values;
}

function saveCsvFile(workbook: ExcelJS.Workbook, fileName: string): void {
  workbook.csv.writeBuffer().then(buffer => {
    saveAs(new Blob([buffer], { type: 'text/csv;charset=utf-8;base64' }), `${fileName}.csv`);
  });
}

function saveExcelFile(workbook: ExcelJS.Workbook, fileName: string): void {
  workbook.xlsx.writeBuffer().then(buffer => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
  });
}
