import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
})
export class LoginComponent {
    constructor(private userService: UserService, private router: Router) {
    }

    login(username, password) {
        console.log("login called");
        this.userService.login(username, password).subscribe((result) =>  {
            console.log(result);
            if (result) {
                console.log("result");
                this.router.navigate(['courses'])
        }});
    }
}
