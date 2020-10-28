import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cadastros',
  templateUrl: 'cadastros.html',
})
export class CadastrosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  cadastroCliente(){
    this.navCtrl.push("ClientePage");
  }

  cadastroHospedagem(){
    this.navCtrl.push("HospedagensPage")
  }

  cadastroCustos(){
    this.navCtrl.push("CustoPage")
  }

  cadastroReservas(){
    this.navCtrl.push("ReservasPage")
  }

}
