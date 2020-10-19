import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashBoardForHospitalPage } from './dash-board-for-hospital';

@NgModule({
  declarations: [
    DashBoardForHospitalPage,
  ],
  imports: [
    IonicPageModule.forChild(DashBoardForHospitalPage),
  ],
})
export class DashBoardForHospitalPageModule {}
