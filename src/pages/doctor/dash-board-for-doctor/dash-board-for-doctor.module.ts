import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashBoardForDoctorPage } from './dash-board-for-doctor';

@NgModule({
  declarations: [
    DashBoardForDoctorPage,
  ],
  imports: [
    IonicPageModule.forChild(DashBoardForDoctorPage),
  ],
})
export class DashBoardForDoctorPageModule {}
