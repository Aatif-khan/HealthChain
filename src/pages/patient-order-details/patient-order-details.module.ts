import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientOrderDetailsPage } from './patient-order-details';

@NgModule({
  declarations: [
    PatientOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientOrderDetailsPage),
  ],
})
export class PatientOrderDetailsPageModule {}
