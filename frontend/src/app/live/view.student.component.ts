import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/_services';
import { apiUrl } from '../local-settings';
import { ViewService } from './view.service';

@Component({
    moduleId: module.id,
    templateUrl: 'view.student.component.html'
})


export class StudentView  {

	constructor(private viewService: ViewService){}


	error: string = "";
  	slow(event){
  		this.viewService.evaluate("slow")
  		.then()
      	.catch(error => this.error="Something went wrong.");
  	}
  	fast(event){
  		this.viewService.evaluate("fast")
  		.then()
      	.catch(error => this.error="Something went wrong.");
  	}
}