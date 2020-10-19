import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientinsurancelistPage } from './patientinsurancelist';

@NgModule({
  declarations: [
    PatientinsurancelistPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientinsurancelistPage),
  ],
})
export class PatientinsurancelistPageModule {}
