import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router, public _sas: SubirArchivoService ) {
    this.cargar_storage();
  }

  esta_logeado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargar_storage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardar_storage(id, token, usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

  login_google( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } )
                .map( (resp: any) => {
                  this.guardar_storage(resp.id, resp.token, resp.usuario);
                  return true;
                });

  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    }else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario )
                .map( (resp: any) => {
                  this.guardar_storage(resp.id, resp.token, resp.usuario);
                  return true;
                });

  }

  crear_usuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
            .map( (res: any) => {
                swal('Usuario creado', usuario.email, 'success');
                return res.usuario;
            });

  }

  actualizar_usuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;


    return this.http.put( url, usuario )
                .map( (resp: any) => {
                    let usuarioDb: Usuario = resp.usuario;
                    this.guardar_storage(usuarioDb._id, this.token, usuarioDb);
                    swal('Usuario actualizado', usuario.nombre, 'success');
                    return true;
                });

  }

  cambiar_imagen( file: File, id: string ) {

    this._sas.subir_archivo(file, 'usuarios', id)
        .then( (resp: any) => {
          this.usuario.img = resp.usuario.img;
          swal('Imagen Actualizada', this.usuario.nombre, 'success');
          this.guardar_storage( id, this.token, this.usuario );
        })
        .catch( resp => {
          console.log(resp);
        });

  }

}
