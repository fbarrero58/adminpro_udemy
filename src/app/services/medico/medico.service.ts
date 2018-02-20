import { Injectable } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class MedicoService {

  totalMedicos: number = 0;

  constructor(public http: HttpClient) { }

  cargar_medicos() {

    let url = URL_SERVICIOS + '/medico';

    return this.http.get(url)
              .map((resp: any) => {
                this.totalMedicos = resp.total;
                return resp.medicos;
              });

  }

  buscar_medicos( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;

    return this.http.get( url )
                .map( (resp: any) => resp.medico );

  }

  borrar_medico(id: string) {

    let token = localStorage.getItem('token');

    let url = URL_SERVICIOS + '/medico/' + id + '?token=' + token;

    return this.http.delete( url );

  }

  guardar_medico(medico: Medico) {

    medico.usuario = localStorage.getItem('id');

    let url = URL_SERVICIOS + '/medico?token=' + localStorage.getItem('token');

    return this.http.post(url, medico)
              .map( (resp: any) => {
                swal('Médico creado', medico.nombre, 'success');
                return resp.medico;
              });

  }

  medico_por_id( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
                .map( (resp: any) => {
                  return resp.medico;
                });

  }

}
