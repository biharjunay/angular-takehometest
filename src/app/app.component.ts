import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit{
  isAuth!: boolean
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticatedUser()
    this.authService.authChange.subscribe((isAuth: boolean) => {
      this.isAuth = isAuth;
    });
    console.log(this.isAuth);
  }


  logout = () => {
    this.authService.logout()
  }


  title = 'mycod';
}
