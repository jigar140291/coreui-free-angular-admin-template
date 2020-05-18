import { Component,OnInit } from '@angular/core';
import { BatteryStatsService } from '../services/battery-stats.service';
import { lineChartMeta } from '../services/chart.service';

@Component({
	selector: 'battery-stats',
  templateUrl: './battery-stats.component.html',
  styleUrls: ['./battery-stats.component.scss']
})
export class BatteryStatsComponent implements OnInit {

	constructor(private batteryStatsService: BatteryStatsService) {}

  voltageData: object[];
  batteryList: string[];
  selectedCell: string = "c1";

  chartConfig: lineChartMeta;

	ngOnInit(): void {
		this.batteryStatsService
			.getData("batteryData.json")
			.subscribe((res:any) => {
        this.voltageData = res;
        this.chartConfig = this.batteryStatsService.getUpdatedChartMeta(this.selectedCell);
        this.batteryList = this.batteryStatsService.extractBatteryList(res[0]);
			}, (err:any) => {
				console.log("Handle Error");
			});
  }

  onCellSelected(cell: string): void{
    this.selectedCell = cell;
    this.chartConfig = this.batteryStatsService.getUpdatedChartMeta(this.selectedCell);
  }

  updateMeta(animation: boolean): void{
    this.batteryStatsService.updateAnimation(animation); 
  }
}