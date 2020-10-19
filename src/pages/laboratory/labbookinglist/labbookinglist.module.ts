import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabbookinglistPage } from './labbookinglist';

@NgModule({
  declarations: [
    LabbookinglistPage,
  ],
  imports: [
    IonicPageModule.forChild(LabbookinglistPage),
  ],
})
export class LabbookinglistPageModule {}
