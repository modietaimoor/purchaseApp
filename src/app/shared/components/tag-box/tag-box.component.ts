import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'app-tag-box',
  templateUrl: './tag-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagBoxComponent<T> {
  @Input() readonly dataSource: Array<T>;
  @Input() disabled: boolean = false;
  @Input() valueExpr: string;
  @Input() displayExpr: string;

  constructor() {}
}
