import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestRegistroComponent } from './gest-registro.component';

describe('GestRegistroComponent', () => {
  let component: GestRegistroComponent;
  let fixture: ComponentFixture<GestRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
