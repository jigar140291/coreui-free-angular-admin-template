import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatteryStatsComponent } from './components/battery-stats.component';


const routes: Routes = [
  {
    path: '',
    component: BatteryStatsComponent,
    data: {
      title: 'D3 Charts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomChartRoutingModule { }
