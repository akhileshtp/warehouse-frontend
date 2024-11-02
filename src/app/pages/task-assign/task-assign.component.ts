import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-assign',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './task-assign.component.html',
  styleUrls: ['./task-assign.component.scss']
})
export default class TaskAssignComponent implements OnInit {

  fb = inject(FormBuilder);
  taskService = inject(TaskService);
  router = inject(Router);

  taskForm!: FormGroup;

  godownArray: string[] = ['MG-1', 'MG-2', 'MG-3', 'MG-4', 'MG-5', 'MG-6'];
  blockArray: string[] = ['A', 'B', 'C'];
  stackArray: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  taskArray: string[] = ['Fumigation', 'Degasing', 'Spraying'];

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      warehouse: ['', Validators.required],
      block: ['', Validators.required],
      stack: ['', Validators.required],
      task: ['', Validators.required],
      date: ['', Validators.required],
      });
  }

  task() {
    if (this.taskForm.invalid) {
        alert("Please fill in all required fields.");
        return;
    }

    console.log("Form Values:", this.taskForm.value); // Log the form values

    this.taskService.assignTask(this.taskForm.value)
      .subscribe({
        next: (res: any) => {
          alert("Task Created!");
          this.taskForm.reset();
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          console.error("Error creating task:", err);
        }
      });
}
}
