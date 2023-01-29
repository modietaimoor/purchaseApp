/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  QueryList,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { startWith } from 'rxjs/operators';

import { DxSelectBoxComponent } from 'devextreme-angular';

import { SelectOptionComponent } from './select-option.component';
import { SafeAny } from '@core/safe-any-type';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements AfterContentInit, ControlValueAccessor, AfterContentChecked {
  @ViewChild(DxSelectBoxComponent) selectBox: DxSelectBoxComponent;
  @ContentChildren(SelectOptionComponent)
  public options!: QueryList<SelectOptionComponent>;

  @Input() disabled: boolean;
  @Input() searchEnabled: boolean;
  @Input() showClearButton: boolean;
  public optionList: SelectOptionComponent[] = [];
  public value: number | null = null;
  elementAttr: SafeAny = { class: 'text-blueGray-600 bg-white rounded input-text shadow focus:outline-none focus:ring select-box' };

  public onChangeFn = (_: any): void => {};
  public onTouchedFn = (): void => {};
  constructor(private cdr: ChangeDetectorRef) {}

  // this is only used to avoid ExpressionChangedAfterItHasBeenCheckedError in this test case
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  writeValue(modelValue: any): void {
    if (this.value !== modelValue) {
      this.value = modelValue;
    }

    if (this.selectBox && this.selectBox.value !== null && modelValue === null) {
      this.selectBox.writeValue(null);
    }

    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  ngAfterContentInit(): void {
    // when the component get initialized options.changes Observable was not loaded and at the same time
    // there are list of select options already exists in this.options so we use startWith
    // to run the subscribe manually for one time to get the options array
    this.options.changes.pipe(startWith(true)).subscribe(() => {
      this.optionList = this.options.toArray();
      this.cdr.markForCheck();
    });
  }

  onValueChange(selection: { value: number }): void {
    this.onChangeFn(selection.value);
  }
}
