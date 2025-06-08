import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface KeycloakToken {
  realm_access?: { roles: string[] };
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decoded = jwtDecode<KeycloakToken>(token);
      const roles = decoded.realm_access?.roles || [];

      if (roles.includes('JAPE') && !roles.includes('ADMIN') && !roles.includes('MAMONHA')) {
        alert(`Erro - Token contém apenas JAPE. Acesso negado.`);
        this.router.navigate(['/login']);
        return false;
    }

      if (state.url === '/500' && !roles.includes('ADMIN')) {
        this.router.navigate(['/404']);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token inválido', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
