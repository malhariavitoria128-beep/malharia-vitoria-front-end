import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = route.data['roles'] || [];
    if (!roles.length) return true;

    // Supondo que auth.hasRole(role: string) verifica se o usuário tem aquela role
    const hasRole = roles.some((role: string) => this.auth.hasRole(role));

    if (!hasRole) {
      this.router.navigate(['/access-denied']);
      return false;
    }

    return true;
  }
}
