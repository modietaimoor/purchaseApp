import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { ButtonsList } from 'src/app/shared/components/grid/model';
import { SafeAny } from 'src/app/core/safe-any-type';

export type ButtonType =
  | 'pdf'
  | 'excel'
  | 'download'
  | 'edit'
  | 'save'
  | 'close'
  | 'link'
  | 'info'
  | 'setting'
  | 'delete'
  | 'lock'
  | 'undo'
  | 'img'
  | 'add'
  | 'loading'
  | 'user'
  | 'sim-card'
  | 'list'
  | 'exchange'
  | 'phone-slash'
  | 'trash'
  | 'address'
  | 'three-dots'
  | 'mobile'
  | 'noIcon'
  | 'user-times'
  | 'buttons-list';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styles: [
    `
      :host {
        margin: 2px;
      }
      .pdf-icon {
        color: red;
      }
      .btn-default {
        border: none !important;
        border-color: inherit !important;
      }
      .btn-img {
        position: relative;
        top: 3px;
      }
      .csv-green {
        background-color: #009900 !important;
        margin-bottom: 3px !important;
        width: 100px !important;
        border-radius: 5px !important;
        color: #fff !important;
      }
      .excel-blue {
        background-color: #00537e !important;
        margin-bottom: 3px !important;
        width: 100px !important;
        border-radius: 5px !important;
        color: #fff !important;
      }
      .clickable-column {
        color: #4db848;
        cursor: pointer;
      }
      .pointer-event-none {
        pointer-events: none;
      }
      :host::ng-deep.green-button {
        background-color: #2bb231 !important;
        color: #fff !important;
      }

      .top-0 {
        top: 0px !important;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnChanges {
  // TODO:: use ng-content instead of passing text as input
  @Input() innerText = '';
  @Input() type: ButtonType;
  @Input() disabled: boolean = false;
  @Input() show: (row?: SafeAny) => boolean = (row?: SafeAny) => true;
  @Input() cssClasses: string;
  @Input() title: string = 'Download';
  @Input() imgSrc: string;
  @Input() height: number;
  @Input() width: number;
  @Input() id: string | number;
  @Input() row: SafeAny;
  @Input() buttonsList: ButtonsList[] = [];
  @Output() readonly clickEvent: EventEmitter<Event> = new EventEmitter<Event>();

  constructor() {}

  get isHiddenButton(): boolean {
    return this.cssClasses?.includes('hidden-button');
  }

  onClick(event?: Event): void {
    this.clickEvent.emit(event);
  }

  ngOnChanges(): void {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    if (!this.show) this.show = (row?: SafeAny) => true;
  }
}
