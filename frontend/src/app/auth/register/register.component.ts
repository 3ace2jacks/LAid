import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../_services';

@Component({
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    // stores the state of the form
    model: any = {};

    // the error string will be displayed if not empty
    error : string;

    constructor (private auth: AuthenticationService, private router: Router,) {}


    // register a new user with the provided information.
    // log in the user if registration is successful
    register() {
        this.auth.register(this.model.username, this.model.password, this.model.email, this.model.firstName, this.model.lastName)
            .then(() => {
                // will log in the user if registration is successful

                // Use authenticationService to login the user and set the login state.
                // The service will store the user and token in localStorage.
                this.auth.login(this.model.username, this.model.password)
                    .then(() => this.router.navigate(['/courses']))
                    .catch(error => this.error = "Something went wrong!");
            })
            .catch(error => this.error="Something went wrong!");
    }
}
