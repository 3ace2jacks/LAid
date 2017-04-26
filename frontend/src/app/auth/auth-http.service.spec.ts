/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthHttpService } from './auth-http.service';
import { HttpModule } from '@angular/http';
import { AuthService } from './auth.service';

describe('AuthHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthHttpService, AuthService],
      imports: [
        HttpModule,
      ]
    });
  });

  it('should ...', inject([AuthHttpService], (service: AuthHttpService) => {
    expect(service).toBeTruthy();
  }));
});
