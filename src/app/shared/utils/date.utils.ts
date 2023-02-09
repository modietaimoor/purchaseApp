export {}; // this file needs to be a module

import { DatePipe } from '@angular/common';

Date.prototype.toDayMonthYear = function (): string {
  var date = this as Date;
  const pipe = new DatePipe('en-US');
  return pipe.transform(date, 'dd-MM-yyyy');
};

Date.prototype.toMonthDayYear = function (): string {
  var date = this as Date;
  const pipe = new DatePipe('en-US');
  return pipe.transform(date, 'MM-dd-yyyy');
};

Date.prototype.toYearMonthDay = function (): string {
  var date = this as Date;
  const pipe = new DatePipe('en-US');
  return pipe.transform(date, 'yyyy-MM-dd');
};

Date.prototype.toMonthYear = function (): string {
  var date = this as Date;
  const pipe = new DatePipe('en-US');
  return pipe.transform(date, 'MMM-yy');
};

Date.prototype.toMonthFullYear = function (): string {
  var date = this as Date;
  const pipe = new DatePipe('en-US');
  return pipe.transform(date, 'MMM-yyyy');
};

Date.prototype.getMonthNumber = function (): string {
  var date = this as Date;
  return String(date.getMonth() + 1).padStart(2, '0');
};

Date.prototype.toMonthNameYear = function (): string {
  var date = this as Date;
  return `${monthsArray.get(date.getMonth() + 1)} ${date.getFullYear()}`;
};

Date.prototype.toHoursMins = function (): string {
  var date = this as Date;
  const pipe = new DatePipe(Intl.DateTimeFormat().resolvedOptions().locale);
  return pipe.transform(date, 'hh:mm a');
};

Date.prototype.getLastYear = function (): Date {
  var date = this as Date;
  return new Date(date.setFullYear(date.getFullYear() - 1));
};

Date.prototype.getLastMonth = function (): Date {
  var date = this as Date;
  return new Date(date.setMonth(+date.getMonth() - 1));
};

Date.prototype.getNextYear = function (): Date {
  var date = this as Date;
  return new Date(date.setFullYear(date.getFullYear() + 1));
};

Date.prototype.getNextMonth = function (): Date {
  var date = this as Date;
  return new Date(date.setMonth(+date.getMonth() + 1));
};

Date.prototype.toMonthNumberYear = function (): string {
  var date = this as Date;
  return `${date.getMonthNumber()}-${date.getFullYear()}`;
};

Date.prototype.getCurrentTimeZone = function (): Date {
  var date = this as Date;
  return new Date(
    date.toLocaleString('en-US', {
      timeZone: 'Europe/London'
    })
  );
};

const monthsArray: Map<number, string> = new Map<number, string>([
  [1, 'January'],
  [2, 'Febuary'],
  [3, 'March'],
  [4, 'April'],
  [5, 'May'],
  [6, 'June'],
  [7, 'July'],
  [8, 'August'],
  [9, 'September'],
  [10, 'October'],
  [11, 'November'],
  [12, 'December']
]);
