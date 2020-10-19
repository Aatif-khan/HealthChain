import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliverablesPage } from './deliverables';


@NgModule({
  declarations: [
    DeliverablesPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliverablesPage),
  ],
})
export class DeliverablesPageModule {}
