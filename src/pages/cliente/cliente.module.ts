import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientePage } from './cliente';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    ClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ClientePage),
  ],
  providers: [
    CidadeService,
    EstadoService
  ]
})
export class ClientePageModule {}
