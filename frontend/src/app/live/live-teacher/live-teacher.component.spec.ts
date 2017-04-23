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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
