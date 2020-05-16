import { Component,OnInit } from '@angular/core';
import { BatteryStatsService } from '../services/battery-stats.service';

@Component({
	selector: 'app-battery-stats',
	templateUrl: './battery-stats.component.html',
	styleUrls: ['./battery-stats.component.css']
})
export class BatteryStatsComponent implements OnInit {

	constructor(private batteryStatsService: BatteryStatsService) {}

  voltageData: object[];
  batteryList: string[];

	ngOnInit(): void {
		this.batteryStatsService
			.getData("batteryData.json")
			.subscribe((res:any) => {
        this.voltageData = res;
        this.batteryList = this.batteryStatsService.extractBatteryList(res[0]);
			}, (err:any) => {
				console.log("Handle Error");
			});
	}
}