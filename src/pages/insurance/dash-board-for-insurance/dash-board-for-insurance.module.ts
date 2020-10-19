import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashBoardForInsurancePage } from './dash-board-for-insurance';

@NgModule({
  declarations: [
    DashBoardForInsurancePage,
  ],
  imports: [
    IonicPageModule.forChild(DashBoardForInsurancePage),
  ],
})
export class DashBoardForInsurancePageModule {}
