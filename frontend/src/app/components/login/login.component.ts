import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { NgIf } from '@angular/common';
import { statusCodes } from '../../../status-codes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  showErrorMessage = false;
  errorMessage = '';

  authService = inject(AuthService);
  router = inject(Router);

  login() {
    this.authService.login(this.username, this.password)
      .pipe(
        tap({
          next: (res => {
            this.router.navigate(['/chat']);
          }),
          error: (err => {
            console.error(err);
            this.showErrorMessage = true;
            this.getErrorMessage(err.status);
          })
        })
      ).subscribe();
  }

  getErrorMessage(code: number) {
    Object.keys(statusCodes).forEach((key) => {
      if (key.toString() === code.toString() && statusCodes[key]) {
        this.errorMessage = statusCodes[key];
      }

      if (key.toString() === code.toString() && !statusCodes[key]) {
        this.errorMessage = "An error has occured";
      }
    })
  }
}
