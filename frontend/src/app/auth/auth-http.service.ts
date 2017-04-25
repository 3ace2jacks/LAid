import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { apiUrl } from '../local-settings';

/**
* This class is a wrapper for the Angular Http module. This automatically
* appends the authentication headers to the requests.
*/
@Injectable()
export class AuthHttpService {

  constructor(private http: Http, private authService: AuthService) { }

  /**
   * Add authentication header and content-type header for the provided header.
   * Also uses a pre-defined API-url. 
   * @param {Headers} headers - The headers to add authentication to.
   */
  addAuthorizationHeader(headers: Headers) {
    // Get the token from the authentication service.
    headers.append('Authorization', 'Token ' + this.authService.getToken());
    headers.append('Content-Type', 'application/json');
  }

  /**
   * GET a resource from the provided path. 
   * @param {string} path - The internal API URL/path, e.g. "/courses/"
   */
  get(path) {
    let headers = new Headers();
    this.addAuthorizationHeader(headers);
    return this.http.get(apiUrl + path, {
      headers: headers
    });
  }


  /**
   * POST data to the provided path.
   * @param {string} path - The internal API URL/path, e.g. "/courses/"
   * @param {any} data - The data to be sent in the request.
   */
  post(path, data) {
    let headers = new Headers();
    this.addAuthorizationHeader(headers);
    return this.http.post(apiUrl + path, data, {
      headers: headers
    });
  }
}