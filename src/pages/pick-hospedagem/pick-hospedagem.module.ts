import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickHospedagemPage } from './pick-hospedagem';
import { HospedagemService } from '../../services/domain/hospedagem.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    PickHospedagemPage,
  ],
  imports: [
    IonicPageModule.forChild(PickHospedagemPage),
  ],
  providers: [
    HospedagemService,
    CidadeService,
    EstadoService,
  ]
})
export class PickHospedagemPageModule {}
