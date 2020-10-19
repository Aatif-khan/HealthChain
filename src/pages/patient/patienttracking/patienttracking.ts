import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIName } from '../../../providers/commonfunction/commonfunction'
import { ApiProvider } from '../../../providers/api/api';
/**
 * Generated class for the PatienttrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patienttracking',
  templateUrl: 'patienttracking.html',
})
export class PatienttrackingPage {
  trackingData:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider) {

    // this.api.wsPostHeader('',this.trackingData).then((resp:any) => {
    //   console.log(resp);
    // }); 
}

}
