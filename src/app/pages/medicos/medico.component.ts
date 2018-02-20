import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public _hs: HospitalService, public _ms: MedicoService,
              public router: Router, public activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.medico_por_id(id);
      }
    });
  }

  ngOnInit() {
    this._hs.cargar_hospitales()
            .subscribe( (resp: any) => this.hospitales = resp.hospitales);
  }

  guardar_medico( f: NgForm ) {

    if (f.invalid) {
      return;
    }

    this._ms.guardar_medico(this.medico)
            .subscribe( medico => {
              this.medico._id = medico.id;
              this.router.navigate(['/medico', medico._id]);
            });

  }

  cambio_hospital( id: string ) {
    this._hs.obtener_hospital(id)
            .subscribe( resp => this.hospital = resp);
  }

  medico_por_id( id: string ) {
    this._ms.medico_por_id(id)
        .subscribe( medico => {
          this.medico = medico;
          this.medico.hospital = medico.hospital._id;
          this.cambio_hospital(this.medico.hospital);
        });
  }

}
