/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseService } from '../../course/course.service';
import { AlertModule } from 'ng2-bootstrap';
import { QuizService } from '../quiz.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { AuthHttpService } from '../../auth/auth-http.service';


import { QuizCreateComponent } from './quiz-create.component';

describe('QuizCreateComponent', () => {
  let component: QuizCreateComponent;
  let fixture: ComponentFixture<QuizCreateComponent>;
  let courseService;
  let quizService;
    let course = { id: 1, code: 'TDT4140', name: 'Software Engineering', year: 2017, term: 'spring', role: 'INSTRUCTOR' };
  let course_student = { id: 1, code: 'TDT4140', name: 'Software Engineering', year: 2017, term: 'spring', role: 'STUDENT' };
  let lecture = { id: 1, course: 1, title: "Introduction", date: "2017-03-31", start_time: "14:15:00", end_time: "16:00:00", pre_quiz: 12, post_quiz: 13 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizCreateComponent],
      imports: [
        HttpModule,
        RouterTestingModule,
        AlertModule.forRoot(),
        ReactiveFormsModule,
      ],
      providers: [
        QuizService,
        CourseService,
        AuthService,
        AuthHttpService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCreateComponent);
    component = fixture.componentInstance;
    courseService = fixture.debugElement.injector.get(CourseService);
    quizService = fixture.debugElement.injector.get(QuizService);

    let get_course_spy = spyOn(courseService, 'getCourse')
      .and.returnValue(Promise.resolve(course));
    let get_lectures_spy = spyOn(courseService, 'getLecture')
      .and.returnValue(Promise.resolve(lecture));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get lecture and course automatically', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.lecture).toBe(lecture);
    expect(component.course).toBe(course);
  }));

  it('should restrict access', () => {
    component.course = course;
    expect(component.hasAccess()).toBeTruthy();
    component.course = course_student;
    expect(component.hasAccess()).toBeFalsy();
    component.course = null;
    expect(component.hasAccess()).toBeFalsy();
  });
});
