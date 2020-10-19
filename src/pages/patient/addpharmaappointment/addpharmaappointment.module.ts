import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AddPharmaAppointmentPage } from "./addpharmaappointment";
// import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/compiler/src/core";

@NgModule({
  declarations: [AddPharmaAppointmentPage],
  imports: [IonicPageModule.forChild(AddPharmaAppointmentPage)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AddPharmaAppointmentPageModule {}
