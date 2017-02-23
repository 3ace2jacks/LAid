import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../_services/index';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getCurrentUser(): User {
        if (localStorage.getItem('currentUser')) {
            return JSON.parse(localStorage.getItem('currentUser')).user as User;
        } else {
            return null;
        }
    }

    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get('/api/users', options)
            .map((response: Response) => response.json());
    }
}
