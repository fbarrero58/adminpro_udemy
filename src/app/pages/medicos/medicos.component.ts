import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean = false;

  constructor(public _ms: MedicoService) { }

  ngOnInit() {
    this.cargar_medicos();
  }

  cargar_medicos() {
    this._ms.cargar_medicos()
            .subscribe( resp => {
              this.medicos = resp;
            });
  }

  borrar_medico(id: string) {
    this._ms.borrar_medico(id)
            .subscribe( resp => {
              this.cargar_medicos();
              swal('Medico Eliminado', 'Medico eliminado exitosamente', 'success');
            });
  }

  mostrar_modal(id: string) {

  }

  buscar_termino(termino: string) {

    if (!termino) {
      return this.cargar_medicos();
    }

    this._ms.buscar_medicos(termino)
            .subscribe( resp => this.medicos = resp );
  }

  crear_medico() {

  }

}
