/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CourseDetailTeacherComponent } from './course-detail-teacher.component';

describe('CourseDetailTeacherComponent', () => {
  let component: CourseDetailTeacherComponent;
  let fixture: ComponentFixture<CourseDetailTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDetailTeacherComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
