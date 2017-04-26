/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { LiveService } from './live.service';

import { Http, Headers, BaseRequestOptions, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthService } from '../auth/auth.service';
import { AuthHttpService } from '../auth/auth-http.service';

describe('LiveService', () => {

  let backend: MockBackend;
  let service: LiveService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        LiveService,
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
    service = TestBed.get(LiveService);
  }));

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);
      connection.mockRespond(response);
    });
  }


  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('should evaluate', () => {
    let flow = {
      user: 14,
      time_stamp: "2017-04-26T06:08:01.478166Z",
      flow: "fast"
    };
    setupConnections(backend, {
      body: flow,
      status: 200,
      statusText: 'OK',
    });
    service.evaluate("fast", 1)
      .then((response) => {
        expect(response).toEqual(flow);
      })
  });

  it('should get evaluation count', () => {
    let flow_count = {
      "to_slow": 20,
      "to_fast": 2
    };
    setupConnections(backend, {
      body: flow_count,
      status: 200,
      statusText: 'OK',
    });
    service.getEvaluationCount(1, 2)
      .then(count => {
        expect(count).toEqual(flow_count);
      })
  });

  it('should get questions', () => {
    let questions = [
      {
        id: 55,
        user: 17,
        time_stamp: "2017-04-24T10:20:37.288518Z",
        question: "When is the exam?",
        upvotes: 1,
        downvotes: 0,
        has_voted: false,
        answered: false
      }
    ];
    setupConnections(backend, {
      body: questions,
      status: 200,
      statusText: 'OK',
    });
    service.getQuestions(1)
    .then(questions_response => {
      expect(questions_response).toEqual(questions);
    })
  });
});
