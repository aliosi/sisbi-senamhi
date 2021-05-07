import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestChangeFormComponent } from './request-change-form.component';

describe('RequestChangeFormComponent', () => {
  let component: RequestChangeFormComponent;
  let fixture: ComponentFixture<RequestChangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestChangeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestChangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
