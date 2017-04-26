import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @ViewChild('registerModal') public registerModal: ModalDirective;
  @ViewChild('loginModal') public loginModal: ModalDirective;

  // The error message displayed in the register form.
  registerError: string;

  // The registration form.
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
  })

  // Error message displayed in the login form.
  loginError: string;

  // The form that contains the username and password for login.
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })

  /**
   * Inject the needed services.
   */
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Sign in with the given credentials.
   * The username and password are retrieved from the loginForm. 
   */
  login() {
    this.loginError = "";
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .then(() => {
        this.router.navigate(['courses']); 
        this.loginModal.hide()
      })
      .catch(error => this.loginError = error);
  }

  /**
   * Register a new user with the provided credentials. 
   * The credentials are retrieved from the registerForm. 
   */
  register() {
    this.registerError = "";
    this.authService.register(this.registerForm.get('username').value, this.registerForm.get('email').value, this.registerForm.get('password').value)
      .then(() => { 
        this.authService.login(this.registerForm.get('username').value, this.registerForm.get('password').value);
        this.registerModal.hide();
        this.router.navigate(['courses']);
      })
      .catch(error => this.registerError = error);
  }

  /**
   * Sign the user out of the system and navigate to the front page.
   */
  signOut() {
    this.authService.logout()
      .then(() => this.router.navigate(['/']))
      .catch(error => {
        console.log(error); () => this.router.navigate(['/'])
      });
  }
}