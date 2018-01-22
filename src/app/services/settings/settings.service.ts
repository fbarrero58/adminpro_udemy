import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaurl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargar_ajustes();
  }

  guardar_ajustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargar_ajustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicar_tema(this.ajustes.tema);
    }
  }

  aplicar_tema(tema: string) {
    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);
    this.ajustes.tema = tema;
    this.ajustes.temaurl = url;
    this.guardar_ajustes();

  }

  // aplicar_check() {
  //   let selectores: any = document.getElementsByClassName('selector');
  //   console.log(selectores);
  //   for ( let ref of selectores){
  //     console.log(ref);
  //     if (ref.classList[1] === this.ajustes.tema ) {
  //         ref.classList.add('working');
  //     }
  //   }
  // }

}

interface Ajustes {
  temaurl: string;
  tema: string;
}
