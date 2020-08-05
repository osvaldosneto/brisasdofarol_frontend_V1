import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from '../../services/domain/cliente.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-sendemail',
  templateUrl: 'sendemail.html',
})
export class SendemailPage {

  formGroup: FormGroup;
  cliente : any
  alert: boolean

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public clienteService: ClienteService,
    public loadingCtrl: LoadingController
    ) {

      this.formGroup = this.formBuilder.group({
        id: ['', []],
        msg: ['', []],
      });
  }

  ionViewDidLoad() {
    let id = this.navParams.get('cliente_id')
    this.formGroup.controls.id.setValue(this.navParams.get('cliente_id'));
    this.clienteService.findById(id)
      .subscribe(response => {
        this.cliente = response
      },
      error => {
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  sendMsg(){
    this.alert = false
    let loader = this.presentLoading();
    this.clienteService.sendEmail(this.formGroup.value)
      .subscribe(response =>{
        loader.dismiss();
        this.showMsgOk();
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      })
  }

  showMsgOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Menssagem enviada com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.alert = true
            this.navCtrl.setRoot("PrincipalPage");
          }
        }
      ]
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
