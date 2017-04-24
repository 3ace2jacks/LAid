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
  let course = { id: 1, code: 'TDT4140', name: 'Software Engineering', year: 2017, term: 'spring', role: 'INSTRUCTOR' };
  let course_student = { id: 1, code: 'TDT4140', name: 'Software Engineering', year: 2017, term: 'spring', role: 'STUDENT' };
  let lectures = [
    { id: 1, course: 1, title: "Introduction", date: "2017-03-31", start_time: "14:15:00", end_time: "16:00:00", pre_quiz: 12, post_quiz: 13 },
  ]

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

    let get_course_spy = spyOn(courseService, 'getCourse')
      .and.returnValue(Promise.resolve(course));
    let get_lectures_spy = spyOn(courseService, 'getLectures')
      .and.returnValue(Promise.resolve(lectures));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get course', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.course).toBe(course);
  }));

  it('should get lectures', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.lectures).toBe(lectures);
  }));

  it('should display lectures', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('table'));
    let el = de.nativeElement;
    expect(el.textContent).toContain("Introduction", "Lecture title");
  }));

  it('should display new-lecture button', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.btn'));
    let el = de.nativeElement;
    expect(el.textContent).toContain("New", "Lecture title");
  }));

  it('should display course title', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('h1'));
    let el = de.nativeElement;
    expect(el.textContent).toContain("Software Engineering", "Lecture title");
  }));

  it('should deny access', () => {
    component.course = course;
    expect(component.hasAccess()).toBeTruthy();
    component.course = course_student;
    expect(component.hasAccess()).toBeFalsy();
    component.course = null;
    expect(component.hasAccess()).toBeFalsy();
  });
});