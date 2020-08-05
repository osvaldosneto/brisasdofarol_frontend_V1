import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustoService } from '../../services/domain/custo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-edit-custo',
  templateUrl: 'edit-custo.html',
})
export class EditCustoPage {

  custo: any
  item : string[]
  formGroup: FormGroup;
  nome : string
  data: string
  id: string

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public custoService: CustoService,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,) {

      this.item = ["Energia", "Internet", "Água", "Outros"]

      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
        dataPagamento : [ , [Validators.required]],
        valor : [ ,[Validators.required]],
        descricao : [ ,[]]
      });

  }

  ionViewDidLoad() {
    this.id = this.navParams.get('custo_id');
    this.custoService.findById(this.id)
      .subscribe(response =>{
        this.custo = response
        this.nome = this.custo.nome
        this.data = this.custo.dataPagamento
        this.custo.dataPagamento = this.custo.dataPagamento.substr(0, 10).split('-').reverse().join('/');
      },
      error => {
        this.navCtrl.setRoot("PrincipalPage");
      })
  }

  putCusto(){
    this.custoService.putCusto(this.formGroup.value, this.id)
      .subscribe(response => {
        this.showInsertOk();
      })
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Custo editado com sucesso!!',
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

}
