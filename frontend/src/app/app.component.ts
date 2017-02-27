import { Component } from '@angular/core';
import { AuthenticationService } from './auth/_services';
import { Router } from '@angular/router';

// declare var Pusher: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    // private pusher: any;
    // private channel: any;

    constructor(
        private auth:AuthenticationService,
        private router: Router) {

            // this.pusher = new Pusher('24e1ae04e2c67d323ec5', {
            //     cluster: 'eu',
            //     encrypted: true,
            // });
            // this.channel = this.pusher.subscribe('my-channel');
            // this.channel.bind('my-event', function(data) {
            //     alert(data.message);
            // })
        }


    logout() {
        this.auth.logout();
        this.router.navigate(['/']);
    }
}
