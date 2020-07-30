import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustoService } from '../../services/domain/custo.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-custo',
  templateUrl: 'custo.html',
})
export class CustoPage {

  formGroup: FormGroup;
  item : string[]

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public custoService: CustoService,
    public alertCtrl: AlertController,) {

      this.item = ["Energia", "Internet", "Água", "Outros"]

      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
        dataPagamento : [ , [Validators.required]],
        valor : [ ,[Validators.required]],
        descricao : [ ,[]]
      });
  }

  addCusto(){
    this.custoService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot("CadastrosPage");
          }
        }
      ]
    });
    alert.present();
  }

}
