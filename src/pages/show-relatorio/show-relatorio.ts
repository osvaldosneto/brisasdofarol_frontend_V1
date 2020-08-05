import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CustoService } from '../../services/domain/custo.service';
import { ReservaService } from '../../services/domain/reserva.service';

@IonicPage()
@Component({
  selector: 'page-show-relatorio',
  templateUrl: 'show-relatorio.html',
})
export class ShowRelatorioPage {

  datas: any
  custos: any
  reservas: any
  totalReceita : Number
  totalCusto: Number

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public custoSerice: CustoService,
    public reservaService: ReservaService,
    public loadingCtrl: LoadingController) {

      this.datas = this.navParams.get('datas')

  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.custoSerice.findByNome(this.datas)
      .subscribe(response =>{
        this.custos = response
        this.formatData()
      })
    this.reservaService.findByCheckIn(this.datas)
      .subscribe(response =>{
        this.reservas = response
        this.formatDataReserva()
      })
    this.formatDataSearch()
    loader.dismiss();
  }

  formatDataReserva(){
    let soma = 0
    for(let r of this.reservas){
      r.checkIn = (r.checkIn.substr(0, 10).split('-').reverse().join('/'));
      r.checkOut = (r.checkIn.substr(0, 10).split('-').reverse().join('/'));
      soma += Number(r.total)
    }
    this.totalReceita = soma
  }

  formatData(){
    let soma = 0
    for(let c of this.custos){
      c.dataPagamento = (c.dataPagamento.substr(0, 10).split('-').reverse().join('/'));
      soma += Number(c.valor)
    }
    this.totalCusto = soma
  }

  formatDataSearch(){
    this.datas.datainicio = this.datas.datainicio.substr(0, 10).split('-').reverse().join('/')
    this.datas.datafim = this.datas.datafim.substr(0, 10).split('-').reverse().join('/')
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
