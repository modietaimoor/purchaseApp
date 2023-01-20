export interface SafeAny {
  [key: string]: string | number | boolean;
}

export interface SafeObjectAny {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafePropertyAny = any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafeHardAny = any;
