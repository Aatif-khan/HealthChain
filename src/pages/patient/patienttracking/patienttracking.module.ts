import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatienttrackingPage } from './patienttracking';

@NgModule({
  declarations: [
    PatienttrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(PatienttrackingPage),
  ],
})
export class PatienttrackingPageModule {}
