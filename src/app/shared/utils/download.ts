import { saveAs } from 'file-saver';

export function downloadPDF(blob: Blob, fileName: string): void {
  var mimeType = 'application/pdf';
  var file = new Blob([blob], { type: mimeType });
  saveAs(file, fileName);
}

export function downloadExcel(blob: Blob, fileName: string): void {
  var mimeType = 'application/ms-excel';
  var file = new Blob([blob], { type: mimeType });
  saveAs(file, fileName);
}

export function downloadCSV(blob: Blob, fileName: string): void {
  var mimeType = 'text/csv;charset=utf-8;base64';
  var file = new Blob([blob], { type: mimeType });
  saveAs(file, fileName);
}

export function downloadZip(blob: Blob, fileName: string): void {
  var mimeType = 'application/zip';
  var file = new Blob([blob], { type: mimeType });
  saveAs(file, fileName);
}

export function downloadUnknown(blob: Blob, fileName: string): void {
  var mimeType = blob.type;
  var file = new Blob([blob], { type: mimeType });
  saveAs(file, fileName);
}
