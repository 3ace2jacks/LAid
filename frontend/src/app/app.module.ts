import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

// Import bootstrap
import { AlertModule } from 'ng2-bootstrap';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { ModalModule } from 'ng2-bootstrap/modal';

// Import charts
import { ChartsModule } from 'ng2-charts/ng2-charts';

// Import routing
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseDetailTeacherComponent } from './course/course-detail-teacher/course-detail-teacher.component';
import { CourseDetailStudentComponent } from './course/course-detail-student/course-detail-student.component';
import { HomeComponent } from './home/home.component';

import { CourseService } from './course/course.service';
import { QuizService } from './quiz/quiz.service';
import { QuizCreateComponent } from './quiz/quiz-create/quiz-create.component';
import { QuizStudentComponent } from './quiz/quiz-student/quiz-student.component';
import { QuizTeacherComponent } from './quiz/quiz-teacher/quiz-teacher.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AuthHttpService } from './auth/auth-http.service';
import { LiveTeacherComponent } from './live/live-teacher/live-teacher.component';
import { LiveStudentComponent } from './live/live-student/live-student.component';
import { LiveService } from './live/live.service';


// Define the routes used by the application. All the urls to components are created here
const appRoutes:Routes = [
    { path: 'courses', component: CourseListComponent },
    { path: 'course/:id/teacher', component: CourseDetailTeacherComponent },
    { path: 'course/:id/student', component: CourseDetailStudentComponent },
    { path: 'quiz/create/:course_id/:lecture_id/:type', component: QuizCreateComponent },

    { path: 'quiz/:id/student', component: QuizStudentComponent },
    { path: 'quiz/:id/teacher', component: QuizTeacherComponent },

    { path: 'lecture/:id/live/student', component: LiveStudentComponent },
    { path: 'lecture/:id/live/teacher', component: LiveTeacherComponent },
    { path: '', component: HomeComponent },

    // { path: '**', redirectTo: '' },
];


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CourseListComponent,
    CourseDetailTeacherComponent,
    HomeComponent,
    CourseDetailStudentComponent,
    QuizCreateComponent,
    QuizStudentComponent,
    QuizTeacherComponent,
    LiveTeacherComponent,
    LiveStudentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ChartsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
      CourseService,
      QuizService,
      AuthService,
      AuthHttpService,
      LiveService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
