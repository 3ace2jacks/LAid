/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CourseService } from '../../course/course.service';
import { AuthService } from '../../auth/auth.service';
import { AuthHttpService } from '../../auth/auth-http.service';
import { LiveService } from '../live.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ng2-bootstrap/modal';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { LiveTeacherComponent } from './live-teacher.component';

describe('LiveTeacherComponent', () => {
  let component: LiveTeacherComponent;
  let fixture: ComponentFixture<LiveTeacherComponent>;
  let courseService;

  let course = { id: 1, code: 'TDT4140', name: 'Software Engineering', year: 2017, term: 'spring', role: 'INSTRUCTOR' };
  let lecture = { id: 1, course: 1, title: "Introduction", date: "2017-03-31", start_time: "14:15:00", end_time: "16:00:00", pre_quiz: 12, post_quiz: 13 };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LiveTeacherComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpModule,
        ChartsModule,
        ModalModule
      ],
      providers: [
        LiveService,
        CourseService,
        AuthHttpService,
        AuthService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTeacherComponent);
    component = fixture.componentInstance;
    courseService = fixture.debugElement.injector.get(CourseService);

    let get_course_spy = spyOn(courseService, 'getCourse')
      .and.returnValue(Promise.resolve(course));
    let get_lecture_spy = spyOn(courseService, 'getLecture')
      .and.returnValue(Promise.resolve(lecture));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
