import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../_services';

@Component({
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    model: any = {};
    error : string;


    constructor (private auth: AuthenticationService, private router: Router,) {}

    register() {
        this.auth.register(this.model.username, this.model.password, this.model.email, this.model.firstName, this.model.lastName)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['']);
                } else {
                    this.error = 'Something went wrong!';
                }
            });
    }
}
