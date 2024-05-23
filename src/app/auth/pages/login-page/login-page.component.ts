import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  titulo = 'LOG IN';
  email: string = '';
  password: string = '';

  loginForm!: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder
            ) { }

  ngOnInit() {
    this.setForm();
  }

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response: any) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  setForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
}
