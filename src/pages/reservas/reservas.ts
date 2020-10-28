import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HospedagemDto } from '../../models/hospedagem.dto';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { HospedagemService } from '../../services/domain/hospedagem.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import moment from 'moment';
import { ReservaService } from '../../services/domain/reserva.service';

@IonicPage()
@Component({
  selector: 'page-reservas',
  templateUrl: 'reservas.html',
})
export class ReservasPage {

  clientes : ClienteDTO[]
  hospedagens : HospedagemDto[]
  formGroup: FormGroup;
  hospedagem: any;
  numeroHosp: number[] = []
  cliente: any

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService : ClienteService,
    public hospedagemService : HospedagemService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public reservaService: ReservaService,
    public loadingCtrl: LoadingController) {

      this.formGroup = this.formBuilder.group({
        idHospedagem: [ , [Validators.required]],
        idCliente : [ , [Validators.required]],
        desconto : [ , []],
        tipoIntermedio : [ , [Validators.required]],
        tipoLimpeza : [ , [Validators.required]],
        numeroHospedes : [ , [Validators.required]],
        checkIn : ['', [Validators.required]],
        checkOut : ['', [Validators.required]],
      });

  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.hospedagemService.findAll()
      .subscribe(response => {
        this.hospedagens = response;
        this.formGroup.controls.idHospedagem.setValue('*selecione uma hospedagem');
        this.formGroup.controls.tipoLimpeza.setValue(1);
        this.formGroup.controls.tipoIntermedio.setValue(1);
        this.setNumeroHospedes(Number(this.hospedagens[0].maximoHospedes))
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      });
    this.clienteService.findAll()
      .subscribe(response =>{
        this.clientes = response
        this.formGroup.controls.idCliente.setValue('*selecione um hospede')
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  updateHospedagem(){
    let loader = this.presentLoading();
    this.hospedagemService.findById(this.formGroup.value.idHospedagem)
      .subscribe(response => {
        this.hospedagem = response   
        this.setNumeroHospedes(Number(this.hospedagem.maximoHospedes))
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  setNumeroHospedes(n : Number){
    for(let i=0; i<n; i++){
      this.numeroHosp[i] = i
    }
  }

  addReserva(){
    let loader = this.presentLoading();
    this.clienteService.findById(this.formGroup.value.idCliente)
      .subscribe(response =>{
        this.cliente = response['nome']
        this.hospedagemService.findById(this.formGroup.value.idHospedagem)
          .subscribe(response =>{
            this.hospedagem = response
            loader.dismiss();
            this.confirmaReserva()
          })
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      }) 
  }

  confirmaReserva(){
    let checkIn = this.formGroup.value.checkIn.substr(0, 10).split('-').reverse().join('/')
    let checkOut = this.formGroup.value.checkOut.substr(0, 10).split('-').reverse().join('/')
    let alert = this.alertCtrl.create({
      title: 'Confirmação Reserva!',
      enableBackdropDismiss: false,
      buttons: [
        {text: 'Hospede : ' + this.cliente},
        {text: 'Hospedagem : ' + this.hospedagem.nome},
        {text: 'CheckIn : ' + checkIn},
        {text: 'CheckOut : ' + checkOut},
        {text: 'Número de Hospedes : ' + this.formGroup.value.numeroHospedes},
        {text: 'Qtdade dias : ' + this.difDays(this.formGroup.value.checkIn, this.formGroup.value.checkOut)},
        {text: 'Valor total : ' + this.calculoTotal()},
       
        {
          text: 'Confirmar',
          handler: () => {
            this.insertReserva()
          }
        },
        {
          text: 'Editar',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  insertReserva(){
    let loader = this.presentLoading();
    this.reservaService.insert(this.formGroup.value)
      .subscribe(response =>{
        loader.dismiss();
        this.showInsertOk();
      },
      error =>{
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      })
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

  calculoTotal(): number {
    let diff = this.difDays(this.formGroup.value.checkIn, this.formGroup.value.checkOut)
    let total = 0
    if(this.formGroup.value.numeroHospedes > 2){
      total = (this.hospedagem.valorDiaria + (this.hospedagem.valorHospedeExtra*(this.formGroup.value.numeroHospedes-2)))*diff
    } else {
      total = this.hospedagem.valorDiaria * diff
    }
    if(this.formGroup.value.tipoLimpeza == 1){
      total = total + 50
    }
    total = total - this.formGroup.value.desconto
    return total
  }

  difDays(day1: string, day2: string): number{
    const dateIn = moment(day1, 'YYYY-MM-DD')
    const dateOut = moment(day2, 'YYYY-MM-DD')
    return dateOut.diff(dateIn, 'days')
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
