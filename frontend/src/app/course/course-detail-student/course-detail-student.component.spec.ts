/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';



import { AuthService } from '../../auth/auth.service';
import { AuthHttpService } from '../../auth/auth-http.service';
import { CourseService } from '../course.service';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { CourseDetailStudentComponent } from './course-detail-student.component';

const appRoutes: Routes = [
  { path: '', component: CourseDetailStudentComponent },
];


describe('CourseDetailStudentComponent', () => {
  let component: CourseDetailStudentComponent;
  let fixture: ComponentFixture<CourseDetailStudentComponent>;
  let courseService: CourseService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let course = { id: 1, code: 'TDT4140', name: 'Software Engineering', year: 2017, term: 'spring', role: 'STUDENT' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDetailStudentComponent],
      imports: [
        HttpModule,
        ReactiveFormsModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes(appRoutes),
      ],
      providers: [
        CourseService,
        AuthHttpService,
        AuthService,
        { provide: APP_BASE_HREF, useValue: '/' },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailStudentComponent);
    component = fixture.componentInstance;

    courseService = fixture.debugElement.injector.get(CourseService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get course', fakeAsync(() => {
    let spy = spyOn(courseService, 'getCourse')
      .and.returnValue(Promise.resolve(course));
    component.getCourse();
    tick();
    expect(component.course).toBe(course);
  }));
});
