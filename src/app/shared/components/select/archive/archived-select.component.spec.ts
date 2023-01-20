// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { fakeAsync, flush } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';

// import { createComponentFactory, dispatchMouseEvent, Spectator } from '@ngneat/spectator';
// import { DxSelectBoxModule } from 'devextreme-angular';

// import { SelectOptionComponent } from './select-option.component';
// import { SelectComponent } from './select.component';

// @Component({
//   template: ` <app-select> </app-select> name {{ name }}`
// })
// export class TestSelectTemplateDefaultComponent {
//   name;
//   items = [
//     { name: 'Vodafone', id: 1 },
//     { name: 'Orange', id: 2 }
//   ];
//   valueChange = jasmine.createSpy('valueChange');
// }
// export class PageObject {
//   get options(): HTMLElement[] {
//     return spectator.queryAll('[role="option"]', {
//       root: true // dropdown content is outside the component itself mainly in the root of the page
//     }) as HTMLElement[];
//   }

//   get selectedOption(): HTMLInputElement {
//     return spectator.query('.dx-texteditor-input', {
//       root: true
//     }) as HTMLInputElement;
//   }

//   // open select dropdown to list options
//   openDropdown(): void {
//     dispatchMouseEvent(selectElement.querySelector('.dx-dropdowneditor-input-wrapper'), 'click');
//   }
// }

// let spectator: Spectator<TestSelectTemplateDefaultComponent>;
// let selectElement: HTMLElement;
// const pageObject = new PageObject();
// describe('SelectComponent', () => {
//   const createComponent = createComponentFactory({
//     component: TestSelectTemplateDefaultComponent,
//     declarations: [SelectComponent, SelectOptionComponent],
//     imports: [DxSelectBoxModule, FormsModule]
//   });

//   describe('Given component first initialize', () => {
//     describe('Given options provided', () => {
//       Given(() => {
//         spectator = createComponent();
//         selectElement = spectator.debugElement.query(By.directive(SelectComponent)).nativeElement;
//       });

//       When(() => {
//         pageObject.openDropdown();
//       });

//       Then('it should list all options', () => {
//         const options = pageObject.options;

//         // Assert
//         expect(options.length).toEqual(2);
//         expect(options[0].innerText).toEqual('Vodafone');
//         expect(options[1].innerText).toEqual('Orange');
//       });
//     });

//     describe('Given option selected', () => {
//       Given(() => {
//         spectator = createComponent();
//         selectElement = spectator.debugElement.query(By.directive(SelectComponent)).nativeElement;
//       });

//       When(() => {
//         pageObject.openDropdown();
//         const options = pageObject.options;

//         dispatchMouseEvent(options[0], 'click');
//       });

//       Then('ngModel should work', () => {
//         expect(spectator.component.valueChange).toHaveBeenCalledWith(1);
//       });
//     });

//     fdescribe('Given option id passed to the component', () => {
//       Given(() => {
//         spectator = createComponent();
//       });

//       When(() => {});

//       Then('it should auto select option by id', () => {
//         spectator.component.name = 2;
//         spectator.query(SelectComponent).selected = 2;
//         spectator.detectChanges();
//         // spectator.component.name = 2;
//         // spectator.tick();
//         // flush();
//         // spectator.detectChanges();
//         // console.log('query', spectator.query(SelectComponent).selected);
//         // console.log('pageObject', pageObject.selectedOption.value);
//         // expect(pageObject.selectedOption.value).toBe('Orange');
//       });
//     });
//   });

//   describe('Given items list updated', () => {
//     Given(() => {
//       spectator = createComponent();
//       selectElement = spectator.debugElement.query(By.directive(SelectComponent)).nativeElement;
//     });

//     When(() => {
//       pageObject.openDropdown();
//     });

//     Then(
//       'it should list all updated options',
//       fakeAsync(() => {
//         let options = pageObject.options;
//         expect(options.length).toEqual(2);
//         expect(options[0].innerText).toEqual('Vodafone');
//         expect(options[1].innerText).toEqual('Orange');

//         spectator.component.items = [{ name: 'Vodafone2', id: 1 }];
//         spectator.tick();
//         flush();

//         options = pageObject.options;
//         expect(options.length).toEqual(1);
//         expect(options[0].innerText).toEqual('Vodafone2');
//       })
//     );
//   });
// });

