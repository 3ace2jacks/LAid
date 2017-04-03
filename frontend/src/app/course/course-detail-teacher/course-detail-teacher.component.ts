import { Component, OnInit, ViewChild } from '@angular/core';
import { Course, Lecture } from '../models';
import { CourseService } from '../course.service';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';

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


    @ViewChild('createLectureModal') public createLectureModal:ModalDirective;
    createLectureForm = new FormGroup({
        title: new FormControl(),
        date: new FormControl(),
        start_time: new FormControl(),
        end_time: new FormControl(),
    });

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

    createLecture() {
        this.courseService.createLecture(this.createLectureForm.value as Lecture, this.course.id)
            .then(() => {
                this.createLectureModal.hide();
                this.createLectureForm.reset();
                this.getLectures();
            })
            .catch(error => { });
    }
}
