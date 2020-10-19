import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentlistPage } from './appointmentlist';

@NgModule({
  declarations: [
    AppointmentlistPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentlistPage),
  ],
  exports:[
    AppointmentlistPage
  ]
})
export class AppointmentlistPageModule {
  
}
