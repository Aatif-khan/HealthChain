import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabincomingappoinmentPage } from './labincomingappoinment';

@NgModule({
  declarations: [
    LabincomingappoinmentPage,
  ],
  imports: [
    IonicPageModule.forChild(LabincomingappoinmentPage),
  ],
  exports:[
    LabincomingappoinmentPage
  ]
})
export class LabincomingappoinmentPageModule {}



