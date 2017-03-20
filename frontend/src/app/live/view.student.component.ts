import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'view.student',
  templateUrl: './view.student.component.html',
  providers: [],
})

export class StudentViewComponent {
	title = "Feedback";
	toFast: Boolean = false;
	toSlow: Boolean = false;

	toFastMethod(): void {

	}

	toSlowMethod(): void {

	}

}