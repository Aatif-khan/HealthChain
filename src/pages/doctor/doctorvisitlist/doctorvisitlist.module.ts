import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorvisitlistPage } from './doctorvisitlist';

@NgModule({
  declarations: [
    DoctorvisitlistPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorvisitlistPage),
  ],
})
export class DoctorvisitlistPageModule {}
