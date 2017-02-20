import { Component, Input, OnInit} from '@angular/core';
import { Course, Lecture } from './models';

import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { CourseService } from './course.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'course-detail',
    templateUrl: './course-detail.component.html',
})
export class CourseDetailComponent {

    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
      .switchMap((params: Params) => this.courseService.getCourse(+params['id']))
      .subscribe(course => this.course = course);
      this.route.params
    .switchMap((params: Params) => this.courseService.getLectures(+params['id']))
    .subscribe(lectures => this.lectures = lectures);
    }

    goBack(): void {
        this.location.back();
    }

    @Input()
    course: Course;
    lectures: Lecture[];
}
