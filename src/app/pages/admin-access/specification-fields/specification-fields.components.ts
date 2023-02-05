import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SafeAny, SafeObjectAny } from "@core/safe-any-type";
import { CategoryFieldType } from "@domain/models/categories";
import { SpecField } from "@domain/models/specfields";
import { Column } from "@shared/components/grid/model";
import { ConfirmationService } from "@shared/service/confirmation.service";
import { NotificationService } from "@shared/service/notification.service";
import { SpecificationFieldsService } from "./specification-fields.service";

@Component({
  selector: "app-spec-fields",
  templateUrl: "./specification-fields.component.html",
})
export class SpecificationFieldsComponent implements OnInit {
  constructor(private _specificationFieldsService: SpecificationFieldsService,
    private _notificationService: NotificationService,
    private _confirmationService: ConfirmationService) {}
  specFields: SpecField[];
  columns: Column[] = [
    { dataField: 'name', name: 'Field Name', alignment: 'center', allowUpdating: true },
    { dataField: 'type', name: 'Field Type', alignment: 'center' }
  ];
  specFieldForm: FormGroup;
  types = [CategoryFieldType.Text, 
        CategoryFieldType.Year, 
        CategoryFieldType.MonthYear, 
        CategoryFieldType.DayMonthYear, 
        CategoryFieldType.Number, 
        CategoryFieldType.YesNo,
        CategoryFieldType.Country];

  ngOnInit(): void {
    this.specFieldForm = new FormGroup({
        fieldName: new FormControl('', Validators.required),
        fieldType: new FormControl('', Validators.required)
    });
    this.getAllSpecFields();
  }

  addNewSpecField(): void {
    this._specificationFieldsService.addNewSpecField(this.specFieldForm.value.fieldName, this.specFieldForm.value.fieldType).subscribe(() => {
      this._notificationService.success('Specification field added successfully');
      this.getAllSpecFields();
    });
  }

  getAllSpecFields(): void {
    this._specificationFieldsService.getAllSpecFields().subscribe(x => (this.specFields = x));
  }

  deleteSpecField(e: SafeObjectAny): void {
    e.cancel = this._confirmationService.confirm('Delete Specification Field', 'Deleting Specification Field: [' + e.key.name + ']. Proceed ?').subscribe(res => {
      if (res) {
        this._specificationFieldsService.deleteSpecField(e.key.id).subscribe(() => {
          this._notificationService.success('Specification field deleted successfully');
          this.getAllSpecFields();
        });
      }
      else{
        e.component.cancelEditData();
      }
      return !res;
    });
  }

  updateSpecField(e: { newData: { name: string }, key: SpecField }): void {
    this._specificationFieldsService.updateSpecFieldName(e.key.id, e.newData.name).subscribe(() => {
      this._notificationService.success('Specification field name updated successfully');
      this.getAllSpecFields();
    })
  }
}
