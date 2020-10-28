import { JardimService } from './../../services/domain/jardim.service';
import { jardimDto } from './../../models/jardim.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-jardim',
  templateUrl: 'jardim.html',
})
export class JardimPage {

  jardim : jardimDto
  formGroup: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public jardimService: JardimService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      this.formGroup = this.formBuilder.group({
        status : [ , [Validators.required]],
      });
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.jardimService.find()
      .subscribe( response => {
        this.jardim = response
        this.formGroup.controls.status.setValue(response.status);
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      })
    loader.dismiss();
  }

  changeStatus(){
    if(this.formGroup.value.status != this.jardim.status){
      let loader = this.presentLoading();
      this.jardimService.insert(this.formGroup.value)
        .subscribe(response => {
          loader.dismiss();
          this.showInsertOk();
        },
        error => {
          loader.dismiss();
          this.navCtrl.setRoot("PrincipalPage");
        }); 
    } else {
      this.showInsertNull()
    }
    
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Status modificado com sucesso.',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot("PrincipalPage");
          }
        }
      ]
    });
    alert.present();
  }

  showInsertNull() {
    let alert = this.alertCtrl.create({
      title: 'Alerta!!',
      message: 'Status continua o mesmo.',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

}
