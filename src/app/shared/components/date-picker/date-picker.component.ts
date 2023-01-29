/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SafeAny } from '@core/safe-any-type';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor, AfterContentChecked {
  @Input() readonly disabled: boolean;
  @Input() readonly max: Date | undefined;
  @Input() readonly min: Date | undefined;
  @Input() readonly showDays: boolean = false;
  @Input() readonly dateType: 'date' | 'datetime' = 'date';
  elementAttr: SafeAny = { class: 'text-blueGray-600 bg-white rounded input-text shadow focus:outline-none focus:ring date-box' };
  public value: Date | null = null;
  public onChangeFn = (_: any): void => {};
  public onTouchedFn = (): void => {};
  constructor(private cdr: ChangeDetectorRef) {}

  // this is only used to avoid ExpressionChangedAfterItHasBeenCheckedError in this test case
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  writeValue(modelValue: any): void {
    if (this.value != modelValue) {
      this.value = modelValue;
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  onValueChange(value: any): void {
    this.onChangeFn(value);
  }
}
