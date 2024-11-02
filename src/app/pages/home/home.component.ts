import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import TaskAssignComponent from '../task-assign/task-assign.component';
import { TaskService } from '../../services/task.service';

interface Task {
  _id: string;
  task: string;
  warehouse: string;
  block: string;
  stack: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TaskAssignComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export default class HomeComponent implements OnInit {
  router = inject(Router);
  private taskService = inject(TaskService);

  tasks: Task[] = [];
  taskOverview = { 
    fumigation: { pending: 0, completed: 0 },
    degasing: { pending: 0, completed: 0 },
    spraying: { pending: 0, completed: 0 } 
  };

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.fetchTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.calculateTaskOverview();  // Calculate counts after fetching tasks
      },
      error: (err) => {
        console.error('Error fetching tasks:', err); // Log the error
      }
    });
  }

  calculateTaskOverview(): void {
    this.tasks.forEach(task => {
      if (task.task === 'Fumigation') {
        task.status === 'Pending' ? this.taskOverview.fumigation.pending++ : this.taskOverview.fumigation.completed++;
      } else if (task.task === 'Degasing') {
        task.status === 'Pending' ? this.taskOverview.degasing.pending++ : this.taskOverview.degasing.completed++;
      } else if (task.task === 'Spraying') {
        task.status === 'Pending' ? this.taskOverview.spraying.pending++ : this.taskOverview.spraying.completed++;
      }
    });
  }

  navigateToAdminRegister() {
    this.router.navigate(['/register'], { queryParams: { isAdmin: true } });
  }
}
