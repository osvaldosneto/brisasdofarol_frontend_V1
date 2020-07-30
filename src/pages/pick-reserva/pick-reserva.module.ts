import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickReservaPage } from './pick-reserva';
import { ClienteService } from '../../services/domain/cliente.service';
import { ReservaService } from '../../services/domain/reserva.service';

@NgModule({
  declarations: [
    PickReservaPage,
  ],
  imports: [
    IonicPageModule.forChild(PickReservaPage),
  ],
  providers: [
    ClienteService,
    ReservaService
  ]
})
export class PickReservaPageModule {}
