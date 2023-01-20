import { Component } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { DxSelectBoxComponent, DxSelectBoxModule } from 'devextreme-angular';

import { SelectOptionComponent } from './select-option.component';
import { SelectComponent } from './select.component';

@Component({
  template: `
    <app-select [(ngModel)]="selected" (ngModelChange)="valueChange($event)">
      <app-select-option *ngFor="let item of items" [value]="item.name" [key]="item.id"> </app-select-option>
    </app-select>
  `
})
export class TestSelectTemplateDefaultComponent {
  selected: number | null = null;
  items: Array<{ name: string; id: number }> = [];
  valueChange = jasmine.createSpy('valueChange');
}
let spectator: Spectator<TestSelectTemplateDefaultComponent>;
let selectBoxComponent: DxSelectBoxComponent;

describe('SelectComponent', () => {
  const createComponent = createComponentFactory({
    component: TestSelectTemplateDefaultComponent,
    declarations: [SelectComponent, SelectOptionComponent],
    imports: [DxSelectBoxModule, FormsModule],
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    selectBoxComponent = spectator.query(DxSelectBoxComponent);
    spectator.detectChanges();
  });

  it('it should list all options', () => {
    // Arrange
    spectator.component.items = [
      { name: 'Vodafone', id: 1 },
      { name: 'Orange', id: 2 }
    ];

    // Act
    spectator.detectChanges();

    // Assert
    expect((selectBoxComponent.dataSource as SelectOptionComponent[]).length).toEqual(2);
    expect((selectBoxComponent.dataSource as SelectOptionComponent[])[0].value).toEqual('Vodafone');
    expect((selectBoxComponent.dataSource as SelectOptionComponent[])[1].value).toEqual('Orange');
  });

  it('it should fire ngModelChange', () => {
    // Arranges
    spectator.component.items = [
      { name: 'Vodafone', id: 1 },
      { name: 'Orange', id: 2 }
    ];

    // Act
    selectBoxComponent.value = 50;
    spectator.detectChanges();

    // Assert
    expect(spectator.component.valueChange).toHaveBeenCalledWith(50);
  });

  it('it should list all updated options', () => {
    // Arrange
    spectator.component.items = [
      { name: 'Vodafone', id: 1 },
      { name: 'Orange', id: 2 }
    ];
    spectator.detectChanges();

    expect((selectBoxComponent.dataSource as SelectOptionComponent[]).length).toEqual(2);
    expect((selectBoxComponent.dataSource as SelectOptionComponent[])[0].value).toEqual('Vodafone');
    expect((selectBoxComponent.dataSource as SelectOptionComponent[])[1].value).toEqual('Orange');

    // Act
    spectator.component.items = [{ name: 'Vodafone2', id: 1 }];
    spectator.detectChanges();

    // Assert
    expect((selectBoxComponent.dataSource as SelectOptionComponent[]).length).toEqual(1);
    expect((selectBoxComponent.dataSource as SelectOptionComponent[])[0].value).toEqual('Vodafone2');
  });

  it('it should change via ngModel from model', fakeAsync(() => {
    // Arrange
    spectator.component.items = [
      { name: 'Vodafone', id: 1 },
      { name: 'Orange', id: 2 }
    ];
    spectator.detectChanges();

    spectator.component.selected = 2;

    // Act
    spectator.detectChanges();
    spectator.tick();
    spectator.detectChanges();

    // Assert
    expect(selectBoxComponent.selectedItem.key).toBe(2);
    expect(selectBoxComponent.selectedItem.value).toBe('Orange');
  }));
});
