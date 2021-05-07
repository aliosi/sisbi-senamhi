import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatesExternFormComponent } from './estates-form.component';

describe('EstatesExternFormComponent', () => {
  let component: EstatesExternFormComponent;
  let fixture: ComponentFixture<EstatesExternFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstatesExternFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatesExternFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
