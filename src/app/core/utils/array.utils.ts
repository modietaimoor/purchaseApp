Array.prototype.last = function <T>(): T | undefined{
  var _self = this as T[];
  return _self.length ? _self[_self.length - 1] : undefined;
};

Array.prototype.filterNumbers = function (): number[] {
  var _self = this as string[];
  return _self.filter(r => !Number.isNaN(Number.parseFloat(r))).map(r => +r.replace(',', ''));
};

Array.prototype.groupBy = function <T, K>(predicate: (ob: T) => K): Array<{ key: K; list: T[] }> {
  var _self = this as T[];
  return Array.from(
    _self.reduce(
      (entryMap, e) => entryMap.set(predicate(e), [...(entryMap.get(predicate(e)) || []), e]),
      new Map<K, T[]>()
    )
  ).map(r => ({ key: r[0], list: r[1] }));
};

Array.prototype.count = function <T>(predicate: (ob: T) => boolean): number {
  var _self = this as T[];
  return _self.filter(r => predicate(r)).length;
};

Array.prototype.clear = function <T>(): void {
  var _self = this as T[];
  _self.splice(0, _self.length);
};

Array.prototype.any = function <T>(predicate: (ob: T) => boolean): boolean {
  var _self = this as T[];
  return _self.filter(r => predicate(r)).length > 0;
};

Array.prototype.sortBy = function <T, K>(predicate: (ob: T) => K): T[] {
  var _self = this as T[];
  return _self.sort((f, s) => (predicate(f) === predicate(s) ? 0 : predicate(f) ? -1 : 1));
};

Array.prototype.distinct = function <T, K>(predicate: (ob: T) => K): T[] {
  var _self = this as T[];
  var result: Map<K, T> = new Map<K, T>();

  _self.forEach(value => {
    const key = predicate(value);
    if (result.has(key)) return;
    result.set(key, value);
  });

  return new Array(...result).map(pairs => pairs[1]);
};

Array.prototype.deepClone = function <T>(): T[] {
  var _self = this as T[];
  return JSON.parse(JSON.stringify(_self));
};
