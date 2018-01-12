import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  url: string = 'assets/css/colors/';

  constructor( @Inject(DOCUMENT) private _document ) { }

  ngOnInit() {
  }

  cambiar_color(tema: string, link: any) {
    this.aplicar_check(link);
    this._document.getElementById('tema').setAttribute('href', this.url + tema + '.css');
  }

  aplicar_check(link: any) {
    let selectores: any = document.getElementsByClassName('selector');
    for ( let ref of selectores){
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

}
