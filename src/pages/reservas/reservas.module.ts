import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservasPage } from './reservas';
import { ClienteService } from '../../services/domain/cliente.service';
import { HospedagemService } from '../../services/domain/hospedagem.service';
import { ReservaService } from '../../services/domain/reserva.service';

@NgModule({
  declarations: [
    ReservasPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservasPage),
  ],
  providers: [
    ClienteService,
    HospedagemService,
    ReservaService,
  ]
})
export class ReservasPageModule {}
