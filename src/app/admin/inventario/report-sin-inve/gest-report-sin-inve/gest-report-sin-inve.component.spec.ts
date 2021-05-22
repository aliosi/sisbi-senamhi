import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestReportSinInveComponent } from './gest-report-sin-inve.component';

describe('GestReportSinInveComponent', () => {
  let component: GestReportSinInveComponent;
  let fixture: ComponentFixture<GestReportSinInveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestReportSinInveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestReportSinInveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
