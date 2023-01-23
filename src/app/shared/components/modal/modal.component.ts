import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { ModalUtils } from './modal-utils';
import { ModalService } from './modal.service';

export interface ModalParams<T> {
  content: Type<T>;
  title: string;
  confirmText?: string;
  cancelText?: string;
  height?: number;
  width?: number;
  componentParams?: Partial<T>;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
    `
      ::ng-deep .modal {
        background: rgba(0, 0, 0, 0.2);
      }
    `
  ]
})
export class ModalComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  @Input() params: ModalParams<T>;
  @ViewChild('container', { read: ViewContainerRef }) container;
  @ViewChild('footer', { read: ViewContainerRef }) footerVC: ViewContainerRef;
  componentRef: ComponentRef<Partial<T>>;
  private bsModalRef: BsModalRef;
  footer: TemplateRef<Record<string, unknown>>;
  subscriptions: Subscription[] = [];
  public onClose: Subject<boolean>;

  constructor(private resolver: ComponentFactoryResolver, private modalUtils: ModalUtils, private _modalService: ModalService) {}

  ngOnInit(): void {
    this.onClose = new Subject();
    this.subscriptions.push(this.modalUtils.footer$.pipe(first()).subscribe(f => (this.footer = f)));
    this.subscriptions.push(this.modalUtils.bsModalRef$.pipe(first()).subscribe(f => (this.bsModalRef = f)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  injectFooter(): void {
    if (this.footer) this.footerVC.createEmbeddedView(this.footer);
  }

  ngAfterViewInit(): void {
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(this.params.content);
    this.componentRef = this.container.createComponent(factory);
    this.setComponentInputs();
    this.injectFooter();
  }

  cancel(): void {
    this._modalService.closeResult(false);
    this.bsModalRef.hide();
  }

  confirm(): void {
    this._modalService.closeResult(true);
    this.bsModalRef.hide();
  }

  close(): void {
    this.bsModalRef.hide();
  }

  private setComponentInputs(): void {
    const data = { ...this.params.componentParams };
    for (let key in data) {
      (this.componentRef.instance as unknown)[key] = data[key];
    }
    this.componentRef.changeDetectorRef.detectChanges();
  }
}
