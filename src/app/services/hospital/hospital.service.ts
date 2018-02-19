import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class HospitalService {

  constructor( public http: HttpClient ) {

  }

  cargar_hospitales() {

    let url = URL_SERVICIOS + '/hospital';

    return this.http.get( url );

  }

  obtener_hospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/'  + id;

    return this.http.get(url);

  }

  crear_hospital(nombre: string) {

    let id_usuario = localStorage.getItem('id');
    let token = localStorage.getItem('token');

    let hospital = new Hospital(nombre, '', id_usuario);

    let url = URL_SERVICIOS + '/hospital?token=' + token;

    return this.http.post(url, hospital);

  }

  borrar_hospital(id: string) {

    let token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + token;

    return this.http.delete(url);
  }

  buscar_termino( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;
    return this.http.get(url);

  }

  actualizar_hospital(hospital: Hospital) {

    let token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + token;

    return this.http.put(url, hospital);
  }

}
