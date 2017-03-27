import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import{ AuthService } from './auth.service';
import {apiUrl} from '../local-settings';
@Injectable()
export class AuthHttpService {

  constructor(private http: Http, private authService:AuthService) {}


  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Token ' + this.authService.getToken()); 
    headers.append('Content-Type', 'application/json');
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(apiUrl + url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(apiUrl + url, data, {
      headers: headers
    });
  }

}
