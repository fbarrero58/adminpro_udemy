import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core/';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
  }

  ocultar_modal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrar_modal(tipo: string, id: string) {
    this.tipo = tipo;
    this.id = id;
    this.oculto = '';
  }

}
