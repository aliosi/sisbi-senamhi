import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestReportConflictoComponent } from './gest-report-conflicto.component';

describe('GestReportConflictoComponent', () => {
  let component: GestReportConflictoComponent;
  let fixture: ComponentFixture<GestReportConflictoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestReportConflictoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestReportConflictoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
