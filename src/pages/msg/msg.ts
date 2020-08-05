import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-msg',
  templateUrl: 'msg.html',
})
export class MsgPage {

  clientes : ClienteDTO[]
  auxClientes : ClienteDTO[]
  cliente : ClienteDTO
  n : number

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.carregaClientes()
  }

  carregaClientes(){
    let loader = this.presentLoading();
    this.clienteService.findAll()
      .subscribe(response => {
        this.clientes = response;
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  filterCliente(cliente : any){
    if(cliente.target.value < this.n){
      this.carregaClientes()
    }
    let val = cliente.target.value;
    if(val && val.trim() != ''){
      this.clientes = this.clientes.filter(cliente =>
        cliente.nome.toLocaleLowerCase().indexOf(val) > -1)
    }
    this.n = val
  }

  getn(){
    return this.n
  }

  enviarEmailCliente(cliente_id : string){
    this.navCtrl.push("SendemailPage", {cliente_id : cliente_id});
  }

  sendAll(){
    this.navCtrl.push("SendemailallPage")
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
