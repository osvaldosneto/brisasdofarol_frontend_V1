import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HospedagemService } from '../../services/domain/hospedagem.service';
import { HospedagemDto } from '../../models/hospedagem.dto';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-pick-hospedagem',
  templateUrl: 'pick-hospedagem.html',
})
export class PickHospedagemPage {

  hospedagens: HospedagemDto[]
  hospedagem: HospedagemDto

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public hospedagemService: HospedagemService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.hospedagemService.findAll()
      .subscribe(response =>{
        this.hospedagens = response
      },
      error => {
        this.navCtrl.setRoot("PrincipalPage");
      })
    loader.dismiss();
  }

  searchHospedagem(id : string){
    let loader = this.presentLoading();
    this.hospedagemService.findById(id)
      .subscribe(response =>{
        this.hospedagem = response
        this.showHospedagem()
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      })
  }
  showHospedagem() {
    let alert = this.alertCtrl.create({
      title: 'Detalhes Hospedagem '+ this.hospedagem.nome+ '!',
      enableBackdropDismiss: false,
      buttons: [
        {text: 'Código : ' + this.hospedagem.id},
        {text: 'Nome : ' + this.hospedagem.nome},
        {text: 'Máximo de Hospedes : ' + this.hospedagem.maximoHospedes},
        {text: 'Diária : ' + this.hospedagem.valorDiaria + ',00'},
        {text: 'Valor Hospede Extra : ' + this.hospedagem.valorHospedeExtra + ',00'},
        {text: 'Valor Taxa de Limpeza : ' + this.hospedagem.taxaLimpeza + ',00'},
        {
          text: 'Ok',
          handler: () => {},
        }
      ]
    });
    alert.present();
  }

  editHospedagem(id : string){
    this.navCtrl.push("EditHospedagemPage", {hospedagem_id : id})
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}