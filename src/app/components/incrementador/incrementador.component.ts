import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 10;

  @Output() cambio_valor: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  cambiar_progeso(cantidad: number) {
    if ( (this.progreso + cantidad) > 100 ) {
      return;
    }

    if ( (this.progreso + cantidad) <= 0 ) {
      return;
    }
    this.progreso = this.progreso + cantidad;
    this.txtProgress.nativeElement.focus();
    this.cambio_valor.emit( this.progreso );
  }

  onChanges(evento: number) {

    if (evento >= 100) {
      this.progreso = 100;
    }else if (evento <= 0) {
      this.progreso = 0;
    }
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambio_valor.emit( this.progreso );
  }

}
