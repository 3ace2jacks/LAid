import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonCount, Question } from '../models';
import { Lecture } from '../../course/models';
import { CourseService } from '../../course/course.service';
import { ActivatedRoute, Params }   from '@angular/router';
import { LiveService } from '../live.service';
import { Observable } from 'rxjs/Rx';


@Component({
	selector: 'app-live-teacher',
	templateUrl: './live-teacher.component.html',
	styleUrls: ['./live-teacher.component.css']
})
export class LiveTeacherComponent implements OnInit {
	constructor(private liveService: LiveService,
		private route: ActivatedRoute,
		private courseService: CourseService){}

	public mockQuestions: Question[] = [
	{question: 'heyesliknvorwihorhorhosrhvsejlrvsjrolrvhldsjvnsjldvndjslnjldsnvldjsnvsdljnvsdljvnsdljn', votes: 1},
	{question: 'heeey', votes: 1},
	{question: 'hhhey', votes: 1},

	]

	public buttonCount: ButtonCount = {to_fast: 0, to_slow: 0};
	minutesAgo: number = 5;

	questions: Question[];
	public toSlow: string = "too slow";
	public toFast: string = "too fast";
	public barChartLabels: String[] = [this.toFast, this.toSlow];
	public barChartType: string = 'bar';
	public barChartLegend: boolean = true;
	public barChartDataExample: any[] = [
	{data: [this.buttonCount.to_fast, this.buttonCount.to_slow], label: '', 
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



public getButtonCount(): void {
	this.liveService.getEvaluationCount(this.lecture.id, this.minutesAgo).then(d => {
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

	getQuestions(){
      this.liveService.getQuestions(this.lecture.id).then(questions => {
        this.questions = questions.sort(function(a,b){
          if((a.upvotes - a.downvotes) < (b.upvotes - b.downvotes)){
            return 1
          }
          return -1
        });
      })
      .catch(error => console.log(error));

    }
    answered(q: Question){
	    this.liveService.answered(q.id);     
	    q.answered = true;    
      	
    }
     
	refresh(){
		Observable.interval(2000).subscribe(x => {
			if (this.lecture ) {
				this.getButtonCount();
				this.getQuestions();
			}
    
  		});
	}

}
