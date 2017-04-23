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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
