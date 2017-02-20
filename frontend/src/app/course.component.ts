import { Component, HostListener } from '@angular/core';
import { Course } from './models';
import { OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from './course.service';
@Component({
  selector: 'courses',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [],
})
export class CourseComponent implements OnInit {
  title = "Your courses";
  courses: Course[];
  selectedCourse: Course;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
      this.getCourses();
  }

  getCourses(): void {
      this.courseService.getCourses().then(courses => this.courses = courses);
  }

  goToDetail(course: Course): void {
      this.router.navigate(['/course', course.id]);
    }

  selectCourse(course: Course) {
      this.selectedCourse = course;
  }

  deselectCourse() {
      this.selectedCourse = null;
  }
}
