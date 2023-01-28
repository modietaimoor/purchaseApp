import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  DxCalendarModule,
  DxChartModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxListModule,
  DxDropDownButtonModule,
  DxPieChartModule,
  DxPopoverModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxTabPanelModule,
  DxRadioGroupModule,
  DxTagBoxModule,
  DxGalleryModule,
  DxFileUploaderModule,
  DxMenuModule,
  DxTreeViewModule,
  DxDropDownBoxModule,
  DxCheckBoxModule
} from 'devextreme-angular';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ButtonComponent } from './components/button/button.component';
import { GraphChartComponent } from './components/chart/graph-chart/graph-chart.component';
import { PieChartComponent } from './components/chart/pie-chart/pie-chart.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DropdownBoxComponent } from './components/dropdown-box/dropdown-box.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { DataGridClientSideComponent } from './components/grid/data-grid-client-side/data-grid-client-side.component';
import { DataGridServerSideComponents } from './components/grid/data-grid-server-side';
import { DataGridSummeryComponent } from './components/grid/data-grid-server-side/data-grid-summery/data-grid-summery.component';
import { MenuComponent } from './components/menu/menu.component';
import { ModalFooterDirective } from './components/modal/modal-footer.directive';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './components/modal/modal.service';
import { PopoverComponent } from './components/popover/popover.component';
import { SelectOptionComponent } from './components/select/select-option.component';
import { SelectComponent } from './components/select/select.component';
import { StepComponent } from './components/stepper/step.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { TabBodyComponent } from './components/tabs/tab-body.component';
import { TabTemplateDirective } from './components/tabs/tab-template.directive';
import { TabComponent } from './components/tabs/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TagBoxComponent } from './components/tag-box/tag-box.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { ButtonIconDirective } from './directives/button-icon/button-icon.directive';

@NgModule({
  declarations: [
    SelectComponent,
    SelectOptionComponent,
    DatePickerComponent,
    DataGridSummeryComponent,
    ModalComponent,
    DataGridClientSideComponent,
    CheckboxComponent,
    ButtonComponent,
    ButtonIconDirective,
    PieChartComponent,
    GraphChartComponent,
    DataListComponent,
    PopoverComponent,
    TabsComponent,
    TabComponent,
    TagBoxComponent,
    TabTemplateDirective,
    TabBodyComponent,
    ...DataGridServerSideComponents,
    StepperComponent,
    StepComponent,
    ModalFooterDirective,
    GalleryComponent,
    FileUploaderComponent,
    MenuComponent,
    TreeViewComponent,
    DropdownBoxComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxCalendarModule,
    DxSelectBoxModule,
    DxChartModule,
    DxPieChartModule,
    DxListModule,
    DxPopoverModule,
    DxDropDownButtonModule,
    DxTabPanelModule,
    DxTemplateModule,
    DxRadioGroupModule,
    DxTagBoxModule,
    DxGalleryModule,
    DxFileUploaderModule,
    DxMenuModule,
    DxTreeViewModule,
    DxDropDownBoxModule,
    DxCheckBoxModule,
    ModalModule.forChild()
  ],
  providers: [ModalService],
  exports: [
    SelectComponent,
    SelectOptionComponent,
    DatePickerComponent,
    DataGridSummeryComponent,
    ModalComponent,
    DataGridClientSideComponent,
    CheckboxComponent,
    ButtonComponent,
    ButtonIconDirective,
    PieChartComponent,
    GraphChartComponent,
    DataListComponent,
    PopoverComponent,
    TabsComponent,
    TabComponent,
    TagBoxComponent,
    TabTemplateDirective,
    TabBodyComponent,
    ...DataGridServerSideComponents,
    StepperComponent,
    StepComponent,
    ModalFooterDirective,
    GalleryComponent,
    FileUploaderComponent,
    MenuComponent,
    TreeViewComponent,
    DropdownBoxComponent
  ]
})
export class SharedModule {}
