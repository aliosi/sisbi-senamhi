import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatesAuditComponent } from './estates-audit.component';

describe('EstatesAuditComponent', () => {
  let component: EstatesAuditComponent;
  let fixture: ComponentFixture<EstatesAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstatesAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatesAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