// // To get element by class name use spectator.queryAll('.className') don't forget dot(.)
// // To get element by role name use spectator.queryAll('[role="name"]')
// // To get element  element outside the component itself use root property spectator.query('...', {root: true })
// // To get child component use spectator.query(ChildComponent)
// ------------------------------------------------------------------------------------------------------------------------
// import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';

// import { createComponentFactory, Spectator } from '@ngneat/spectator';
// import { DxSelectBoxModule } from 'devextreme-angular';

// import { SelectOptionComponent } from './select-option.component';
// import { SelectComponent } from './select.component';
// @Component({
//   template: `<app-select></app-select>name {{ name }}`
// })
// export class TestSelectTemplateDefaultComponent {
//   name;
// }

// let component: TestSelectTemplateDefaultComponent;
// let fixture: ComponentFixture<TestSelectTemplateDefaultComponent>;
// let spectator: Spectator<TestSelectTemplateDefaultComponent>;
// describe('SelectComponent', () => {
//   // const createComponent = createComponentFactory({
//   //   component: TestSelectTemplateDefaultComponent,
//   //   declarations: [SelectComponent, SelectOptionComponent],
//   //   imports: [DxSelectBoxModule, FormsModule],
//   //   detectChanges: true
//   // });

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [TestSelectTemplateDefaultComponent, SelectComponent, SelectOptionComponent]
//     })
//       .overrideComponent(SelectComponent, {
//         set: {
//           changeDetection: ChangeDetectionStrategy.Default
//         }
//       })
//       .compileComponents();
//   });

//   // beforeEach(() => {
//   //   spectator = createComponent();
//   //   component = spectator.fixture.componentInstance;
//   // });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TestSelectTemplateDefaultComponent);
//     component = fixture.componentInstance;
//   });

//   describe('Given option id passed to the component', () => {
//     // it('', () => {
//     //   spectator.fixture.componentInstance.name = 5555555555555;
//     //   // console.log(fixture.debugElement.query(By.css('app-select')));
//     //   const childComponent = spectator.query(SelectComponent) as SelectComponent;
//     //   console.log(childComponent.selected);
//     //   childComponent.selected = 999999999999;
//     //   spectator.detectComponentChanges();
//     //   console.log(childComponent.selected);
//     //   childComponent.selected = 777777;
//     //   spectator.detectComponentChanges();
//     // });
//     it('', () => {
//       fixture.componentInstance.name = 5555555555555;
//       // console.log(fixture.debugElement.query(By.css('app-select')));
//       const childComponent = fixture.debugElement.query(
//         // get the child component instance
//         By.directive(SelectComponent)
//       ).componentInstance as SelectComponent;
//       console.log(childComponent.selected);
//       childComponent.selected = 999999999999;
//       fixture.detectChanges();
//       console.log(childComponent.selected);
//       childComponent.selected = 777777;
//       fixture.detectChanges();
//     });
//     //   Given(() => {
//     //     fixture = TestBed.createComponent(TestSelectTemplateDefaultComponent);
//     //   });

//     //   When(() => {});

//     //   Then('it should auto select option by id', () => {
//     //     fixture.componentInstance.name = 2;
//     //     // let s: SelectComponent = fixture.debugElement.query(By.directive(SelectComponent));
//     //     // s.selected = 23423;
//     //     // fixture.detectChanges();
//     //     // spectator.detectChanges();
//     //     // spectator.component.name = 2;
//     //     // spectator.tick();
//     //     // flush();
//     //     // spectator.detectChanges();
//     //     // console.log('query', spectator.query(SelectComponent).selected);
//     //     // console.log('pageObject', pageObject.selectedOption.value);
//     //     // expect(pageObject.selectedOption.value).toBe('Orange');
//     //   });
//     // });
//   });
// });

// // To get element by class name use spectator.queryAll('.className') don't forget dot(.)
// // To get element by role name use spectator.queryAll('[role="name"]')
// // To get element  element outside the component itself use root property spectator.query('...', {root: true })
// // To get child component use spectator.query(ChildComponent)
// ------------------------------------------------------------------------------------------------------

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [DxSelectBoxModule, FormsModule],
//       declarations: [TestSelectTemplateDefaultComponent, SelectComponent, SelectOptionComponent]
//     })
//       .overrideComponent(SelectComponent, {
//         set: {
//           changeDetection: ChangeDetectionStrategy.Default
//         }
//       })
//       .overrideComponent(TestSelectTemplateDefaultComponent, {
//         set: {
//           changeDetection: ChangeDetectionStrategy.Default
//         }
//       })
//       .compileComponents();
//   });

