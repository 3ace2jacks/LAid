/* tslint:disable:no-unused-variable */
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { QuizService } from './quiz.service';
import { AuthHttpService } from '../auth/auth-http.service';

describe('QuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ QuizService, 
      AuthHttpService,
      { provide: XHRBackend, useClass: MockBackend } ],
      
    });
  });


});
