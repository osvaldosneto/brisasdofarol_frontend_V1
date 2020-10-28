import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HospedagemService } from '../../services/domain/hospedagem.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-hospedagens',
  templateUrl: 'hospedagens.html',
})
export class HospedagensPage {

  formGroup: FormGroup;
  estados: EstadoDTO[]
  cidades: CidadeDTO[]

  constructor(
    public navCtrl : NavController, 
    public navParams : NavParams,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public alertCtrl: AlertController,
    public hospedagemService : HospedagemService,
    public loadingCtrl : LoadingController) {

      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
        maximoHospedes : [ , [Validators.required]],
        valorDiaria : [ , [Validators.required]],
        valorHospedeExtra : [ , [Validators.required]],
        taxaLimpeza : [  , [Validators.required]],
        logradouro : ['', [Validators.required]],
        numero : ['', [Validators.required]],
        complemento : ['', [Validators.required]],
        bairro : ['', [Validators.required]],
        cep : ['', [Validators.required]],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]] 
      });
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    let loader = this.presentLoading();
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  addHospedagem(){
    let loader = this.presentLoading();
    this.hospedagemService.insert(this.formGroup.value)
      .subscribe(response => {
        loader.dismiss();
        this.showInsertOk();
      },
      error => {
        loader.dismiss();
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
