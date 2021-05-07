import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MarksFormComponent} from './marks-form.component';

describe('MarksFormCreateComponent', () => {
  let component: MarksFormComponent;
  let fixture: ComponentFixture<MarksFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarksFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
