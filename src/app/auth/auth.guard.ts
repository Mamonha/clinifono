import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
      const token = localStorage.getItem('token');
      if (!token) {
          this.router.navigate(['/login']);
          return false;
        }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;

        if (role === 'admin') {
          return true;
        } else {
          this.router.navigate(['/404']);
          return false;
        }
      } catch (e) {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
}

