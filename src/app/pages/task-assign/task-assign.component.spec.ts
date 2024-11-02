import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAssignComponent } from './task-assign.component';

describe('TaskAssignComponent', () => {
  let component: TaskAssignComponent;
  let fixture: ComponentFixture<TaskAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskAssignComponent]
    });
    fixture = TestBed.createComponent(TaskAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
