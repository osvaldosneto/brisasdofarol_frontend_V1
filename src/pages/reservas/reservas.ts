import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HospedagemDto } from '../../models/hospedagem.dto';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { HospedagemService } from '../../services/domain/hospedagem.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-reservas',
  templateUrl: 'reservas.html',
})
export class ReservasPage {

  clientes : ClienteDTO[]
  hospedagens : HospedagemDto[]
  formGroup: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService : ClienteService,
    public hospedagemService : HospedagemService,
    public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        idHospedagem: [ , [Validators.required]],
        idCliente : [ , [Validators.required]],
        desconto : [ , [Validators.required]],
        tipoIntermedio : [ , [Validators.required]],
        taxaLimpeza : [ , [Validators.required]],
        numeroHospedes : [ , [Validators.required]],
        checkIn : ['', [Validators.required]],
        checkOut : ['', [Validators.required]],
      });

  }

  ionViewDidLoad() {
    this.hospedagemService.findAll()
      .subscribe(response => {
        this.hospedagens = response;
      },
      error => {});
    this.clienteService.findAll()
      .subscribe(response =>{
        this.clientes = response
      },
      error => {});
  }

  addReserva(){
    console.log(this.formGroup.value)
  }

}
