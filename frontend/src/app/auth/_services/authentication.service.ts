import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { AppComponent } from '../../app.component';
import { User } from '../_models/index';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
    public user: string;
    private Url = 'http://localhost:8000/api-token-auth/';

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers();
        headers.set('Content-Type', 'application/json');
        return this.http.post(this.Url, JSON.stringify({ username: username, password: password }), { headers })
            .map((response: Response) => {
                    // login succ   essful if there's a jwt token in the response
                let user = response.json().user as User;
                console.log(response);
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

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
        localStorage.removeItem('currentUser');
    }
}
