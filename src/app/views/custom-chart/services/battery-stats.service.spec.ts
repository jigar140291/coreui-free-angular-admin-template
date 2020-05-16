import { TestBed } from '@angular/core/testing';

import { BatteryStatsService } from './battery-stats.service';

describe('BatteryStatsService', () => {
  let service: BatteryStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatteryStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
