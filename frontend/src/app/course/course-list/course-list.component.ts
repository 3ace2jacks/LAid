import { Component, OnInit } from '@angular/core';
import { Course } from '../models';
import { CourseService } from '../course.service';

import { Router } from '@angular/router';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

    courses: Course[];
    available_courses: Course[];
    error: string;

    constructor(private courseService: CourseService, private router: Router) { }

    ngOnInit() {
        this.courseService.getOwnCourses()
            .then(courses => this.courses = courses)
            .catch(error => this.error = error);

        this.courseService.getAvailableCourses()
            .then(courses => this.available_courses = courses)
            .catch(error => this.error = error);
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

    joinCourse(course: Course) {
        this.courseService.join(course.id)
        .then(() => {
            location.reload();
        })
        .catch(error => this.error = error)
        
    }

    createCourse() {
        this.courseService.createCourse({ id: 9, role: "staff", code: "Code", name: "Naem", year: 2017, term: "spring" })
    }
}
