import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SafeAny } from '@core/safe-any-type';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor, AfterContentChecked {
  @Input() text: string;
  @Input() iconSize: number;
  @Input() enableThreeStateBehavior: boolean = false;
  elementAttr: SafeAny = { class: 'font-bold' };
  public value: boolean | null = null;
  public onChangeFn = (_: any): void => {};
  public onTouchedFn = (): void => {};
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  writeValue(modelValue: boolean): void {
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

  onValueChange(e: any): void {
    this.onChangeFn(e);
  }
}
