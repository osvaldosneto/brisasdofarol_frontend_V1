import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendemailPage } from './sendemail';
import { ClienteService } from '../../services/domain/cliente.service';

@NgModule({
  declarations: [
    SendemailPage,
  ],
  imports: [
    IonicPageModule.forChild(SendemailPage),
  ],
  providers: [
    ClienteService,
  ]
})
export class SendemailPageModule {}
