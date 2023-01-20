import { Guid } from './guid';

export function createClass(rules): string {
  const className = `css-class-${Guid.newGuid()}`;
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `.${className} ${rules}`;
  document.getElementsByTagName('head')[0].appendChild(style);
  return className;
}
