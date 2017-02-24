import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    // Binds data to the form
    model: any = {};
    // Set the error message if request is not successful
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        // Use authenticationService to login the user and set the login state.
        // The service will store the user and token in localStorage.
        this.authenticationService.login(this.model.username, this.model.password)
            .then(() => this.router.navigate(['/courses']))
            .catch(error => this.error = "Wrong username or password.");
    }
}
