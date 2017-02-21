import { Injectable } from '@angular/core';
import { Course, Lecture } from './models';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class CourseService {

    private courseUrl = 'http://localhost:8000/courses/';

    constructor(private http: Http) {
    }

    getCourses(): Promise<Course[]> {
        return this.http.get(this.courseUrl + '.json').toPromise().then(response => response.json() as Course[]).catch(this.handleError);
    }

    getCourse(id:number): Promise<Course> {
        return this.http.get(this.courseUrl + id + '.json').toPromise().then(response => response.json() as Course).catch(this.handleError);
    }

    getLectures(id:number): Promise<Lecture[]> {
        return this.http.get(this.courseUrl + id + '/lectures' + '.json')
        .toPromise().then(response => response.json() as Lecture[]).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('qwertyEn error occured: ', error);
        return Promise.reject(error.message || error);
    }

    getTopCourses(number:number): Promise<Course[]> {
        return this.getCourses().then(courses => courses.slice(0, number));
    }
}
