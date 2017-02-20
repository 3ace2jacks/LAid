import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CourseComponent } from './course.component';
import { CourseDetailComponent} from './course-detail.component';
import { CourseService } from './course.service';
import { UserService } from './user.service';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    CourseDetailComponent,
    DashboardComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [ CourseService, UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
