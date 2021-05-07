import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatesFormComponent } from './estates-form.component';

describe('EstatesFormComponent', () => {
  let component: EstatesFormComponent;
  let fixture: ComponentFixture<EstatesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstatesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
