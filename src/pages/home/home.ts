import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, LoadingController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email : "",
    senha : ""
  }

  constructor(
    public navCtrl: NavController, 
    public menu : MenuController,
    public auth : AuthService,
    public loadingCtrl: LoadingController,
    ) {

  }

  ionViewDidEnter() {
    let loader = this.presentLoading();
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('PrincipalPage');
        loader.dismiss();
      },
      error => {
        loader.dismiss();
      });  
  }

  login(){
    let loader = this.presentLoading();
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        loader.dismiss();
        this.auth.successfulLogin(response.headers.get('Authorization'))
        this.navCtrl.setRoot("PrincipalPage")
      },
      error => {
        loader.dismiss();
      });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}