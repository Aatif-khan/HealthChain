import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientadmitformPage } from './patientadmitform';

@NgModule({
  declarations: [
    PatientadmitformPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientadmitformPage),
  ],
})
export class PatientadmitformPageModule {}
