import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { AppComponent } from '../../app.component';
import { User } from '../_models/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
    private token: string;
    private user: User;
    private loginUrl = 'http://localhost:8000/api-token-auth/';
    private registerUrl = 'http://localhost:8000/user/register/';

    constructor(private http: Http) {
        // set token if saved in local storage
        if (localStorage.getItem('currentUser')) {
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.token = currentUser.token;
            this.user = currentUser.user;
        }
    }

    getToken():string {
        return this.token;
    }

    getCurrentUser(): User {
        return this.user;
    }

    loggedIn(): boolean {
        return this.user != null;
    }

    register(username: string, password: string, email: string, first_name: string, last_name:string) : Observable<boolean> {
        let headers = new Headers();
        headers.set('Content-Type', 'application/json');
        return this.http.post(this.registerUrl, JSON.stringify({username, password, email, first_name, last_name}), { headers }).
        map((response: Response) => {
            return true;
        })
    }

    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers();
        headers.set('Content-Type', 'application/json');
        return this.http.post(this.loginUrl, JSON.stringify({ username: username, password: password }), { headers })
            .map((response: Response) => {
                    // login succ   essful if there's a jwt token in the response

                let token = response.json() && response.json().token;
                if (token) {
                    let user = response.json().user as User;
                    // set token property
                    this.token = token;
                    this.user = user;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ user: user, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.user = null;
        localStorage.removeItem('currentUser');
    }
}
