import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { CourseComponent }      from './course/course.component';
import { CourseCreateComponent } from './course/course-create.component';
import { CourseDetailComponent }  from './course/course-detail.component';
import { LoginComponent } from './auth/login';
import { RegisterComponent } from './auth/register';

import { CourseJoinComponent } from './course/course-join.component';

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
  { path: 'courses/create',     component: CourseCreateComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
