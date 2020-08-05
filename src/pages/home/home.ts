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
    public loadingCtrl: LoadingController
    ) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false)
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('PrincipalPage');
      },
      error => {
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