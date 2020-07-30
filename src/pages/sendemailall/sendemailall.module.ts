import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendemailallPage } from './sendemailall';
import { ClienteService } from '../../services/domain/cliente.service';

@NgModule({
  declarations: [
    SendemailallPage,
  ],
  imports: [
    IonicPageModule.forChild(SendemailallPage),
  ],
  providers: [
    ClienteService,
  ]
})
export class SendemailallPageModule {}
