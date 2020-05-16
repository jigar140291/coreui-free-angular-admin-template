import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryStatsComponent } from './battery-stats.component';

describe('BatteryStatsComponent', () => {
  let component: BatteryStatsComponent;
  let fixture: ComponentFixture<BatteryStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatteryStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatteryStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
