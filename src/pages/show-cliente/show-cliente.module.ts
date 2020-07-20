import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowClientePage } from './show-cliente';
import { ClienteService } from '../../services/domain/cliente.service';

@NgModule({
  declarations: [
    ShowClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ShowClientePage),
  ],
  providers: [
    ClienteService,
  ]
})
export class ShowClientePageModule {}
