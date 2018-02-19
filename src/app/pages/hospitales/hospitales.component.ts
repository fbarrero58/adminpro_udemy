import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  cargando: boolean = false;

  hospitales: Hospital[] = [];
  total: number = 0;

  constructor( public _hs: HospitalService, public _mus: ModalUploadService ) {
    this.cargar_hospitales();
  }

  ngOnInit() {
    this._mus.notificacion
        .subscribe( resp => this.cargar_hospitales() );
  }

  cargar_hospitales() {

    this.cargando = true;

    this._hs.cargar_hospitales()
        .subscribe( (resp: any) => {
          this.hospitales = resp.hospitales;
          this.total = resp.total;
          this.cargando = false;
        });

  }

  crear_hospital() {
    swal({
      title: "Nuevo Hospital",
      text: 'Ingrese el nombre del hospital',
      content: "input",
      button: {
        text: "Guardar",
        closeModal: false,
      },
    }).then( value => {
      if (value) {
        this._hs.crear_hospital(value)
          .subscribe( resp => {
            this.cargar_hospitales();
            swal("Hospital creado", 'El hospital "' + value + '" ha sido creado exitosamente!', "success");
          });
      }
    });
  }

  borrar_hospital(id: string, nombre: string) {

    swal({
      title: "Alerta de confirmación!",
      text: "Esta seguro que desea eliminar el " + nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then( resultado => {

      if (resultado) {
        this._hs.borrar_hospital(id)
        .subscribe(resp => {
            this.cargar_hospitales();
            swal('Hospital Eliminado', 'El hospital se ha eliminado correctamente', 'success');
        });
      }
    });

  }

  buscar_termino( termino: string ) {

    if (!termino) {
      return this.cargar_hospitales();
    }

    this._hs.buscar_termino(termino)
        .subscribe((resp: any) => {
          this.hospitales = resp.hospital;
        });
  }

  guardar_cambios(hospital: Hospital) {

    this._hs.actualizar_hospital(hospital)
            .subscribe( resp => {
                swal('Hospital actualizado', 'El hospital se ha actualizado exitosamente', 'success');
            });

  }

  mostrar_modal( id: string ) {
    this._mus.mostrar_modal('hospitales', id);
  }

}
