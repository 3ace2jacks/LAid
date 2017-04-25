import { Injectable } from '@angular/core';
import { Course, Lecture } from './models';
import { AuthHttpService } from '../auth/auth-http.service';

/**
 * Provides communication with course-related content.
 */
@Injectable()
export class CourseService {

    constructor(private authHttp: AuthHttpService) { }

    /**
     * Retrieve the courses that the current user is a member of.
     */
    getOwnCourses(): Promise<Course[]> {
        return this.authHttp.get('/courses/member/')
            .toPromise()
            .then(response => response.json() as Course[])
            .catch(error => error.json());
    }

    /**
     * Retrieve the courses that the current user is able to join.
     */
    getAvailableCourses(): Promise<Course[]> {
        return this.authHttp.get('/courses/available/')
            .toPromise()
            .then(response => response.json() as Course[])
            .catch(error => error.json());
    }

    /**
     * Get the course with the given id
     * @param id - The id of the course (not the course code)
     * @returns A Course model instance
     */
    getCourse(id: number): Promise<Course> {
        return this.authHttp.get('/courses/' + id + '/')
            .toPromise()
            .then(response => response.json() as Course)
            .catch(error => error.json());
    }

    /**
     * Adds the current user as a student in the course with the proided id.
     * @param id - The id of the course
     */
    join(id: number): Promise<void> {
        return this.authHttp.post('/courses/' + id + '/join/', {})
            .toPromise()
            .then(response => { })
            .catch(error => error.json());
    }

    /**
     * Retrive all the lectures that are part of the course with the given id.
     * @param courseID - The course ID.
     * @returns An {array} of Lecture instances.
     */
    getLectures(courseID: number): Promise<Lecture[]> {
        return this.authHttp.get('/courses/' + courseID + '/lectures/')
            .toPromise()
            .then(response => response.json() as Lecture[])
            .catch(error => error.json());
    }

    /**
     * Retrieve the lecture with the given id
     * @param id - The lecture id
     * @returns An Lecture instance
     */
    getLecture(id: number): Promise<Lecture> {
        return this.authHttp.get('/lectures/' + id + '/')
            .toPromise()
            .then(response => response.json() as Lecture)
            .catch(error => error.json());
    }

    /**
     * Creates a new course.
     * @param course - A Course instance that will be saved to the database in the backend.
     */
    createCourse(course: Course): Promise<void> {
        return this.authHttp.post('/courses/member/', JSON.stringify(course))
            .toPromise()
            .then(response => response.json())
            .catch(error => {return Promise.reject(error.json())});
    }

    /**
     * Creates a new lecture.
     * @param lecture - A Lecture instance that will be saved to the database in the backend.
     * @param courseID - the id of the course the lecture should be added to.
     */
    createLecture(lecture: Lecture, courseID: number): Promise<void> {
        return this.authHttp.post('/courses/' + courseID + '/lectures/', JSON.stringify(lecture))
            .toPromise()
            .then(response => response.json())
            .catch(error => {return Promise.reject(error.json())});
    }
}