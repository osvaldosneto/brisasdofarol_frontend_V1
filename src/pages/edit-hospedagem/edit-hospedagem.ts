import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HospedagemService } from '../../services/domain/hospedagem.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { HospedagemDto } from '../../models/hospedagem.dto';

@IonicPage()
@Component({
  selector: 'page-edit-hospedagem',
  templateUrl: 'edit-hospedagem.html',
})
export class EditHospedagemPage {

  formGroup: FormGroup;
  estados: EstadoDTO[]
  cidades: CidadeDTO[]
  hospedagem: HospedagemDto
  id: string
  hosp: any

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public alertCtrl: AlertController,
    public hospedagemService : HospedagemService,
    public loadingCtrl: LoadingController) {

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
    let loader = this.presentLoading();
    this.id = this.navParams.get('hospedagem_id');
    this.hospedagemService.findById(this.navParams.get('hospedagem_id'))
      .subscribe(response =>{
        this.hospedagem = response;
        this.hosp = response;
        this.setEstadosMunicipios()
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      })
  }

  setEstadosMunicipios(){
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.hosp.endereco.cidade.estado.id);
        this.updateCidades();
      },
      error => {
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  updateCidades() {
    let loader = this.presentLoading();
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(this.hosp.endereco.cidade.id)
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      });
  }
  
  updateHospedagem(){
    this.hospedagemService.update(this.formGroup.value, this.id)
      .subscribe(response => {
        this.showInsertOk();
      })
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Hospedagem editada com sucesso!!',
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
