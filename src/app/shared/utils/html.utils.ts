export {}; // this file needs to be a module
HTMLCollection.prototype.toArray = function (): Element[] {
  return Array.from(this);
};
