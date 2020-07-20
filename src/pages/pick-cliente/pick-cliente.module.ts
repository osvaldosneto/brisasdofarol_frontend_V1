import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickClientePage } from './pick-cliente';
import { ClienteService } from '../../services/domain/cliente.service';

@NgModule({
  declarations: [
    PickClientePage,
  ],
  imports: [
    IonicPageModule.forChild(PickClientePage),
  ],
  providers: [
    ClienteService
  ]
})
export class PickClientePageModule {}
