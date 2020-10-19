import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientdoctorvisitlistPage } from './patientdoctorvisitlist';

@NgModule({
  declarations: [
    PatientdoctorvisitlistPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientdoctorvisitlistPage),
  ],
})
export class PatientdoctorvisitlistPageModule {}
