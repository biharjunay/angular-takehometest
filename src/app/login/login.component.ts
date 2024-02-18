import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm?:any;
  invalid:boolean = false
  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      })
  }
  checkEmail() {
    alert('email = test@test.test, password = test123@')
  }
  onChange() {
    this.invalid = false
    console.log(this.invalid);

  }
  onSubmit(event:Event): void {
    event.preventDefault()
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value
      const password = this.loginForm.get('password').value
      if (this.authService.login(email, password)) {
        this.router.navigate(['/'])
      } else {
        this.invalid = true
      }
    }
  }
}
