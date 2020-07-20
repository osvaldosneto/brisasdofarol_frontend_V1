import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public clienteService : ClienteService) {
  }

  ionViewDidLoad() {
    this.carregaClientes()
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

  carregaClientes(){
    this.clienteService.findAll()
      .subscribe(response => {
        this.clientes = response;
      },
      error => {});
  }

  getn(){
    return this.n
  }

  editarCliente(cliente_id : string){
    this.navCtrl.push("ShowClientePage", {cliente_id : cliente_id});
  }

}
