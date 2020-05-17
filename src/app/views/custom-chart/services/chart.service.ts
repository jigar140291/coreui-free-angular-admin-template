import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';

interface axis{
  expression: string;
  label: string;
}

export interface lineChartMeta {
  height: number;
  width: number;
  lineColor?: string;
  axis: {
    x: axis;
    y: axis;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  plotChart(element: ElementRef, chartData: any[], meta:lineChartMeta) {
    let { width, height } = meta;
    let xExpression = meta.axis.x.expression;
    let yExpression = meta.axis.y.expression;

    let valueRange = d3.extent(chartData, (data) => data[yExpression]);
    let dateRange = d3.extent(chartData, (data) => data[xExpression]);

    let svg = d3.select(element.nativeElement)
              .append('svg')
              .attr('height', '100%')
              .attr('width', '100%');
    
    let xScale = d3.scaleTime()
                   .domain([new Date(dateRange[0]), new Date(dateRange[1])])
                   .range([0, width]);
    
    let yScale = d3.scaleLinear()
                   .domain([+valueRange[0], +valueRange[1]])
                   .range([height, 0]);

    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    let line = d3.line()
                  .x((data) => xScale(new Date(data[xExpression])))
                  .y((data) => yScale(data[yExpression]));

    let chartGroup = svg.append('g')
                        .attr('transform', 'translate(50,50)');

        chartGroup
          .append('path')
          .attr('d', line(chartData));

        chartGroup
          .append('g')
          .attr('class', 'x axis')
          .attr('transform', `translate(0, ${height})`)
          .call(xAxis);

        chartGroup
          .append('g')
          .attr('class', 'y axis')
          .call(yAxis);    
  }

  destroyChart(element: ElementRef): Promise<any>{
    return new Promise((resolve, reject) => {
      /**
       * Added Promise, In case if Destroy has Async tasks.
       */
      d3.select(element.nativeElement).selectAll('svg').remove();
      resolve({});
    })
  }
}
