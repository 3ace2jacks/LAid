import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { CourseComponent }      from './course.component';
import { CourseDetailComponent }  from './course-detail.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'courses',     component: CourseComponent },
  { path: 'login',     component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
