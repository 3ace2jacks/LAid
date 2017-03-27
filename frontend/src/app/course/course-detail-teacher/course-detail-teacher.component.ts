import { Component, OnInit } from '@angular/core';
import { Course, Lecture } from '../models';
import { CourseService } from '../course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-course-detail-teacher',
    templateUrl: './course-detail-teacher.component.html',
    styleUrls: ['./course-detail-teacher.component.css']
})
export class CourseDetailTeacherComponent implements OnInit {

    course: Course;
    lectures: Lecture[];
    error: string;
    private sub: any;

    constructor(private courseService: CourseService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.getCourse();
        this.getLectures();
    }

    hasAccess() {
        return this.course && this.course.role == "INSTRUCTOR";
    }

    getCourse() {
        // Updates the current course if the url is changed
        this.sub = this.route.params.subscribe(params => {
            this.courseService.getCourse(+params['id'])
                .then(course => this.course = course)
                .catch(error => this.error = error);
        })
    }

    getLectures() {
        this.sub = this.route.params.subscribe(params => {
            this.courseService.getLectures(+params['id'])
                .then(lectures => this.lectures = lectures)
                .catch(error => this.error = error);
        })
    }
}
