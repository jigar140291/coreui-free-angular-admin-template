import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { axisRight } from 'd3';

interface axis{
  expression: string;
  label: string;
}

export interface lineChartMeta {
  height: number;
  width: number;
  lineColor?: string;
  animation?: boolean;
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

  plotChart(element: ElementRef, chartData: any[], meta: lineChartMeta) {
    
    let margin = {top: 10, right: 30, bottom: 30, left: 50 };
    let { width, height, lineColor = "#000", animation = false } = meta;
    let { x, y } = meta.axis;
  
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;
  
    let xExpression = x.expression;
    let yExpression = y.expression;
    let yLabel = y.label;
  
    let valueRange = d3.extent(chartData, (data) => data[yExpression]);
    let dateRange = d3.extent(chartData, (data) => data[xExpression]);
  
    let svg = d3.select(element.nativeElement)
      .append('svg')
      .attr('height', height + 50)
      .attr('width', width + 50);
  
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
      .attr('transform', "translate(" + margin.left + "," + margin.top + ")");
  
    chartGroup
      .append('path')
      .attr('stroke', lineColor)
      .attr('class', 'line')
      .attr('d', line(chartData));
  
    chartGroup
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);
  
    chartGroup
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -38)
      .text(yLabel);
  
    /** Animation Section */
    if (animation) {
      chartGroup.append('rect')
        .attr('x', -1 * width - 1)
        .attr('y', -1 * height)
        .attr('height', height)
        .attr('width', width)
        .attr('class', 'curtain')
        .attr('transform', 'rotate(180)')
        .style('fill', '#ffffff');
  
      let transition = svg.transition()
        .delay(200)
        .duration(3000)
        .ease(d3.easeLinear)
        .each(() => d3.select('line.guide').transition().style('opacity', 0).remove());
  
      transition.select('rect.curtain').attr('width', 0);
      transition.select('line.guide').attr('transform', 'translate(' + width + ', 0)');
    }
  
    /** Tooltip section */
    let focus = chartGroup
      .append("g")
      .attr("class", "focus")
      .style("display", "none");
  
    focus.append("circle")
      .attr("r", 4);
  
    focus.append("rect")
      .attr("class", "tool-tip")
      .attr("width", 200)
      .attr("height", 50)
      .attr("x", 10)
      .attr("y", -22)
      .attr("rx", 4)
      .attr("ry", 4);
  
    focus.append("text")
      .attr("class", "tooltip-date")
      .attr("x", 18)
      .attr("y", -2);
  
    focus.append("text")
      .attr("class", "tooltip-voltage")
      .attr("x", 18)
      .attr("y", 18);
  
    chartGroup.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", () => focus.style("display", null))
      .on("mouseout",  () => focus.style("display", "none"))
      .on("mousemove", showTooltip);
  
    let bisectDate = d3.bisector((data: any) => new Date(data[xExpression])).left;
  
    function showTooltip(): void {
      let invertedDate = xScale.invert(d3.mouse(this)[0]),
          index = bisectDate(chartData, invertedDate, 1),
          d0 = chartData[index - 1],
          d1 = chartData[index],
          ttData = Date.parse(invertedDate.toString()) - Date.parse(d0[xExpression]) > Date.parse(d1[xExpression]) - Date.parse(invertedDate.toString()) ? d0 : d1;
  
      focus.attr("transform", "translate(" + xScale(new Date(ttData[xExpression])) + "," + yScale(ttData[yExpression]) + ")");
      focus.select(".tooltip-date").text(`Date: ${ttData[xExpression]}`);
      focus.select(".tooltip-voltage").text(`Voltage: ${ttData[yExpression]}`);
    }
  }
  
  OnDestroyChart(element: ElementRef): Promise < any > {
    return new Promise((resolve, reject) => {
      /**
       * Added Promise, In case if Destroy has Async tasks.
       */
      d3.select(element.nativeElement)
        .select('rect.overlay')
        .on("mouseover", null)
        .on("mouseout", null)
        .on("mousemove", null);
  
      d3.select(element.nativeElement)
        .selectAll('svg')
        .remove();
  
      resolve({});
    });
  }
}
