import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecificationFieldsRepository } from '@domain/repositories/specification-fields.repository';

@Injectable({
  providedIn: 'root'
})
export class AddSpecFieldUsecase {
  constructor(private _specFieldsRepository: SpecificationFieldsRepository) {}

  execute(name: string, type: string): Observable<void> {
    return this._specFieldsRepository.AddSpecField(name, type);
  }
}
