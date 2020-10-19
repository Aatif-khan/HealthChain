import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientreportsPage } from './patientreports';

@NgModule({
  declarations: [
    PatientreportsPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientreportsPage),
  ],
})
export class PatientreportsPageModule {}
