import { Component, OnInit, ElementRef } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  url: string = 'assets/css/colors/';

  constructor( public _ss: SettingsService ) {
    this.colocar_check();
  }

  ngOnInit() {
  }

  cambiar_color(tema: string, link: any) {
    this.aplicar_check(link);
    this._ss.aplicar_tema(tema);
  }

  aplicar_check(link: any) {
    let selectores: any = document.getElementsByClassName('selector');
    for ( let ref of selectores){
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocar_check() {
    let selectores: any = document.getElementsByClassName('selector');
    for ( let ref of selectores){
      if (ref.getAttribute('data-theme') === this._ss.ajustes.tema ) {
        ref.classList.add('working');
      }
    }
  }

}
