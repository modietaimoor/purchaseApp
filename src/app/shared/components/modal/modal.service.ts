import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Guid } from '@shared/utils/guid';
import { createClass } from '@shared/utils/style.utils';

import { ModalUtils } from './modal-utils';
import { ModalComponent, ModalParams } from './modal.component';
import { SafePropertyAny } from '@core/safe-any-type';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Injectable()
export class ModalService {
  // TODO:: remove this array and use only the modalRef
  private bsModalRefs: BsModalRef[] = [];
  private modalRef: Map<string, BsModalRef> = new Map<string, BsModalRef>();
  private subject = new Subject();
  constructor(private bsModalService: BsModalService, private modalUtils: ModalUtils) {}

  create<T, R = SafePropertyAny>(params: ModalParams<T>): ModalRef<R> {
    const initialState = { params: params };
    const ref = new ModalRef<R>(Guid.newGuid());
    const bsModalRef = this.bsModalService.show<ModalComponent<T>>(ModalComponent, {
      animated: false,
      initialState,
      providers: [{ provide: ModalRef, useValue: ref }]
    });

    bsModalRef.setClass(createClass(`{ width:${params.width}% !important; max-width: unset !important; }`));

    this.modalUtils.pushModalRef(bsModalRef);
    this.modalRef.set(ref.id, bsModalRef);
    this.bsModalRefs.push(bsModalRef);

    ref.onClose.subscribe(data => {
      this.modalRef.get(data.id).hide();
      this.modalRef.delete(data.id);
    });

    return ref;
  }

  close(): void {
    this.bsModalRefs.pop().hide();
  }

  closeResult(res: boolean): void {
    this.subject.next(res);
  }

  getResult(): Observable<unknown> {
    return this.subject.asObservable();
  }
}

export class ModalRef<R = SafePropertyAny> {
  private close$: Subject<{ id: string; result: R }> = new Subject<{ id: string; result: R }>();
  public onClose: Observable<{ id: string; result: R }> = this.close$.asObservable();
  constructor(public id: string) {}

  close(result?: R): void {
    this.close$.next({ id: this.id, result: result });
  }
}
