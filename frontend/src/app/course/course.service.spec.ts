/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { CourseService } from './course.service';

import { Http, Headers, BaseRequestOptions, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthService } from '../auth/auth.service';
import { AuthHttpService } from '../auth/auth-http.service';



describe('CourseService', () => {
  let backend: MockBackend;
  let service: CourseService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        CourseService,
        AuthHttpService,
        AuthService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }

      ],
    });
    const testBed = getTestBed();
    backend = testBed.get(MockBackend);
    service = TestBed.get(CourseService);
  }));

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);
      connection.mockRespond(response);
    });
  }

  let course = {
    id: 1,
    code: "TDT4140",
    name: "Software engineering",
    year: 2017,
    term: "spring",
    role: "INSTRUCTOR",
  };
  let courses = [course];
  
  let lecture = {
    id: 1,
    title: "Intro",
    course: 1,
    date: "2017-03-31",
    start_time: "14:15:00",
    end_time: "16:00:00",
    pre_quiz: 2,
    post_quiz: 4
  };
  let lectures = [lecture];

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('should get course', () => {
    setupConnections(backend, {
      body: course,
      status: 200,
      statusText: 'OK',
    });
    service.getCourse(1)
      .then(course_response => {
        expect(course_response.code).toBe(course.code);
        expect(course_response.name).toBe(course.name);
        expect(course_response.year).toBe(course.year);
        expect(course_response.term).toBe(course.term);
      });
  });

  it('should get own courses', () => {
    setupConnections(backend, {
      body: courses,
      status: 200,
      statusText: 'OK',
    });
    service.getOwnCourses()
      .then(course_response => {
        expect(course_response[0].code).toBe(course.code);
        expect(course_response[0].name).toBe(course.name);
        expect(course_response[0].year).toBe(course.year);
        expect(course_response[0].term).toBe(course.term);
      });
  });

  it('should get available courses', () => {
    setupConnections(backend, {
      body: courses,
      status: 200,
      statusText: 'OK',
    });
    service.getAvailableCourses()
      .then(course_response => {
        expect(course_response[0].code).toBe(course.code);
        expect(course_response[0].name).toBe(course.name);
        expect(course_response[0].year).toBe(course.year);
        expect(course_response[0].term).toBe(course.term);
      });
  });

  it('should get lecture', () => {
    setupConnections(backend, {
      body: lecture,
      status: 200,
      statusText: 'OK',
    });
    service.getLecture(1)
      .then(lecture_response => {
        expect(lecture_response.id).toBe(lecture.id);
        expect(lecture_response.title).toBe(lecture.title);
        expect(lecture_response.course).toBe(lecture.course);
        expect(lecture_response.date).toBe(lecture.date);
      })
  });

  it('should get lectures', () => {
    setupConnections(backend, {
      body: lectures,
      status: 200,
      statusText: 'OK',
    });
    service.getLecture(1)
      .then(lecture_response => {
        expect(lecture_response[0].id).toBe(lecture.id);
        expect(lecture_response[0].title).toBe(lecture.title);
        expect(lecture_response[0].course).toBe(lecture.course);
        expect(lecture_response[0].date).toBe(lecture.date);
      })
  });

  it('should create course', () => {
    setupConnections(backend, {
      body: course,
      status: 200,
      statusText: 'OK',
    });
    service.createCourse(course)
      .then(course_response => {
        expect(course_response).toEqual(course);
      })
  });

  it('should create lecture', () => {
    setupConnections(backend, {
      body: lecture,
      status: 200,
      statusText: 'OK',
    });
    service.createLecture(lecture, 1)
      .then(lecture_response => {
        expect(lecture_response).toEqual(lecture);
      })
  });
});
