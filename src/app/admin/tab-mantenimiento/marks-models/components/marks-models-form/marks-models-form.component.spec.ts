import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksModelsFormComponent } from './marks-models-form.component';

describe('MarksModelsFormComponent', () => {
  let component: MarksModelsFormComponent;
  let fixture: ComponentFixture<MarksModelsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarksModelsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksModelsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
