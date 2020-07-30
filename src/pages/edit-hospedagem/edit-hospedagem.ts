import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public alertCtrl: AlertController,
    public hospedagemService : HospedagemService) {

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

    this.hospedagemService.findById(this.navParams.get('hospedagem_id'))
      .subscribe(response =>{
        let h = response
        this.hospedagem = h
      },
      error => {
        this.navCtrl.setRoot("PrincipalPage");
      })
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {
        this.navCtrl.setRoot("PrincipalPage");
      });
  }
  
}
