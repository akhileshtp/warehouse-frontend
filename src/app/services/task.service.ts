// import { Injectable, inject } from '@angular/core';
// import {HttpClient} from '@angular/common/http'
// import { apiUrls } from '../api.urls';
// import { BehaviorSubject } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {
//   http = inject(HttpClient);
  

//   assignTask(createObj: any){
//     return this.http.post<any>(`${apiUrls.taskServiceApi}create`, createObj);
//   }

//  }

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable } from 'rxjs';

interface Task {
  _id: string;
  task: string;
  warehouse: string;
  block: string;
  stack: string;
  date: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);

  
  // Method to assign a task
  assignTask(createObj: any): Observable<any> {
    return this.http.post<any>(`${apiUrls.taskServiceApi}/create`, createObj);
  }

  // Method to get a list of all tasks
  fetchTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${apiUrls.taskServiceApi}/getAll`);
  }

  // Method to get task overview (summary counts for each task type)
  fetchTaskOverview(): Observable<{ fumigation: number; degassing: number; spraying: number }> {
    return this.http.get<{ fumigation: number; degassing: number; spraying: number }>(
      `${apiUrls.taskServiceApi}/task-overview`
    );
  }
}
