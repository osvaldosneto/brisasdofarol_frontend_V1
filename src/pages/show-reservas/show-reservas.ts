import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ReservaService } from '../../services/domain/reserva.service';

@IonicPage()
@Component({
  selector: 'page-show-reservas',
  templateUrl: 'show-reservas.html',
})
export class ShowReservasPage {

  reservas: any[]
  total: Number
  id : string

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public reservaService: ReservaService) {

      this.reservas = this.navParams.get('reservas')

  }

  ionViewDidLoad() {
    this.formatDataReserva();
  }

  formatDataReserva(){
    let soma = 0
    for(let r of this.reservas){
      r.checkIn = (r.checkIn.substr(0, 10).split('-').reverse().join('/'));
      r.checkOut = (r.checkOut.substr(0, 10).split('-').reverse().join('/'));
      soma += Number(r.total)
    }
    this.total = soma
  }

  removeReserva(id: string){
    this.id = id
    this.showDeleteOk()
  }

  showDeleteOk() {
    let alert = this.alertCtrl.create({
      title: 'Deletando Reserva!',
      message: 'Você tem certeza que deseja excluir está reserva!!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.confirmaDeleta()
            this.showDeletado()
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
      message: 'Custo deletado com sucesso',
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
    this.reservaService.delete(this.id)
      .subscribe(repsponse =>{
        this.navCtrl.push("PrincipalPage");
      },
      error => {
        this.navCtrl.setRoot("HomePage");
      });
  }

}