//   describe('Given component first initialize', () => {
//     describe('Given options provided', () => {
//       Given(() => {
//         fixture = TestBed.createComponent(TestSelectTemplateDefaultComponent);
//         fixture.detectChanges();
//         selectElement = fixture.debugElement.query(By.directive(SelectComponent)).nativeElement;
//       });

//       When(() => {
//         pageObject.openDropdown();
//       });

//       Then('it should list all options', () => {
//         fixture.detectChanges();
//         const options = pageObject.options;
//         console.log(options);
//         // Assert
//         expect(options.length).toEqual(2);
//         expect(options[0].textContent).toEqual('Vodafone');
//         expect(options[1].textContent).toEqual('Orange');
//       });
//     });

//     export class PageObject {
//   get options(): NodeListOf<Element> {
//     return fixture.nativeElement.querySelectorAll('[role="option"]');
//   }
//   get selectedOption(): HTMLInputElement {
//     return fixture.nativeElement.querySelector('.dx-texteditor-input');
//   }
//   // open select dropdown to list options
//   openDropdown(): void {
//     const mouseenter = new MouseEvent('click');
//     selectElement.querySelector('.dx-dropdowneditor-input-wrapper').dispatchEvent(mouseenter);
//   }
// }
// ----------------------------------------------------------------------------------------------------
// import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
// import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';

// import { DxSelectBoxModule } from 'devextreme-angular';

// import { SelectOptionComponent } from './select-option.component';
// import { SelectComponent } from './select.component';
// import { ComponentBed, createComponentBed } from '../../test/test.utili';

// let testBed: ComponentBed<TestSelectTemplateDefaultComponent>;
// let component: TestSelectTemplateDefaultComponent;

// describe('SelectComponent', () => {
//   beforeEach(() => {
//     testBed = createComponentBed(TestSelectTemplateDefaultComponent, {
//       imports: [FormsModule, DxSelectBoxModule],
//       declarations: [TestSelectTemplateDefaultComponent, SelectComponent, SelectOptionComponent]
//     });
//   });

//   describe('Given component first initialize', () => {
//     describe('Given options provided', () => {
//       Given(() => {
//         testBed.detectChanges();
//       });

//       When(() => {
//         pageObject.openDropdown();
//         testBed.detectChanges();
//       });

//       Then('it should list all options', () => {
//         const options = pageObject.options;
//         expect(options.length).toEqual(2);
//         expect(options[0].textContent).toEqual('Vodafone');
//         expect(options[1].textContent).toEqual('Orange');
//       });
//     });
//   });

//   fdescribe('Given option selected', () => {
//     Given(() => {
//       testBed.detectChanges();
//     });

//     When(() => {
//       pageObject.openDropdown();
//     });

//     Then('ngModel should work', async () => {
//       await testBed.whenStable().then();
//       const options = pageObject.options;
//       testBed.click(options[0]);
//       await testBed.whenStable().then();
//       expect(testBed.component.valueChange).toHaveBeenCalledWith(1);
//     });
//   });

// });

// export class PageObject {
//   get options(): HTMLElement[] {
//     return testBed.getElementByRole('option');
//   }

//   get selectedOption(): HTMLElement {
//     return testBed.getElementsByClassName('dx-texteditor-input')[0];
//   }

//   // open select dropdown to list options
//   openDropdown(): void {
//     const dropdownBar = testBed.getElementsByClassName('dx-dropdowneditor-input-wrapper')[0];
//     testBed.click(dropdownBar);
//   }
// }

// const pageObject = new PageObject();

// @Component({
//   template: `
//     <app-select [(ngModel)]="name" (ngModelChange)="valueChange($event)">
//       <app-select-option *ngFor="let item of items" [value]="item.name" [key]="item.id"> </app-select-option>
//     </app-select>
//     name {{ name }}
//   `
// })
// export class TestSelectTemplateDefaultComponent {
//   items = [
//     { name: 'Vodafone', id: 1 },
//     { name: 'Orange', id: 2 }
//   ];
//   name;
//   valueChange = jasmine.createSpy('valueChange');
// }
