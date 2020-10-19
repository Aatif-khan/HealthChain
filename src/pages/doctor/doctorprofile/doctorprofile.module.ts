import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorprofilePage } from './doctorprofile';

@NgModule({
  declarations: [
    DoctorprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorprofilePage),
  ],
})
export class DoctorprofilePageModule {}
