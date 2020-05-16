import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class BatteryStatsService {
	readonly apiUrl: string = "http://localhost:4200/data/";

	constructor(private http: Http) {}

	getData = (endPoint:string): Observable <Response> => {
		let url:string = `${this.apiUrl}/${endPoint}`;

		return this.http.get(url)
			.pipe(map(res => res.json()));
  }
  
  extractBatteryList = (listObj:object): string[] => Object.keys(listObj).filter((key) => key != "date");
}
