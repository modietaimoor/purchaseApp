import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpecField } from '@domain/models/specfields';
import { SpecificationFieldsRepository } from '@domain/repositories/specification-fields.repository';

@Injectable({
  providedIn: 'root'
})
export class GetAllSpecFieldsUsecase {
  constructor(private _specFieldsRepository: SpecificationFieldsRepository) {}

  execute(): Observable<SpecField[]> {
    return this._specFieldsRepository.GetAllSpecFields().pipe(map(res => 
        res.map(x => {
            return {
                id: x.ID,
                name: x.FieldName,
                type: x.FieldType
            };
        }))
    );
  }
}
