import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-pick-cliente',
  templateUrl: 'pick-cliente.html',
})
export class PickClientePage {

  clientes : ClienteDTO[]
  auxClientes : ClienteDTO[]
  cliente : ClienteDTO
  n : number

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService : ClienteService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.carregaClientes()
  }

  filterCliente(cliente : any){
    if(cliente.target.value < this.n){
      this.auxClientes = this.clientes
    }
    let val = cliente.target.value;
    if(val && val.trim() != ''){
      this.auxClientes = this.auxClientes.filter(cliente =>
        cliente.nome.toLocaleLowerCase().indexOf(val) > -1)
    }
    this.n = val
  }

  carregaClientes(){
    let loader = this.presentLoading();
    this.clienteService.findAll()
      .subscribe(response => {
        this.clientes = response;
        this.auxClientes = response;
        loader.dismiss()
      },
      error => {
        this.navCtrl.setRoot("PrincipalPage");
      });
  }

  getn(){
    return this.n
  }

  editarCliente(cliente_id : string){
    this.navCtrl.push("ShowClientePage", {cliente_id : cliente_id});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
