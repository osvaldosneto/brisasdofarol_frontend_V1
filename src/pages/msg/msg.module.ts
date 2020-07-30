import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsgPage } from './msg';
import { ClienteService } from '../../services/domain/cliente.service';

@NgModule({
  declarations: [
    MsgPage,
  ],
  imports: [
    IonicPageModule.forChild(MsgPage),
  ],
  providers: [
    ClienteService
  ]
})
export class MsgPageModule {}
