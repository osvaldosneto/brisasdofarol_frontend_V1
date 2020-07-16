import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HospedagemService } from '../../services/domain/hospedagem.service';

/**
 * Generated class for the HospedagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hospedagens',
  templateUrl: 'hospedagens.html',
})
export class HospedagensPage {

  constructor(
    public navCtrl : NavController, 
    public navParams : NavParams,
    public hospedagemService : HospedagemService) {
  }

  ionViewDidLoad() {
    this.hospedagemService.findAll()
      .subscribe(response => {
        console.log(response)
      },
      error =>{
        console.log(error)
      });
  }

}
