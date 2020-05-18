import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { lineChartMeta } from './chart.service';

@Injectable({
  providedIn: 'root'
})

export class BatteryStatsService {
	readonly apiUrl: string = "http://localhost:4200/data/";

	private chartConfig: lineChartMeta = {
		height: 400,
		width: 600,
		lineColor:"#17a2b8",
		axis: {
		  x:{
			expression: "date",
			label: "Time Period"
		  },
		  y:{
			expression: "",
			label: "Battery Voltage (V)"
		  }
		}
	};

	constructor(private http: Http) {}

	getData = (endPoint:string): Observable <Response> => {
		let url:string = `${this.apiUrl}/${endPoint}`;

		return this.http.get(url)
			.pipe(map(res => res.json()));
  }
  
  extractBatteryList = (listObj:object): string[] => Object.keys(listObj).filter((key) => key != "date");

  getUpdatedChartMeta = (selectedCell: string) : lineChartMeta => {
	  this.chartConfig.axis.y.expression = selectedCell;
	  return Object.assign([], this.chartConfig);
  }
}
