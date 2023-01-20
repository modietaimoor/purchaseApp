import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { confirm } from 'devextreme/ui/dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  constructor() {}

  confirm(title: string, body: string): Observable<boolean> {
    let result = confirm(body, title);
    return from(result);
  }
}
