import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/_services';
import { ButtonCount, Question } from './view.models';
import { Lecture } from '../course/models';
import { CourseService } from '../course/course.service';
import { ActivatedRoute, Params }   from '@angular/router';
import { ViewService } from './view.service';
import {Observable} from 'rxjs/Rx';




@Component({
    moduleId: module.id,
    selector: 'view/lecturer',
    templateUrl: 'view.lecturer.component.html'
})

export class LecturerViewComponent {
		  constructor(private viewService: ViewService,
              private route: ActivatedRoute,
              private courseService: CourseService){}

	public buttonCount: ButtonCount = {to_fast: 0, to_slow: 0};
	minutesAgo: number = 5;

	public toSlow: string = "too slow";
	public toFast: string = "too fast";
	public barChartLabels: String[] = [this.toSlow, this.toFast];
	public barChartType: string = 'bar';
	public barChartLegend: boolean = true;
	public barChartDataExample: any[] = [
	{data: [this.buttonCount.to_fast, this.buttonCount.to_slow], label: 'eksampleSet1', 
        }]
	public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
	scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    max: 50
                }
            }]
        }
  	};
	error: string = "";

	public mockQuestions: Question[] =[
	{question: "what", id:1},
	{question: "how", id: 2}
	];


	public getButtonCount(): void {
		this.viewService.getEvaluationCount(this.lecture.id, this.minutesAgo).then(d => {
			this.buttonCount=d;
			this.barChartDataExample = [
	{data: [this.buttonCount.to_fast, this.buttonCount.to_slow], label: 'eksampleSet1', 
        }]
		})
		.catch(error => this.error=error);
	}

	public setMinutesAgo(min: number): void {
		if (min > 0) {
			this.minutesAgo = min;
		}
	}
	
	private sub:any;	
	lecture: Lecture;

	ngOnInit(): void {
      this.getLecture();
      this.refresh();
    }


    getLecture(){
      this.sub = this.route.params.subscribe(params =>{
        this.courseService.getLecture(+params['id'])
        .then(lecture => {this.lecture=lecture;})
        .catch(error => {this.error=error;
           });
      })
}
	refresh(){
		Observable.interval(2000).subscribe(x => {
			if (this.lecture ) {
				this.getButtonCount();
			}
    
  });
	}
}