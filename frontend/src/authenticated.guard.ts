import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authenticatedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    router.navigate(['/chat']);
    return false;
  } else {
    return true;
  }
};
