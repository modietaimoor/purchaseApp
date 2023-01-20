import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxListComponent } from './checkbox-list.component';

xdescribe('CheckboxListComponent', () => {
  let component: CheckboxListComponent;
  let fixture: ComponentFixture<CheckboxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('it should create list of checkboxes when form array provided', () => {});
});
