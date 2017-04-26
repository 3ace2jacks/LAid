/* tslint:disable:no-unused-variable */
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { QuizService } from './quiz.service';

import { AuthService } from '../auth/auth.service';
import { AuthHttpService } from '../auth/auth-http.service';



describe('QuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ QuizService,AuthService, 
      AuthHttpService,
      { provide: XHRBackend, useClass: MockBackend } ],
      
    });
  });

  // it('should ...', inject([QuizService, MockBackend], (service, backend) => {
  //   expect(service).toBeTruthy();
  // }));

});
