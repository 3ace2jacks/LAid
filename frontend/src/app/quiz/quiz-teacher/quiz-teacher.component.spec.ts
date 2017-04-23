/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseService } from '../../course/course.service';
import { QuizService } from '../quiz.service';
import { AuthService } from '../../auth/auth.service';
import { AuthHttpService } from '../../auth/auth-http.service';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { QuizTeacherComponent } from './quiz-teacher.component';

describe('QuizTeacherComponent', () => {
  let component: QuizTeacherComponent;
  let fixture: ComponentFixture<QuizTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizTeacherComponent],
      imports: [
        HttpModule,
        RouterTestingModule,
        ChartsModule,
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
    fixture = TestBed.createComponent(QuizTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
