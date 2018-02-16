import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor( public router: Router, public _ss: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
    this.google_init();
  }

  google_init() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '84948488411-r09cne6ptvsetn6cptnl9md7ktd1e185.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._ss.login_google(token)
          .subscribe( res => {
              this.router.navigate(['/dashboard']);
          });
    });
  }

  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._ss.login(usuario, forma.value.recuerdame)
            .subscribe( correcto => this.router.navigate(['/dashboard']) );
  }

}
