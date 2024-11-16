import { Routes } from '@angular/router';
import TaskAssignComponent  from './pages/task-assign/task-assign.component';
import { LaborerViewComponent } from './pages/laborer-view/laborer-view.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login', loadComponent: ()=> import('./pages/login/login.component')},
  { path: 'register', loadComponent: () => import('./pages/register/register.component') },
  { path: 'home', loadComponent: () => import('./pages/home/home.component') },
  { path: 'reset/:token', loadComponent: () => import('./pages/reset/reset.component') },
  { path: 'task-assign', component: TaskAssignComponent },
  { path: 'laborer-view', component: LaborerViewComponent }
];
