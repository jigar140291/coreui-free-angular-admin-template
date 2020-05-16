import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BatteryStatsService {

  constructor() { 
    console.log("I am battery service..");
  }
}
