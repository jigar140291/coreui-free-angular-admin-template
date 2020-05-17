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

  chartConfig: lineChartMeta = {
    height: 300,
    width: 500,
    lineColor: "#20a8d8",
    axis: {
      x:{
        expression: "date",
        label: "Time Period"
      },
      y:{
        expression: "c1",
        label: "Voltage"
      }
    }
  };

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

  onCellSelected(cell: string): void{
    this.selectedCell = cell;
    this.chartConfig = {
      height: 300,
      width: 500,
      lineColor: "#20a8d8",
      axis: {
        x:{
          expression: "date",
          label: "Time Period"
        },
        y:{
          expression: this.selectedCell,
          label: "Voltage"
        }
      }
    }
  }
}