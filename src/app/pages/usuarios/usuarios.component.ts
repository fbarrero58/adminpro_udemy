import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public _us: UsuarioService, public _mus: ModalUploadService ) {
  }

  ngOnInit() {
    this.cargar_usuarios();
    this._mus.notificacion
        .subscribe( resp => this.cargar_usuarios());
  }

  mostrar_modal( id: string ) {
    this._mus.mostrar_modal('usuarios', id);
  }

  cargar_usuarios() {

    this.cargando = true;

    this._us.cargar_usuarios(this.desde)
        .subscribe( (resp: any) => {
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
        });

  }

  cambiar_desde( valor: number ) {

    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde = desde;
    this.cargar_usuarios();

  }

  buscar_usuario( termino: string ) {

    if (!termino) {
      this.cargar_usuarios();
      return;
    }

    this.cargando = true;

    this._us.buscar_usuarios(termino)
        .subscribe( (usuarios: Usuario[]) => {
          this.usuarios = usuarios;
          this.cargando = false;
        });

  }

  borrar_usuario( usuario: Usuario ) {

    if ( usuario._id === this._us.usuario._id ) {
      swal('No puede borrar usuario', 'No se puede borrar asi mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      if (borrar) {
        this.cargando = true;
        this._us.borrar_usuario(usuario)
            .subscribe( resp => {
              this.cargar_usuarios();
              this.cargando = false;
            });
      }

    });

  }

  guardar_cambios( usuario: Usuario ) {

    this._us.actualizar_usuario(usuario)
        .subscribe();

  }

}
