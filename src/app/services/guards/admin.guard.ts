import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router/';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(public _us: UsuarioService, public router: Router) {}

  canActivate() {

    if (this._us.usuario.role === 'ADMIN_ROLE' )  {
      return true;
    }
    this._us.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
