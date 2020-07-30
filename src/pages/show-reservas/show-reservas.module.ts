import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowReservasPage } from './show-reservas';
import { ReservaService } from '../../services/domain/reserva.service';

@NgModule({
  declarations: [
    ShowReservasPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowReservasPage),
  ],
  providers: [
    ReservaService
  ]
})
export class ShowReservasPageModule {}
