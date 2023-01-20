import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalUtils {
  private footer: Subject<TemplateRef<Record<string, never>>> = new Subject<TemplateRef<Record<string, never>>>();
  footer$: Observable<TemplateRef<Record<string, never>>>;

  private bsModalRef: Subject<BsModalRef> = new Subject<BsModalRef>();
  bsModalRef$: Observable<BsModalRef>;

  constructor() {
    this.footer$ = this.footer.asObservable();
    this.bsModalRef$ = this.bsModalRef.asObservable();
  }

  pushConfig(templateRef: TemplateRef<Record<string, never>>): void {
    this.footer.next(templateRef);
  }

  pushModalRef(ref: BsModalRef): void {
    this.bsModalRef.next(ref);
  }
}
