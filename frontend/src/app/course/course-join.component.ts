import { Component, HostListener } from '@angular/core';
import { Course } from './models';
import { OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from './course.service';
@Component({
  selector: 'courses',
  templateUrl: './course-join.component.html',
  providers: [],
})
export class CourseJoinComponent implements OnInit {
  title = "Available courses";
  courses: Course[];

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
      this.getCourses();
  }

  getCourses(): void {
      this.courseService.getAllCourses().then(courses => this.courses = courses);
  }

  joinCourse(course: Course) {
      this.courseService.joinCourse(course)
      .subscribe(result => {
          if (result === true) {
              this.router.navigate(['/courses']);
          } else {
          }
      });
  }
}
