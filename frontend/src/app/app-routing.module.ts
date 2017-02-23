import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { CourseComponent }      from './course.component';
import { NewCourseComponent } from './new-course.component';
import { CourseDetailComponent }  from './course-detail.component';
import { LoginComponent } from './auth/login';
import { RegisterComponent } from './auth/register';

import { CourseJoinComponent } from './course-join.component';

import { HomeComponent } from './home';
import { AuthGuard } from './auth/_guards/index';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'courses/join',     component: CourseJoinComponent },
  { path: 'courses',     component: CourseComponent },
  { path: 'login',     component: LoginComponent },
  { path: 'register',     component: RegisterComponent },
  { path: 'courses/create',     component: NewCourseComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
