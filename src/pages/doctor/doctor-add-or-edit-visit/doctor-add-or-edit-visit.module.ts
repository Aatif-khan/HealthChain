import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorAddOrEditVisitPage } from './doctor-add-or-edit-visit';

@NgModule({
  declarations: [
    DoctorAddOrEditVisitPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorAddOrEditVisitPage),
  ],
})
export class DoctorAddOrEditVisitPageModule {}
