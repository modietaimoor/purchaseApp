import { AfterViewInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { startWith } from 'rxjs/operators';

import { StepComponent } from './step.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements AfterViewInit {
  @ContentChildren(StepComponent, { descendants: false })
  public options!: QueryList<StepComponent>;

  @Input() currentStep = 1;

  steps: StepComponent[];

  constructor() {}

  ngAfterViewInit(): void {
    // when the component get initialized options.changes Observable was not loaded and at the same time
    // there are list of select options already exists in this.options so we use startWith
    // to run the subscribe manually for one time to get the options array
    this.options.changes.pipe(startWith(this.options)).subscribe(() => {
      this.steps = this.options.toArray();
    });
  }
}
