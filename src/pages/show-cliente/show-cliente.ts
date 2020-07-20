import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-show-cliente',
  templateUrl: 'show-cliente.html',
})
export class ShowClientePage {

  cliente : any

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let id = this.navParams.get('cliente_id');
    this.clienteService.findById(id)
      .subscribe(response => {
        this.cliente = response
        this.formatDataReserva();
      },
      error => {});
  }

  formatDataReserva(){
    for(let r of this.cliente.reservas){
      r.checkIn = (r.checkIn.substr(0, 10).split('-').reverse().join('/'));
      r.checkOut = (r.checkIn.substr(0, 10).split('-').reverse().join('/'));
    }
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
    this.clienteService.delete(this.cliente.id)
      .subscribe(repsponse =>{
        this.navCtrl.push("PrincipalPage");
      },
      error => {});
  }

  editarCliente(){
    this.navCtrl.push("EditClientePage", {cliente_id : this.cliente.id});
  }

}
