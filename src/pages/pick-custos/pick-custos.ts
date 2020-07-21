import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public alertCtrl: AlertController,) {

      this.item = ["Energia", "Internet", "Água", "Outros", "*Todos"]
      this.exist = false

      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required]],
        datainicio : [ , []],
        datafim : [ , []],
      });
  }

  searchCusto(){
    this.custoService.findByNomeData(this.formGroup.value)
      .subscribe(response =>{
        this.lista = response
        this.formatData()
        this.exist = true
      },
      error => {});
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
      error => {});
  }

  editCusto(id : string){
    this.navCtrl.push("EditCustoPage", {custo_id: id});
  }

}
