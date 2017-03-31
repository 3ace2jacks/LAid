import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course/course.service';
import { Lecture } from '../../course/models';
import { LiveService } from '../live.service';
import { ActivatedRoute, Params }   from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Question } from '../models';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-live-student',
  templateUrl: './live-student.component.html',
  styleUrls: ['./live-student.component.css']
})
export class LiveStudentComponent implements OnInit {

	  constructor(private liveService: LiveService,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private formBuilder: FormBuilder){}

    private sub:any;
    lecture: Lecture;
    questions: Question[];

    questionForm = new FormGroup ({
      question: new FormControl()
    });

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
        .then(lecture => {this.lecture=lecture; this.getQuestions(); this.refresh()})
        .catch(error => {this.error=error;
           console.log(error+ "hello world")});
      })
    }
    createForm() {
      this.questionForm = this.formBuilder.group({
        question: ['', Validators.required ],  
      });
    }
    submitQuestion(){
      this.liveService.submitQuestion(this.questionForm.get("question").value, this.lecture.id);
      this.questionForm.setValue({
        question: "";
      })
    }

    getQuestions(){
      this.liveService.getQuestions(this.lecture.id).then(questions => {
        this.questions = questions;
      })
      .catch(error => console.log(error));
    }
    refresh(){
      Observable.interval(2000).subscribe(x => {
        if (this.lecture ) {
          this.getQuestions();
        }
    });

}
