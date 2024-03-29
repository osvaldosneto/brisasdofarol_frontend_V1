import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-edit-cliente',
  templateUrl: 'edit-cliente.html',
})
export class EditClientePage {

  formGroup: FormGroup;
  estados: EstadoDTO[]
  cidades: CidadeDTO[]
  cliente: any
  id : string

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public alertCtrl: AlertController,
    public clienteService: ClienteService,
    public loadingCtrl: LoadingController) {

      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        logradouro : ['', []],
        numero : ['', []],
        complemento : ['', []],
        bairro : ['', []],
        cep : ['',[]],
        telefone1 : ['', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]] 
      });
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.id = this.navParams.get('cliente_id');
    this.clienteService.findById(this.id)
      .subscribe(response => {
        this.cliente = response
        this.setEstadosMunicipios()
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  setEstadosMunicipios(){
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.cliente.endereco.cidade.estado.id);
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
        this.formGroup.controls.cidadeId.setValue(this.cliente.endereco.cidade.id)
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  editClient(){
    let loader = this.presentLoading();
    this.clienteService.deleteEmail(this.id)
      .subscribe(response =>{
      })
    this.clienteService.putCliente(this.formGroup.value, this.id)
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
      message: 'Cliente editado com sucesso!!',
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
