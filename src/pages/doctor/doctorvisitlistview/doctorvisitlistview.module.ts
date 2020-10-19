import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorvisitlistviewPage } from './doctorvisitlistview';

@NgModule({
  declarations: [
    DoctorvisitlistviewPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorvisitlistviewPage),
  ],
})
export class DoctorvisitlistviewPageModule {}
