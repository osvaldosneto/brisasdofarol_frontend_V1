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
        dataInicio : [ , ],
        dataFim : [ , ],
      });

      this.formGroupId = this.formBuilder.group({
        idCliente: [ , []],
        idHospedagem : [ , []],
      });
  }

  loadClientes(){
    let loader = this.presentLoading();
    this.clienteService.findAll()
      .subscribe(response =>{
        this.clientes = response
        this.formGroupId.controls.idCliente.setValue("*Todos")
        loader.dismiss()
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.hospedagemService.findAll()
      .subscribe(response => {
        this.hospedagens = response;
        this.formGroupId.controls.idHospedagem.setValue("*Todos");
        this.loadClientes()
        loader.dismiss()
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  pickReservaByData(){
    let loader = this.presentLoading();
    this.reservaService.findByData(this.formGroupData.value)
      .subscribe(response =>{
        loader.dismiss();
        this.navCtrl.push("ShowReservasPage", {reservas: response})
      },
      error =>{
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
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
        this.navCtrl.setRoot("PrincipalPage");
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
