import { Component } from '@angular/core';
import { HomeComponent } from './auth/home/index';
import { User } from './auth/_models/index';
import { UserService } from './auth/_services/index';
import { AuthenticationService } from './auth/_services/index';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'Courses';
    user = 'edvard';
    users: User[] = [];

    ngOnInit() {
        // get users from secure api end point
    }
}
