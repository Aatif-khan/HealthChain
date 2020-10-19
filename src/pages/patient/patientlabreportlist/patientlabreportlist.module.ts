import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientlabreportlistPage } from './patientlabreportlist';

@NgModule({
  declarations: [
    PatientlabreportlistPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientlabreportlistPage),
  ],
})
export class PatientlabreportlistPageModule {}
