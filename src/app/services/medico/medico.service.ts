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

}
