import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientinsurancelistviewPage } from './patientinsurancelistview';

@NgModule({
  declarations: [
    PatientinsurancelistviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientinsurancelistviewPage),
  ],
})
export class PatientinsurancelistviewPageModule {}
