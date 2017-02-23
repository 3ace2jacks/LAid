import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/_services';



@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent {

    constructor(private auth: AuthenticationService) { }



}
