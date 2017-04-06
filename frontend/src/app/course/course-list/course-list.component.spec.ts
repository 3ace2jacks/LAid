/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ModalModule } from 'ng2-bootstrap/modal';

import { AuthHttpService } from '../../auth/auth-http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CourseListComponent } from './course-list.component';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: CourseListComponent },

  // { path: '**', redirectTo: '' },
];

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let courseServiceSpy;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  let courseService:CourseService;
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
    fixture.detectChanges();
    courseService = fixture.debugElement.injector.get(CourseService);
    courseServiceSpy = spyOn(courseService, 'getOwnCourses').and.returnValue(Promise.resolve())
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
