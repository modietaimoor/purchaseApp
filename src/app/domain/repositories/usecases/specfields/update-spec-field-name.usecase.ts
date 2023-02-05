import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecificationFieldsRepository } from '@domain/repositories/specification-fields.repository';

@Injectable({
  providedIn: 'root'
})
export class UpdateSpecFieldNameUsecase {
  constructor(private _specFieldsRepository: SpecificationFieldsRepository) {}

  execute(id: number, name: string): Observable<void> {
    return this._specFieldsRepository.UpdateSpecFieldName(id, name);
  }
}
