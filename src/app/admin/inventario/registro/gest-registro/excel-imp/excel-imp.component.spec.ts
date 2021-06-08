import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelImpComponent } from './excel-imp.component';

describe('ExcelImpComponent', () => {
  let component: ExcelImpComponent;
  let fixture: ComponentFixture<ExcelImpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelImpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelImpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
