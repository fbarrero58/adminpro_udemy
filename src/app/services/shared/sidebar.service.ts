import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class SidebarService {

  menu: any[] = [];
  constructor( public _us: UsuarioService ) {
    this.menu = this._us.menu;
  }

}
