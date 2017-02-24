import { Component, HostListener } from '@angular/core';
import { Course } from './models';
import { OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from './course.service';
import { AuthenticationService } from '../auth/_services';


@Component({
  selector: 'courses',
  templateUrl: './course-create.component.html',
  providers: [],
})
export class CourseCreateComponent  {

    model: any = {};
    error :string = "";

    public terms = [
        { value: 'fall', display: 'Fall' },
        { value: 'spring', display: 'Spring' }
    ];

  constructor(private courseService: CourseService, private router: Router) {}

  isValidModel() : boolean {
      if (this.model.term != "fall" && this.model.term != "spring") {
          this.error = "Term must be either \"fall\" or \"spring\"" + this.model.term;
          return false;
      }
      return true;
  }

  create() {
      if (!this.isValidModel()) {
          return;
      }
      console.log(this.model.term);
      this.courseService.addCourse(this.model.code, this.model.name, this.model.year, this.model.term)
      .then(() => this.router.navigate(['courses']))
      .catch(error => this.error = "Something went wrong.");
  }
}
