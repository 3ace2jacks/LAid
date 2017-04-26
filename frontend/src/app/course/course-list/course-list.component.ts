import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../models';
import { CourseService } from '../course.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ModalDirective } from 'ng2-bootstrap/modal';

declare var jQuery:any;

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

    courses: Course[];
    available_courses: Course[];
    error: string;
    @ViewChild('createCourseModal') public createCourseModal:ModalDirective;

    createCourseForm = new FormGroup({
        code: new FormControl(),
        name: new FormControl(),
        year: new FormControl(),
        term: new FormControl(),
    });

    constructor(private courseService: CourseService, private router: Router) { }

    ngOnInit() {
        this.getOwnCourses();
        this.getAvailableCourses();
    }

    /*
    * Redirects the user to the correct component based on the field in the quiz. 
    */
    goToCourse(course: Course) {
        if (course.role == "INSTRUCTOR") {
            this.router.navigate(['course', course.id, 'teacher']);
        } else if (course.role == "STUDENT") {
            this.router.navigate(['course', course.id, 'student']);
        } else {
            this.error = "You don't have access to this course.";
        }
    }

    /**
     * The current user joins the course.
     * @param course - A Course instance that should be joined.
     */
    joinCourse(course: Course) {
        this.courseService.join(course.id)
        .then(() => {
            this.router.navigate(['course', course.id, 'student']);
        })
        .catch(error => this.error = error)
        
    }

    /**
     * Use the course serivice to retrieve the coureses the current user is a member of.
     */
    getOwnCourses() {
        this.courseService.getOwnCourses()
            .then(courses => this.courses = courses)
            .catch(error => this.error = error);
    }

    /**
     * Use the course serivice to retrieve the coureses the current user can join.
     */
    getAvailableCourses() {
        this.courseService.getAvailableCourses()
            .then(courses => this.available_courses = courses)
            .catch(error => this.error = error);
    }

    createCourse() {
        this.courseService.createCourse(this.createCourseForm.value as Course)
        .then(() =>{
            this.createCourseModal.hide();
            this.createCourseForm.reset();
            this.getOwnCourses();
        })
        .catch(error => {
            console.log(error);
        });
    }
}
