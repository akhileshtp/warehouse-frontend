
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Task {
  _id: string;
  task: string;
  warehouse: string;
  block: string;
  stack: string;
  date: string;
  status: string;
  isVisible: boolean; // For task visibility
}

@Component({
  selector: 'app-laborer-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './laborer-view.component.html',
  styleUrls: ['./laborer-view.component.scss']
})
export class LaborerViewComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    // Fetch tasks from the server and filter for only pending tasks
    this.http.get<Task[]>('http://localhost:8800/api/task/getAll')
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks
            .filter(task => task.status === 'Pending') // Only load pending tasks
            .map(task => ({
              ...task,
              isVisible: true // Initialize visible state for each task
            }));
        },
        error: (error) => {
          console.error("Error loading tasks:", error);
          alert("Failed to load tasks. Please try again later."); // User-friendly alert
        }
      });
  }

  toggleStatus(task: Task): void {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';

    this.http.put(`http://localhost:8800/api/task/update/${task._id}`, { status: newStatus })
      .subscribe({
        next: () => {
          task.status = newStatus;
        },
        error: (error) => {
          console.error("Error updating task status:", error);
          alert("Failed to update task status. Please try again."); // User-friendly alert
        }
      });
  }

  closeTask(task: Task): void {
    if (confirm("Are you sure you want to close this task?")) {
      task.isVisible = false; // Hide task from the view
    }
  }
}

