import { Injectable } from '@angular/core';
import { apiUrl } from '../local-settings';
import { Http, Headers } from '@angular/http';
import { User } from './models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

/**
 * This service handles authentication. The service is responsible for registering users, 
 * logging in, logging out, and preserveing the login state of the application.
 */
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

  /**
   * Determine if the user is signed in.
   * @returns true if a user is signed in, false othervise
   */
  public isLoggedIn(): boolean {
    return this.token != null;
  }

  /**
   * Get the username of the currently logged in user.
   * @returns The username, or null if the user is not signed in.
   */
  public getUsername(): string {
    return this.username;
  }

  /**
   * Get the private authentication token used for authentication 
   * with the backend.
   * @returns the token, or null if the user is not signed in. 
   */
  public getToken(): string {
    return this.token;
  }

  /**
   * Create the headers for requests with the correct content type.
   */
  private createHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  /**
   * Add authentication header to the headers.
   * @param headers 
   */
  private addAuthenticationHeader(headers): Headers {
    headers.append('Authorization', 'Token ' + this.getToken());
    return headers;
  }

  /**
   * Register a new user with the provided information.
   * @param username 
   * @param email 
   * @param password 
   */
  public register(username: string, email: string, password: string): Promise<void> {
    let headers = this.createHeaders();
    return this.http.post(apiUrl + "/auth/register/", JSON.stringify({ username: username, email: email, password: password }), { headers })
      .toPromise()
      .then(() => { })
      .catch(error => {
        let err = error.json();
        err = err.username && "Username: " + err.username[0] ||
          err.email && "Email:  " + err.email[0] ||
          err.password && "Password:  " + err.password[0] ||
          err.non_field_errors && err.non_field_errors[0];
        return Promise.reject(err);
      });

  }


  /**
   * Sign in with the provided credentials.
   * @param username 
   * @param password 
   */
  public login(username: string, password: string): Promise<void> {
    let headers = this.createHeaders();
    return this.http.post(apiUrl + "/auth/login/", JSON.stringify({ username: username, password: password }), { headers })
      .toPromise()
      .then(response => {
        this.token = response.json() && response.json().auth_token;
        this.username = username;
        localStorage.setItem('user', JSON.stringify({ username: this.username, token: this.token }));
      })
      .catch(error => {
        let err = error.json();
        console.log(err);
        err = err.username && "Username: " + err.username[0] ||
          err.password && "Password:  " + err.password[0] ||
          err.non_field_errors && err.non_field_errors[0];
        return Promise.reject(err);
      });
  }

  /**
   * Sign out of the system. Delete the local user token.
   */
  public logout(): Promise<void> {
    let headers = this.createHeaders();
    this.addAuthenticationHeader(headers);

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
