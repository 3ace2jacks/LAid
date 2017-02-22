import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { CourseComponent }      from './course.component';
import { CourseDetailComponent }  from './course-detail.component';
import { LoginComponent } from './auth/login/index';

import { HomeComponent } from './auth/home/index';
import { AuthGuard } from './auth/_guards/index';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'courses',     component: CourseComponent },
  { path: 'login',     component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

