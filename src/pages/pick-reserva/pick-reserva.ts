import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HospedagemService } from '../../services/domain/hospedagem.service';
import { HospedagemDto } from '../../models/hospedagem.dto';
import { ReservaSearchDTO } from '../../models/reservaSearch.dto';
import { ReservaService } from '../../services/domain/reserva.service';

@IonicPage()
@Component({
  selector: 'page-pick-reserva',
  templateUrl: 'pick-reserva.html',
})
export class PickReservaPage {

  clientes : ClienteDTO[]
  hospedagens : HospedagemDto[]
  formGroupData: FormGroup;
  formGroupId: FormGroup;
  search: ReservaSearchDTO
  exist: boolean
  cliente: any

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public clienteService : ClienteService,
    public hospedagemService: HospedagemService,
    public reservaService: ReservaService,
    public loadingCtrl: LoadingController) {

      this.exist = false
      this.formGroupData = this.formBuilder.group({
        data : [ , ],
      });

      this.formGroupId = this.formBuilder.group({
        idCliente: [ , []],
        idHospedagem : [ , []],
      });

  }

  ionViewDidLoad() {
    this.hospedagemService.findAll()
      .subscribe(response => {
        this.hospedagens = response;
        this.formGroupId.controls.idHospedagem.setValue("*Todos");
      },
      error => {
        this.navCtrl.setRoot("HomePage");
      });
    this.clienteService.findAll()
      .subscribe(response =>{
        this.clientes = response
        this.formGroupId.controls.idCliente.setValue("*Todos")
      },
      error => {
        this.navCtrl.setRoot("HomePage");
      });
  }

  pickReservaByData(){
    let loader = this.presentLoading();
    this.reservaService.findByData(this.formGroupData.value)
      .subscribe(response =>{
        this.navCtrl.push("ShowReservasPage", {reservas: response})
        loader.dismiss();
      },
      error =>{
        loader.dismiss();
        this.navCtrl.setRoot("HomePage");
      })
  }

  pickReservaById(){
    let loader = this.presentLoading();
    this.reservaService.findByNomeData(this.formGroupId.value)
      .subscribe(response =>{
        this.navCtrl.push("ShowReservasPage", {reservas: response})
        loader.dismiss();
      },
      error =>{
        loader.dismiss();
        this.navCtrl.setRoot("HomePage");
      })
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
