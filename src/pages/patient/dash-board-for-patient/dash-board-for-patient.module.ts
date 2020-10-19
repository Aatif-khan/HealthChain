import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashBoardForPatientPage } from './dash-board-for-patient';

@NgModule({
  declarations: [
    DashBoardForPatientPage,
  ],
  imports: [
    IonicPageModule.forChild(DashBoardForPatientPage),
  ],
})
export class DashBoardForPatientPageModule {}
