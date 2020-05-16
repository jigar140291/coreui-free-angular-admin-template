import { Component, OnInit } from '@angular/core';
import { BatteryStatsService } from '../services/battery-stats.service';

@Component({
  selector: 'app-battery-stats',
  templateUrl: './battery-stats.component.html',
  styleUrls: ['./battery-stats.component.css']
})
export class BatteryStatsComponent implements OnInit {

  constructor(private batteryStatsService: BatteryStatsService) { }

  ngOnInit(): void {
  }

}
