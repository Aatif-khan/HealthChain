import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PharmaviewPage } from './pharmaview';

@NgModule({
  declarations: [
    PharmaviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PharmaviewPage),
  ],
})
export class PharmaviewPageModule {}
