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
    console.log('ionViewDidLoad SearchPage');
  }

  donada(){
    console.log("Do nada")
  }

  searchClientes(){
    this.navCtrl.push("PickClientePage");
  }

  searchCustos(){
    this.navCtrl.push("PickCustosPage");
  }

}
