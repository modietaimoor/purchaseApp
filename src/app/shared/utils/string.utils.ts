import { isValid } from 'date-fns';

String.prototype.isDate = function (): boolean {
  const _dirtyDate = this as string;
  const valid = isValid(_dirtyDate);
  return valid;
};

String.prototype.isNumber = function (): boolean {
  var _self = this as string;
  return /^-?\d+$/.test(_self);
};
