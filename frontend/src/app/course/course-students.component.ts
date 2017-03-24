import { Component, HostListener } from '@angular/core';
import { OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from './course.service';
import { User } from '/Users';

@Component({
  selector: 'course-students',
  templateUrl: './course-students.component.html',
})
export class CourseStudents implements OnInit {
	CourseStudents: User[];

 ngOnInit(): void {
      this.getCourseStudents();
  }

  getCourseStudents(): void {

  }

}