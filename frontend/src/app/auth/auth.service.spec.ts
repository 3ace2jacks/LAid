/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { Http, Headers, BaseRequestOptions, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { AuthService } from './auth.service';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('AuthService', () => {
  let backend: MockBackend;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
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
      ]
    });

    const testBed = getTestBed();
    backend = testBed.get(MockBackend);
    service = TestBed.get(AuthService);
    localStorage.removeItem('user');
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

  it('should return the username', () => {
    expect(service.getUsername()).toBe(undefined);
    service.username = "User";
    expect(service.getUsername()).toBe("User");
  });

  it('should get logged in status', () => {
    expect(service.isLoggedIn()).toBe(false);
    service.token = "some token";
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should get token', () => {
    let token = "some_token";
    expect(service.getToken()).toBe(undefined);
    service.token = token;
    expect(service.getToken()).toBe(token);
  });

  it('should create headers', () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    expect(service.createHeaders()).toEqual(headers);
  });

  it('should login', async(() => {
    let username = "usr";
    let token = "jd8kda9w8dk"
    setupConnections(backend, {
      body: {
        auth_token: token
      },
      status: 200,
      statusText: 'OK',
    });

    service.login(username, "passwd").then((response) => {
      expect(service.getUsername()).toBe(username);
      expect(service.getToken()).toBe(token);
      let currentUser = JSON.parse(localStorage.getItem('user'));
      expect(currentUser.username).toBe(username);
      expect(currentUser.token).toBe(token);
    })
      .catch(error => {
        fail("Should not throw exception.");
      })
  }));

  it('should logout', async(() => {
    service.username = "something";
    service.token = "something";
      setupConnections(backend, {
      body: {
      },
      status: 200,
      statusText: 'OK',
    });
    service.logout()
    .then(() => {
      expect(service.getUsername()).toBeNull();
      expect(service.getToken()).toBeNull();
    })
    .catch(error => {
      fail("Should not throw exception")
    })
  }));
});
