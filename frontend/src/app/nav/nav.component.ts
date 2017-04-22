import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  registerError: string;
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
  })
  
  loginError: string;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.loginError = "";
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
    .then(() => location.reload())
    .catch(error => this.loginError = error);
  }

  register() {
    this.registerError = "";
    this.authService.register(this.registerForm.get('username').value, this.registerForm.get('email').value, this.registerForm.get('password').value)
    .then(() => location.reload())
    .catch(error => this.registerError = error);
  }

  signOut() {
    this.authService.logout()
    .then(() => location.reload())
    .catch(error => console.log(error));
  }

}
