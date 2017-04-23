/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CourseService } from './course.service';

import { HttpModule } from '@angular/http';

import { AuthService } from '../auth/auth.service';
import { AuthHttpService } from '../auth/auth-http.service';

describe('CourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        CourseService,
        AuthHttpService,
        AuthService,
        
        ],
    });
  });

  it('should ...', inject([CourseService], (service: CourseService) => {
    expect(service).toBeTruthy();
  }));
});
