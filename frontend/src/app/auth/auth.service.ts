import { Injectable } from '@angular/core';
import { apiUrl } from '../local-settings';
import { Http, Headers } from '@angular/http';
import { User } from './models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private username: string;
  private token: string;

  constructor(private http: Http) {
    if (localStorage.getItem('user')) {
      let currentUser = JSON.parse(localStorage.getItem('user'));
      this.username = currentUser.username;
      this.token = currentUser.token;
    }
  }

  isLoggedIn() : boolean {
    return this.token != null;
  }

  getUsername() : string {
    return this.username;
  }

  getToken() : string {
    return this.token;
  }

  register(username: string, email: string, password: string) : Promise<void> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(apiUrl + "/auth/register/", JSON.stringify({username: username, email: email, password: password}), { headers })
    .toPromise()
    .then(() => {})
    .catch(error => { 
      let err = error.json();
      err = err.username && "Username: " + err.username[0] || 
            err.email && "Email:  " + err.email[0] || 
            err.password && "Password:  " + err.password[0] || 
            err.non_field_errors && err.non_field_errors[0];
      return Promise.reject(err);
    });
    
  }


  login(username: string, password: string): Promise<void> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(apiUrl + "/auth/login/", JSON.stringify({username: username, password: password}), { headers })
    .toPromise()
    .then(response => {
      this.token = response.json() && response.json().auth_token;
      this.username = username;
      localStorage.setItem('user', JSON.stringify({ username: this.username, token: this.token}));
    })
    .catch(error =>{
      let err = error.json();
      console.log(err);
      err = err.username && "Username: " + err.username[0] || 
            err.password && "Password:  " + err.password[0] || 
            err.non_field_errors && err.non_field_errors[0];
      return Promise.reject(err);
    });
  }

  logout(): Promise<void> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + this.getToken()); 
    return this.http.post(apiUrl + '/auth/logout/', {}, { headers: headers })
    .toPromise()
    .then(() => {
      localStorage.removeItem('user');
      this.token = null;
      this.username = null;
    })
    .catch(error => {
      localStorage.removeItem('user');
      this.token = null;
      this.username = null;
      return "An error occured when deleting token on server.";
    });
  }
}
