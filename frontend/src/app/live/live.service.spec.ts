/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LiveService } from './live.service';

import { HttpModule } from '@angular/http';

import { AuthService } from '../auth/auth.service';
import { AuthHttpService } from '../auth/auth-http.service';

describe('LiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
            imports: [
        HttpModule,
      ],
      providers: [
        LiveService,
        AuthHttpService,
        AuthService,
        ],
    });
  });

  it('should ...', inject([LiveService], (service: LiveService) => {
    expect(service).toBeTruthy();
  }));
});
