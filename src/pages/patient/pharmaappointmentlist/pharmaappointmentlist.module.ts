import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PharmaAppointmentlistPage } from "./pharmaappointmentlist";

@NgModule({
  declarations: [PharmaAppointmentlistPage],
  imports: [IonicPageModule.forChild(PharmaAppointmentlistPage)],
  exports: [PharmaAppointmentlistPage]
})
export class PharmaAppointmentlistPageModule {}
