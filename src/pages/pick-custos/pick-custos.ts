import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CustoService } from '../../services/domain/custo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { CustoDTO } from '../../models/custo.dto';

@IonicPage()
@Component({
  selector: 'page-pick-custos',
  templateUrl: 'pick-custos.html',
})
export class PickCustosPage {

  formGroup: FormGroup;
  item : string[]
  lista : CustoDTO[]
  exist : boolean
  id : string

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public custoService: CustoService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      this.item = ["*Todos", "Energia", "Internet", "Água", "Outros"]
      this.exist = false

      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required]],
        datainicio : [ , []],
        datafim : [ , []],
      });
  }

  ionViewDidLoad() {
    this.formGroup.controls.nome.setValue(this.item[0])
   // this.formGroup.controls.idHospedagem.setValue('*selecione uma hospedagem');
  }

  searchCusto(){
    let loader = this.presentLoading();
    this.custoService.findByNomeData(this.formGroup.value)
      .subscribe(response =>{
        this.lista = response
        this.formatData()
        this.exist = true
        loader.dismiss()
      },
      error => {
        this.navCtrl.setRoot("PrincipalPage");
        loader.dismiss()
      });
  }

  formatData(){
    for(let l of this.lista){
      l.dataPagamento = (l.dataPagamento.substr(0, 10).split('-').reverse().join('/'));
    }
  }

  removeCusto(id : string){
    this.id = id
    this.showDeleteOk()
  }

  showDeleteOk() {
    let alert = this.alertCtrl.create({
      title: 'Deletando Custo!',
      message: 'Você tem certeza que deseja excluir o custo',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.confirmaDeleta()
            this.showDeletado()
            this.navCtrl.setRoot("PrincipalPage");
          }
        },
        {
          text: 'Não',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  showDeletado(){
    let alert = this.alertCtrl.create({
      title: 'Deletado!',
      message: 'Custo deletado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot("PrincipalPage");
          }
        }
      ]
    });
    alert.present();
  }

  confirmaDeleta(){
    this.custoService.delete(this.id)
      .subscribe(repsponse =>{
        this.navCtrl.push("PrincipalPage");
      },
      error => {
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  editCusto(id : string){
    this.navCtrl.push("EditCustoPage", {custo_id: id});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
