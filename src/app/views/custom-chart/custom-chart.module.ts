import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomChartRoutingModule } from './custom-chart-routing.module';
import { BatteryStatsComponent } from './components/battery-stats.component';
import { BatteryStatsService } from './services/battery-stats.service';


@NgModule({
  declarations: [BatteryStatsComponent],
  imports: [
    CommonModule,
    CustomChartRoutingModule
  ],
  providers:[BatteryStatsService]
})
export class CustomChartModule { }
