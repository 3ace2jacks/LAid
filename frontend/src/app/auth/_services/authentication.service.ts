  import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { AppComponent } from '../../app.component';
import { User } from '../_models/index';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { apiUrl } from '../../local-settings';

@Injectable()
export class AuthenticationService {
  private token: string;
  private user: User;
  private loginUrl = apiUrl + '/api-token-auth/';
  private registerUrl = apiUrl + '/user/register/';
  private headers = new Headers();

  constructor(private http: Http) {
    // set the login state if the data is already in localStorage
    if (localStorage.getItem('currentUser')) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser.token;
      this.user = currentUser.user;
    }
    this.headers.set('Content-Type', 'application/json');
  }

  // return the JWT-token used for sending authenticated requests to the server
  getToken(): string {
    return this.token;
  }

  // return the currently logged in user
  // return null if the user is not logged in
  getCurrentUser(): User {
    return this.user;
  }

  // returns true if the user is authenticated
  loggedIn(): boolean {
    // the user is authenticated if there is a user object stored in this service
    return this.user != null;
  }

  // will handle any error in the requests to the server
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  // register a new user with the given parameters
  register(username: string, password: string, email: string, first_name: string, last_name: string): Promise<void> {
    return this.http.post(this.registerUrl, JSON.stringify({ username, password, email, first_name, last_name }), { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
      
  }


  // log in the user, and set the login state if successful
  login(username: string, password: string): Promise<void> {
    return this.http.post(this.loginUrl, JSON.stringify({ username: username, password: password }), { headers: this.headers })
      .toPromise()
      .then((response: Response) => {
        let token = response.json() && response.json().token;
        let user = response.json().user as User;

        // set token property
        this.token = token;
        this.user = user;

        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify({ user: user, token: token }));
      })
      .catch(this.handleError);

  }

  // set the state as not authenticated
  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    this.user = null;
    localStorage.removeItem('currentUser');
  }
}
