import { Component, OnInit } from '@angular/core';
import { Course, Lecture } from '../models';
import { CourseService } from '../course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-course-detail-student',
    templateUrl: './course-detail-student.component.html',
    styleUrls: ['./course-detail-student.component.css']
})
export class CourseDetailStudentComponent implements OnInit {

    course: Course;
    lectures: Lecture[];
    error: string;

    // To subsctibe to the url to listen to change in id
    private sub: any;

    constructor(private courseService: CourseService, private route: ActivatedRoute) { }

    /**
     * Called when the component is initiliaized. 
     */
    ngOnInit() {
        this.getCourse();
        this.getLectures();
    }

    /**
     * Returns true if the current user has access to this page.
     */
    hasAccess() {
        return this.course && this.course.role == "STUDENT";
    }


    /**
     * Retrieve the course instance from the course service
     */
    getCourse() {
        // Updates the current course if the url is changed
        this.sub = this.route.params.subscribe(params => {
            this.courseService.getCourse(+params['id'])
                .then(course => this.course = course)
                .catch(error => this.error = error);
        })
    }

    /**
     * Retrieve the lecture instances from the course service. 
     */
    getLectures() {
        this.sub = this.route.params.subscribe(params => {
            this.courseService.getLectures(+params['id'])
                .then(lectures => this.lectures = lectures)
                .catch(error => this.error = error);
        })
    }
}
