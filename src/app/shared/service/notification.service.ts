import { Injectable } from '@angular/core';

import notify from 'devextreme/ui/notify';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {}

  success(message: string): void {
    notify(message, 'success');
  }

  error(message: string): void {
    notify(message, 'error');
  }

  warning(message: string): void {
    notify(message, 'warning');
  }
}
