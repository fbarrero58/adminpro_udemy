import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

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

  }

  editar_medico(medico: Medico) {

  }

  mostrar_modal(id: string) {

  }

  buscar_termino(termino: string) {

  }

  crear_medico() {

  }

}
