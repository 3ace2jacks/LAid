/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';



import { AuthService } from '../../auth/auth.service';
import { AuthHttpService } from '../../auth/auth-http.service';
import { CourseService } from '../course.service';
import { ModalModule } from 'ng2-bootstrap/modal';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseDetailTeacherComponent } from './course-detail-teacher.component';
import { APP_BASE_HREF } from '@angular/common';


const appRoutes: Routes = [
  { path: '', component: CourseDetailTeacherComponent },
];


describe('CourseDetailTeacherComponent', () => {
  let component: CourseDetailTeacherComponent;
  let fixture: ComponentFixture<CourseDetailTeacherComponent>;

  let courseService: CourseService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let course = { id: 1, code: 'TDT4140', name: 'Software Engineering', year: 2017, term: 'spring', role: 'STUDENT' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDetailTeacherComponent],
      imports: [
        HttpModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ModalModule.forRoot(),
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
    fixture = TestBed.createComponent(CourseDetailTeacherComponent);
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