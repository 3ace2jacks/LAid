import { Component } from '@angular/core';
import { AuthenticationService } from './auth/_services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {

    constructor(
        private auth:AuthenticationService,
        private router: Router) {}

    logout() {
        this.auth.logout();
        this.router.navigate(['/']);
    }
}
