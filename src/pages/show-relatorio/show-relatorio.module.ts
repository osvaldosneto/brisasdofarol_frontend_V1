import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowRelatorioPage } from './show-relatorio';
import { ReservaService } from '../../services/domain/reserva.service';
import { CustoService } from '../../services/domain/custo.service';

@NgModule({
  declarations: [
    ShowRelatorioPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowRelatorioPage),
  ],
  providers: [
    CustoService,
    ReservaService
  ]
})
export class ShowRelatorioPageModule {}
