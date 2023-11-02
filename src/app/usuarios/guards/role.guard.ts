import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';
 
export const roleGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  let role = route.data['role'] as string;
  console.log(role);
  if (authService.hasRole(role)) {
    return true;
  }
  swal.fire('Acceso denegado', `Hola ${authService.usuario.username} no tiene acceso a éste recurso!`, 'warning');
  router.navigate(['/clientes']);
  return false;
};    