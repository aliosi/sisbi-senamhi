import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksModelsListComponent } from './marks-models-list.component';

describe('MarksModelsListComponent', () => {
  let component: MarksModelsListComponent;
  let fixture: ComponentFixture<MarksModelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarksModelsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksModelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
