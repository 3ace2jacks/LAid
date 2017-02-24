import { Component, HostListener } from '@angular/core';
import { Course } from './models';
import { OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from './course.service';
import { AuthenticationService } from './auth/_services';
@Component({
  selector: 'courses',
  templateUrl: './new-course.component.html',
  providers: [],
})
export class NewCourseComponent  {

    model: any = {};
    error = '';

  constructor(private courseService: CourseService, private router: Router) {}

  create() {
      this.courseService.addCourse(this.model.code, this.model.name, this.model.year, this.model.term)
          
  }

}
