import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-sendemailall',
  templateUrl: 'sendemailall.html',
})
export class SendemailallPage {
  
  formGroup: FormGroup;
  alert: boolean

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public clienteService: ClienteService) {

      this.formGroup = this.formBuilder.group({
        msg: ['', []],
      });

  }

  sendMsg(){
    this.alert = false
    this.clienteService.sendEmailAll(this.formGroup.value)
      .subscribe(response =>{
        this.showMsgOk();
      },
      error => {
        this.navCtrl.setRoot("PrincipalPage");
      })
  }

  showMsgOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Menssagem enviada a todos com sucesso',
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

}
