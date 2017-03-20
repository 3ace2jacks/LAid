import { Component, OnInit } from '@angular/core';

import { Course } from '../course/models';
import { CourseService } from '../course/course.service';

@Component({
    //moduleId: module.id,
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    courses: Course[] = [];

    constructor(private courseService: CourseService) {
    }

    ngOnInit(): void {
        this.courseService.getCourses().then(courses => this.courses = courses);
    }
}