import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateExternComponent } from './estate.component';

describe('EstateComponent', () => {
  let component: EstateExternComponent;
  let fixture: ComponentFixture<EstateExternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstateExternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateExternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
