import { Component } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { DxCalendarModule, DxDateBoxComponent, DxDateBoxModule } from 'devextreme-angular';

import { DatePickerComponent } from './date-picker.component';

@Component({
  template: `
    <div>
      <app-date-picker
        [ngModel]="value"
        [max]="max"
        [min]="min"
        (ngModelChange)="valueChange($event)"
      ></app-date-picker>
    </div>
  `
})
export class TestDatePickerTemplateDefaultComponent {
  value: Date;
  max: Date;
  min: Date;
  valueChange = jasmine.createSpy('valueChange');
}
let spectator: Spectator<TestDatePickerTemplateDefaultComponent>;
let calender: DxDateBoxComponent;

describe('DatePickerComponent', () => {
  const now = new Date();
  const max = new Date(now.setMonth(5));
  const min = new Date(now.setMonth(-2));

  const createComponent = createComponentFactory({
    component: TestDatePickerTemplateDefaultComponent,
    declarations: [DatePickerComponent],
    imports: [DxDateBoxModule, DxCalendarModule, FormsModule]
  });

  beforeEach(() => {
    spectator = createComponent();
    calender = spectator.query(DxDateBoxComponent);
  });

  it('it should fire ngModelChange', fakeAsync(() => {
    // Arrange
    const selectedDate = new Date(now.setMonth(1));
    spectator.component.min = min;
    spectator.component.max = max;

    // Act
    calender.value = selectedDate;
    spectator.detectChanges();
    spectator.tick();
    spectator.detectChanges();

    // Assert
    expect(spectator.component.valueChange).toHaveBeenCalledWith(selectedDate);
  }));

  it('it should change via ngModel from model & inputs', fakeAsync(() => {
    // Arrange
    spectator.component.min = min;
    spectator.component.max = max;
    spectator.component.value = now;

    spectator.detectChanges();
    spectator.tick();
    spectator.detectChanges();

    // Assert
    expect(calender.value).toEqual(now);
    expect(calender.min).toEqual(min);
    expect(calender.max).toEqual(max);
  }));
});
