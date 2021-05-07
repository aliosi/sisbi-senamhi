import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatesImportFormComponent } from './estates-import-form.component';

describe('EstatesImportFormComponent', () => {
  let component: EstatesImportFormComponent;
  let fixture: ComponentFixture<EstatesImportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstatesImportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatesImportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
