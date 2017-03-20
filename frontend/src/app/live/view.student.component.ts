import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/_services';
import { apiUrl } from '../local-settings';
import { ViewService } from './view.service';
import { ActivatedRoute, Params }   from '@angular/router';
import { Lecture } from '../course/models';
import { CourseService } from '../course/course.service';

@Component({
    moduleId: module.id,
    templateUrl: 'view.student.component.html'
})


export class StudentView  implements OnInit{

	  constructor(private viewService: ViewService,
              private route: ActivatedRoute,
              private courseService: CourseService){}

    private sub:any;
    lecture: Lecture;

	  error: string = "";
    ngOnInit(): void {
      this.getLecture();
    }

  	slow(event){
  		this.viewService.evaluate("slow", this.lecture.id)
  		.then()
      	.catch(error => this.error="Something went wrong.");
  	}
  	fast(event){
  		this.viewService.evaluate("fast", this.lecture.id)
  		.then()
      	.catch(error => this.error="Something went wrong.");
  	}
    getLecture(){
      this.sub = this.route.params.subscribe(params =>{
        this.courseService.getLecture(+params['id'])
        .then(lecture => this.lecture=lecture)
        .catch(error => {this.error=error;
           console.log(error+ "hello world")});
      })
    }
}