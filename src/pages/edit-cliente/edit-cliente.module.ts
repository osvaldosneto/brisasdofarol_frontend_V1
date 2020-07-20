import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditClientePage } from './edit-cliente';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { ClienteService } from '../../services/domain/cliente.service';

@NgModule({
  declarations: [
    EditClientePage,
  ],
  imports: [
    IonicPageModule.forChild(EditClientePage),
  ],
  providers: [
    CidadeService,
    EstadoService,
    ClienteService
  ]
})
export class EditClientePageModule {}
