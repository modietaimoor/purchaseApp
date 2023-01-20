import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';

import { DataGridSummeryComponent } from './data-grid-server-side/data-grid-summery/data-grid-summery.component';

@Injectable({
  providedIn: 'root'
})
export class DataGridService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private applicationRef: ApplicationRef
  ) {}

  createSummeryBar(collection: Array<{ summeryFormat: string; summeryNumbers: string }>): HTMLElement {
    // dynamically instantiate a Component
    const factory = this.resolver.resolveComponentFactory(DataGridSummeryComponent);

    // we need to pass in the dependency injector
    const component = factory.create(this.injector);

    component.instance.collection = collection;

    // we need to manually trigger change detection on our in-memory component
    // s.t. its template syncs with the data we passed in
    component.changeDetectorRef.detectChanges();

    this.applicationRef.attachView(component.hostView);

    // pass in the HTML from our dynamic component
    const content = component.location.nativeElement;

    return content;
  }
}
