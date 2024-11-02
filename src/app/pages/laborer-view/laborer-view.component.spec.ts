import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborerViewComponent } from './laborer-view.component';

describe('LaborerViewComponent', () => {
  let component: LaborerViewComponent;
  let fixture: ComponentFixture<LaborerViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LaborerViewComponent]
    });
    fixture = TestBed.createComponent(LaborerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
