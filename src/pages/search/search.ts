import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
  }

  searchReserva(){
    this.navCtrl.push("PickReservaPage");
  }

  searchHospedagem(){
    this.navCtrl.push("PickHospedagemPage");
  }

  searchClientes(){
    this.navCtrl.push("PickClientePage");
  }

  searchCustos(){
    this.navCtrl.push("PickCustosPage");
  }

}
