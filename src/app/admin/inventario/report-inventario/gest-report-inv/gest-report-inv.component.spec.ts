import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestReportInvComponent } from './gest-report-inv.component';

describe('GestReportInvComponent', () => {
  let component: GestReportInvComponent;
  let fixture: ComponentFixture<GestReportInvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestReportInvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestReportInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
