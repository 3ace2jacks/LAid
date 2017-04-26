/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';

import { Routes } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ModalModule } from 'ng2-bootstrap/modal';

import { AuthHttpService } from '../../auth/auth-http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CourseListComponent } from './course-list.component';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';


describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let courses = [
    { id: 1, code: 'TDT4140', name: 'Software Engineering', year: 2017, term: 'spring', role: 'STUDENT' },
    { id: 2, code: 'TDT4100', name: 'Object Oriented Programming', year: 2017, term: 'spring', role: 'INSTRUCTOR' }
  ];

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  let courseService: CourseService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      imports: [
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        CourseService,
        AuthHttpService,
        AuthService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    courseService = fixture.debugElement.injector.get(CourseService);
    let own_spy = spyOn(courseService, 'getOwnCourses')
      .and.returnValue(Promise.resolve(courses));
    let available_spy = spyOn(courseService, 'getAvailableCourses')
      .and.returnValue(Promise.resolve(courses));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get own courses', fakeAsync(() => {
    component.getOwnCourses();
    tick();
    expect(component.courses).toBe(courses);
  }));

  it('should display own courses', fakeAsync(() => {
    component.getOwnCourses();
    tick();

    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('table'));
    let el = de.nativeElement;
    expect(el.textContent).toContain("Software Engineering", "Course title");
    expect(el.textContent).toContain("TDT4140", "Course code");
  }));

  it('should display buttons', () => {
    let de = fixture.debugElement.query(By.css('.createButton'));
    let el = de.nativeElement;
    expect(el.textContent).toContain("Create");

    de = fixture.debugElement.query(By.css('.joinButton'));
    el = de.nativeElement;
    expect(el.textContent).toContain("Join");
  });
});
