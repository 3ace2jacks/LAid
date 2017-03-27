import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course/course.service';
import { Lecture } from '../../course/models';
import { LiveService } from '../live.service';
import { ActivatedRoute, Params }   from '@angular/router';

@Component({
  selector: 'app-live-student',
  templateUrl: './live-student.component.html',
  styleUrls: ['./live-student.component.css']
})
export class LiveStudentComponent implements OnInit {

	  constructor(private liveService: LiveService,
              private route: ActivatedRoute,
              private courseService: CourseService){}

    private sub:any;
    lecture: Lecture;

	  error: string = "";
    ngOnInit(): void {
      this.getLecture();
    }

  	slow(){
  		this.liveService.evaluate("slow", this.lecture.id)
  		.then(() => {})
      .catch(error => this.error="Something went wrong.");
  	}
  	fast(){
  		this.liveService.evaluate("fast", this.lecture.id)
  		.then(() => {})
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
