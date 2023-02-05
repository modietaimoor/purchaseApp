import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecificationFieldsRepository } from '@domain/repositories/specification-fields.repository';

@Injectable({
  providedIn: 'root'
})
export class DeleteSpecFieldUsecase {
  constructor(private _specFieldsRepository: SpecificationFieldsRepository) {}

  execute(id: number): Observable<void> {
    return this._specFieldsRepository.DeleteSpecField(id);
  }
}
