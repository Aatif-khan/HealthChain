import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashBoardForMedicalstorePage } from './dash-board-for-medicalstore';

@NgModule({
  declarations: [
    DashBoardForMedicalstorePage,
  ],
  imports: [
    IonicPageModule.forChild(DashBoardForMedicalstorePage),
  ],
})
export class DashBoardForMedicalstorePageModule {}
