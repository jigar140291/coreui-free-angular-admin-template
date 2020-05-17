import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { ChartService, lineChartMeta } from '../services/chart.service';

declare var JSON;

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent implements OnChanges {

  private _meta: lineChartMeta;
  private _data: object[];

  @Input() 
  set meta(value:lineChartMeta){
    console.log("meta updated");
    this._meta = value;
  }
  get meta() { return this._meta}

  @Input() 
  set data(value){
    this._data = value;
  }
  get data() { return this._data}

  constructor(private chartService: ChartService, private element: ElementRef) { }

  ngOnChanges(): void{
    this.chartService.destroyChart(this.element)
      .then(() => this.chartService.plotChart(this.element, this.data, this.meta))
  }
}
