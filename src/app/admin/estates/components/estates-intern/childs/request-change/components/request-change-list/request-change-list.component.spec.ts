import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestChangeListComponent } from './request-change-list.component';

describe('RequestChangeListComponent', () => {
  let component: RequestChangeListComponent;
  let fixture: ComponentFixture<RequestChangeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestChangeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestChangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
