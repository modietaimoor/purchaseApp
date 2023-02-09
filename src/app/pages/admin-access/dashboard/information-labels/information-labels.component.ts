import { Component, Input, OnInit } from '@angular/core';
import { InfoLabelType } from '@domain/models/dashboard';

@Component({
  selector: 'app-info-labels',
  templateUrl: './information-labels.component.html',
  styleUrls: ['./information-labels.component.css']
})
export class InformationLabelsComponent implements OnInit {
  @Input() cost: number;
  @Input() count: number;
  @Input() reportDate: Date;
  @Input() labelType: InfoLabelType;
  rptDate: string;
  constructor() {}

  ngOnInit(): void {
      if(this.labelType === InfoLabelType.Year) this.rptDate = this.reportDate.getFullYear().toString();
      else if(this.labelType === InfoLabelType.Month) this.rptDate = this.reportDate.toMonthNameYear();
      else if(this.labelType === InfoLabelType.Day) this.rptDate = this.reportDate.toDayMonthYear();
  }
}
