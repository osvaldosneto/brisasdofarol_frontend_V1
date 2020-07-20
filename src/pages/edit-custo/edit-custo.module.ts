import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCustoPage } from './edit-custo';
import { CustoService } from '../../services/domain/custo.service';

@NgModule({
  declarations: [
    EditCustoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCustoPage),
  ],
  providers: [
    CustoService
  ]
})
export class EditCustoPageModule {}
