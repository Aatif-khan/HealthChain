import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicineinventoryPage } from './medicineinventory';

@NgModule({
  declarations: [
    MedicineinventoryPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicineinventoryPage),
  ],
})
export class MedicineinventoryPageModule {}
