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

import { QuizStudentComponent } from './quiz-student.component';

describe('QuizStudentComponent', () => {
  let component: QuizStudentComponent;
  let fixture: ComponentFixture<QuizStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizStudentComponent],
      imports: [
        HttpModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(QuizStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
