export {}; // this file needs to be a module
declare global {
  interface Array<T> {
    distinct<K>(predicate: (ob: T) => K): T[];
    clear(): void;
    last(): T;
    sortBy<K>(predicate: (ob: T) => K): T[];
    any(predicate: (ob: T) => boolean): boolean;
    count(predicate: (ob: T) => boolean): number;
    flatten(): T;
    filterNumbers(): number[];
    groupBy<K>(predicate: (ob: T) => K): Array<{ key: K; list: T[] }>;
    deepClone(): T[];
  }

  interface Date {
    toDayMonthYear(): string;
    toYearMonthDay(): string;
    toMonthYear(): string;
    toMonthNumberYear(): string;
    toMonthNameYear(): string;
    getMonthNumber(): string;
    getLastYear(): Date;
    getLastMonth(): Date;
    getNextYear(): Date;
    getNextMonth(): Date;
    toMonthFullYear(): string;
    toMonthDayYear(): string;
    toHoursMins(): string;
    getCurrentTimeZone(): Date;
  }
}
