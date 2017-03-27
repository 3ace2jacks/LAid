import { Injectable } from '@angular/core';
import { Course, Lecture } from './models';
import { AuthHttpService } from '../auth/auth-http.service';


@Injectable()
export class CourseService {

    constructor(private authHttp: AuthHttpService) { }

    getOwnCourses(): Promise<Course[]> {
        return this.authHttp.get('/courses/member/')
            .toPromise()
            .then(response => response.json() as Course[])
            .catch(error => error.json());
    }

    getAvailableCourses(): Promise<Course[]> {
        return this.authHttp.get('/courses/available/')
            .toPromise()
            .then(response => response.json() as Course[])
            .catch(error => error.json());
    }

    getCourse(id: number): Promise<Course> {
        return this.authHttp.get('/courses/' + id + '/')
            .toPromise()
            .then(response => response.json() as Course)
            .catch(error => error.json());
    }

    join(id: number): Promise<void> {
        return this.authHttp.post('/courses/' + id + '/join/', {})
            .toPromise()
            .then(response => { })
            .catch(error => error.json());
    }

    getLectures(courseID: number): Promise<Lecture[]> {
        return this.authHttp.get('/courses/' + courseID + '/lectures/')
            .toPromise()
            .then(response => response.json() as Lecture[])
            .catch(error => error.json());
    }

    getLecture(id: number): Promise<Lecture> {
        return this.authHttp.get('/lectures/' + id + '/')
            .toPromise()
            .then(response => response.json() as Lecture)
            .catch(error => error.json());
    }

    createCourse(course: Course) {
        
    }
}
