import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustoPage } from './custo';
import { CustoService } from '../../services/domain/custo.service';

@NgModule({
  declarations: [
    CustoPage,
  ],
  imports: [
    IonicPageModule.forChild(CustoPage),
  ],
  providers: [
    CustoService
  ]
})
export class CustoPageModule {}
