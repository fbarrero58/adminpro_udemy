import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router/';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor( public _us: UsuarioService,
                public router: Router ) {}

  canActivate(): boolean {

    if ( this._us.esta_logeado() ) {
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
