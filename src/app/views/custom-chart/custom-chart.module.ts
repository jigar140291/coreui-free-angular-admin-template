import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { CustomChartRoutingModule } from './custom-chart-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { BatteryStatsComponent } from './components/battery-stats.component';
import { LineChartComponent } from './components/line-chart.component';
import { BatteryStatsService } from './services/battery-stats.service';

@NgModule({
  declarations: [BatteryStatsComponent, LineChartComponent],
  imports: [
    CommonModule,
    CustomChartRoutingModule,
    HttpModule,
    BsDropdownModule.forRoot()
  ],
  providers:[BatteryStatsService]
})
export class CustomChartModule { }
