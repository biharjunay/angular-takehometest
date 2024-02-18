import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth: boolean = false
  private authKey: string = "token"
  authChange: Subject<boolean> = new Subject<boolean>();
  constructor(private router: Router) {
    this.isAuth = !!localStorage.getItem(this.authKey)
  }
  login = (email: string, password: string): boolean => {
    if (email === "test@test.test" && password === "test123@") {
      const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpheWRlZXAgUGF0aWwiLCJpYXQiOjE1MTYyMzkwMjJ9.yt3EOXf60R62Mef2oFpbFh2ihkP5qZ4fM8bjVnF8YhA'
      localStorage.setItem(this.authKey, authToken)
      this.isAuth = true
      this.authChange.next(true)
      return true
    } else {
      return false
    }
  }
  isAuthenticatedUser(): boolean {
    return this.isAuth;
  }

  logout(): void {
    localStorage.removeItem(this.authKey);
    this.authChange.next(false)
    this.isAuth = false;
    this.router.navigate(['/login'])
  }
}
