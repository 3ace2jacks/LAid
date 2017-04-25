import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonCount, Question } from '../models';
import { Lecture } from '../../course/models';
import { CourseService } from '../../course/course.service';
import { ActivatedRoute, Params } from '@angular/router';
import { LiveService } from '../live.service';
import { Observable } from 'rxjs/Rx';

/**
 * This component is the lecturer's view during the lecture. 
 * The lecturer gets live questions and votes in real time during the lecture.
 */
@Component({
	selector: 'app-live-teacher',
	templateUrl: './live-teacher.component.html',
	styleUrls: ['./live-teacher.component.css']
})
export class LiveTeacherComponent implements OnInit {

	// Subscriber for listening to url changes
	sub: any;

	// Error message
	error: string = "";

	// The instance of the current lecture
	lecture: Lecture;

	// An array of all live questions
	questions: Question[];

	constructor(private liveService: LiveService,
		private route: ActivatedRoute,
		private courseService: CourseService) { }

	minutesAgo: number = 5;
	buttonCount: ButtonCount = { to_fast: 0, to_slow: 0 };



	/**
	 * Configure the bar chart.
	 */
	TOO_SLOW: string = "too slow";
	TOO_FAST: string = "too fast";
	barChartLabels: String[] = [this.TOO_FAST, this.TOO_SLOW];
	barChartType: string = 'bar';
	barChartLegend: boolean = true;
	barChartDataExample: any[] = [
		{
			data: [this.buttonCount.to_fast, this.buttonCount.to_slow], label: '',
		}
	]

	barChartOptions: any = {
		scaleShowVerticalLines: false,
		responsive: true,
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true,
				}
			}]
		}
	};

	/**
	 * Get the evaluation count from the server, and update the chart.
	 */
	getButtonCount(): void {
		this.liveService.getEvaluationCount(this.lecture.id, this.minutesAgo).then(d => {
			this.buttonCount = d;
			this.barChartDataExample = [
				{
					data: [this.buttonCount.to_fast, this.buttonCount.to_slow], label: '',
				}]
		})
			.catch(error => this.error = error);
	}

	/**
	 * Set the interval to display votes from
	 * @param min - Number of minutes
	 */
	setMinutesAgo(min: number): void {
		if (min > 0) {
			this.minutesAgo = min;
		}
	}


	/**
	 * Called on initialization.
	 * Get the lecture, and update the question list.
	 */
	ngOnInit(): void {
		this.getLecture();
		this.refresh();
	}

	/**
	 * Fetch the lecture instance, and store it in the lecture field.
	 * The id is retrieved from the url.
	 */
	getLecture() {
		this.sub = this.route.params.subscribe(params => {
			this.courseService.getLecture(+params['id'])
				.then(lecture => { this.lecture = lecture; })
				.catch(error => {
					this.error = error;
				});
		})
	}

	/**
	 * Fetch an array of questions, and load it to the questions field. The
	 * questions gets sorted by number of votes.
	 */
	getQuestions() {
		this.liveService.getQuestions(this.lecture.id).then(questions => {
			this.questions = questions.sort(function (a, b) {
				if ((a.upvotes - a.downvotes) < (b.upvotes - b.downvotes)) {
					return 1
				}
				return -1
			});
		})
			.catch(error => console.log(error));

	}

	/**
	 * Flag the question as answered. 
	 * @param q - The Question instance to be flagged
	 */
	answered(q: Question) {
		this.liveService.answered(q.id);
		q.answered = true;

	}

	/**
	 * Refresh the button count and quesitons every two seconds.
	 */
	refresh() {
		Observable.interval(2000).subscribe(x => {
			if (this.lecture) {
				this.getButtonCount();
				this.getQuestions();
			}
		});
	}
}
