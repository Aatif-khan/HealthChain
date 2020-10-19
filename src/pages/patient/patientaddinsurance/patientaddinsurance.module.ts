import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientaddinsurancePage } from './patientaddinsurance';

@NgModule({
  declarations: [
    PatientaddinsurancePage,
  ],
  imports: [
    IonicPageModule.forChild(PatientaddinsurancePage),
  ],
})
export class PatientaddinsurancePageModule {}
