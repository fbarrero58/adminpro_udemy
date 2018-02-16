import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string = null;

  constructor(public _us: UsuarioService) {
    this.usuario = this._us.usuario;
   }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {

    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this.usuario.nombre = usuario.nombre;

    this._us.actualizar_usuario(this.usuario)
          .subscribe();

  }

  seleccion_imagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiar_imagen() {
    this._us.cambiar_imagen(this.imagenSubir, this.usuario._id);
  }

}
