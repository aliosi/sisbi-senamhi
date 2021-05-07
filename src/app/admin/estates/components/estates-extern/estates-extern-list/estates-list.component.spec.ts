import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatesExternListComponent } from './estates-list.component';

describe('EstatesExternListComponent', () => {
  let component: EstatesExternListComponent;
  let fixture: ComponentFixture<EstatesExternListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstatesExternListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatesExternListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
