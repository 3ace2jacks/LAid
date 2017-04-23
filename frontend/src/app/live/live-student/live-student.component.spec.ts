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

import { LiveStudentComponent } from './live-student.component';

describe('LiveStudentComponent', () => {
  let component: LiveStudentComponent;
  let fixture: ComponentFixture<LiveStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveStudentComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpModule,
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
    fixture = TestBed.createComponent(LiveStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});