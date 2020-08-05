import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ReservaService } from '../../services/domain/reserva.service';

@IonicPage()
@Component({
  selector: 'page-show-cliente',
  templateUrl: 'show-cliente.html',
})
export class ShowClientePage {

  cliente : any
  reservas: any
  total : Number

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public clienteService: ClienteService,
    public reservaService: ReservaService,
    public loadingCtrl: LoadingController){

  }

  ionViewDidLoad() {
    let id = this.navParams.get('cliente_id');
    this.clienteService.findById(id)
      .subscribe(response => {
        this.cliente = response
        console.log("Id Cliente : " + this.navParams.get('cliente_id'))
        this.reservaService.findByNome(this.navParams.get('cliente_id'))
          .subscribe(response =>{
            this.reservas = response
            this.formatDataReserva();
          })
      },
      error => {
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  formatDataReserva(){
    let soma = 0
    for(let r of this.reservas){
      r.checkIn = (r.checkIn.substr(0, 10).split('-').reverse().join('/'));
      r.checkOut = (r.checkIn.substr(0, 10).split('-').reverse().join('/'));
      soma += Number(r.total)
    }
    this.total = soma
  }

  deleteCliente(){
    this.showDeleteOk()
  }

  showDeleteOk() {
    let alert = this.alertCtrl.create({
      title: 'Deletando Cliente!',
      message: 'Você tem certeza que deseja excluir o cliente ' + this.cliente.nome,
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
      message: 'Cliente deletado com sucesso',
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
    let loader = this.presentLoading();
    this.clienteService.delete(this.cliente.id)
      .subscribe(repsponse =>{
        loader.dismiss();
        this.navCtrl.push("PrincipalPage");
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  editarCliente(){
    this.navCtrl.push("EditClientePage", {cliente_id : this.cliente.id});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
