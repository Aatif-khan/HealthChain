import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientbooklablistPage } from './patientbooklablist';

@NgModule({
  declarations: [
    PatientbooklablistPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientbooklablistPage),
  ],
})
export class PatientbooklablistPageModule {}
