import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  cadastros() {
    this.navCtrl.push("CadastrosPage");
  }

  relatorios(){
    this.navCtrl.push("RelatoriosPage");
  }
  
  msg(){
    this.navCtrl.push("MsgPage");
  }

  search(){
    this.navCtrl.push("SearchPage");
  }

}
