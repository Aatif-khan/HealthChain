import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicalprofilePage } from './medicalprofile';

@NgModule({
  declarations: [
    MedicalprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(MedicalprofilePage),
  ],
})
export class MedicalprofilePageModule {}
