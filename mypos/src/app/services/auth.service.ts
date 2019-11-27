import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  isLogin() {
    return localStorage.getItem(environment.keyLocalAuthenInfo) !== null
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"])
  }
}
