import { ILoginResponse } from './../../../shared/models/login-response';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  login(username: string, password: string): Observable<ILoginResponse> {
    return this.http.post<any>('http://localhost:3000/login', { username, password })
      .pipe(tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user);
      }));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
