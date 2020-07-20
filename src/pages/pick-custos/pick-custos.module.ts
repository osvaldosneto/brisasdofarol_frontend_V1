import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickCustosPage } from './pick-custos';
import { CustoService } from '../../services/domain/custo.service';

@NgModule({
  declarations: [
    PickCustosPage,
  ],
  imports: [
    IonicPageModule.forChild(PickCustosPage),
  ],
  providers: [
    CustoService
  ]
})
export class PickCustosPageModule {}
