import { Injectable } from '@angular/core';
import { SpecField } from '@domain/models/specfields';
import { AddSpecFieldUsecase } from '@domain/repositories/usecases/specfields/add-spec-field.usecase';
import { DeleteSpecFieldUsecase } from '@domain/repositories/usecases/specfields/delete-spec-field.usecase';
import { GetAllSpecFieldsUsecase } from '@domain/repositories/usecases/specfields/get-all-specfields.usecase';
import { UpdateSpecFieldNameUsecase } from '@domain/repositories/usecases/specfields/update-spec-field-name.usecase';
import { Observable } from 'rxjs';

@Injectable()
export class SpecificationFieldsService {
  constructor(private _addSpecFieldUsecase: AddSpecFieldUsecase,
    private _deleteSpecFieldUsecase: DeleteSpecFieldUsecase,
    private _getAllSpecFieldsUsecase: GetAllSpecFieldsUsecase,
    private _updateSpecFieldNameUsecase: UpdateSpecFieldNameUsecase) { }

    public getAllSpecFields(): Observable<SpecField[]> {
        return this._getAllSpecFieldsUsecase.execute();
    }

    public addNewSpecField(name: string, type: string): Observable<void> {
        return this._addSpecFieldUsecase.execute(name, type);
    }

    public deleteSpecField(id: number): Observable<void> {
        return this._deleteSpecFieldUsecase.execute(id);
    }

    public updateSpecFieldName(id: number, name: string): Observable<void> {
        return this._updateSpecFieldNameUsecase.execute(id, name);
    }
}
