import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospedagensPage } from './hospedagens';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { HospedagemService } from '../../services/domain/hospedagem.service';

@NgModule({
  declarations: [
    HospedagensPage,
  ],
  imports: [
    IonicPageModule.forChild(HospedagensPage),
  ],
  providers: [
    CidadeService,
    EstadoService,
    HospedagemService
  ]
})
export class HospedagensPageModule {}
