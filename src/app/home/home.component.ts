import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent {
  public color:string[] = ['#F8AC8C','#FBE4C4','#F9F4F0','#D2E4E8','#DEACD1']
  redirects: string[] = ['Elixirs', 'Houses', 'Ingredients', 'Spells', 'Wizards']
}
