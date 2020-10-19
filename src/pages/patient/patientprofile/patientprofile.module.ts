import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientprofilePage } from './patientprofile';

@NgModule({
  declarations: [
    PatientprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(PatientprofilePage),
    
  ],
})
export class PatientprofilePageModule {}
