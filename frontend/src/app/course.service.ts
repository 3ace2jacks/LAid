import { Injectable } from '@angular/core';
import { Course, Lecture } from './models';
import { Headers, Http, Response} from '@angular/http';
import { AuthenticationService } from './auth/_services';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class CourseService {

    private courseUrl = 'http://localhost:8000/courses/';

    constructor(private http: Http, private authenticationService:AuthenticationService) {
    }

    joinCourse(course:Course) : Observable<boolean> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + this.authenticationService.getToken());
        return this.http.post(this.courseUrl + course.id + "/join/", JSON.stringify({}), { headers }).
        map((response: Response) => {
            return true;
        })
    }

    getAllCourses(): Promise<Course[]> {
        let headers = new Headers({'Authorization': 'JWT ' + this.authenticationService.getToken()});
        return this.http.get(this.courseUrl + 'all' + '.json', {headers} ).toPromise().then(response => response.json() as Course[]).catch(this.handleError);
    }

    getCourses(): Promise<Course[]> {
        let headers = new Headers({'Authorization': 'JWT ' + this.authenticationService.getToken()});
        return this.http.get(this.courseUrl + '.json', {headers} ).toPromise().then(response => response.json() as Course[]).catch(this.handleError);
    }

    getCourse(id:number): Promise<Course> {
        let headers = new Headers({'Authorization': 'JWT ' + this.authenticationService.getToken()});
        return this.http.get(this.courseUrl + id + '.json', {headers}).toPromise().then(response => response.json() as Course).catch(this.handleError);
    }

    getLectures(id:number): Promise<Lecture[]> {
        let headers = new Headers({'Authorization': 'JWT ' + this.authenticationService.getToken()});
        return this.http.get(this.courseUrl + id + '/lectures' + '.json', {headers})
        .toPromise().then(response => response.json() as Lecture[]).catch(this.handleError);
    }

    addCourse(code: string, name: string, year: number, term: string) : Observable<boolean> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + this.authenticationService.getToken());
        return this.http.post(this.courseUrl, JSON.stringify({code: code, name: name, year: year, term: term}), { headers }).
        map((response: Response) => {
            return true;
        })
    }

    private handleError(error: any): Promise<any> {
        console.error('qwertyEn error occured: ', error);
        return Promise.reject(error.message || error);
    }

    getTopCourses(number:number): Promise<Course[]> {
        return this.getCourses().then(courses => courses.slice(0, number));
    }
}
