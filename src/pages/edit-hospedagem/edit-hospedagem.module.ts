import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditHospedagemPage } from './edit-hospedagem';
import { HospedagemService } from '../../services/domain/hospedagem.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    EditHospedagemPage,
  ],
  imports: [
    IonicPageModule.forChild(EditHospedagemPage),
  ],
  providers: [
    HospedagemService,
    CidadeService,
    EstadoService,
  ]
})
export class EditHospedagemPageModule {}
