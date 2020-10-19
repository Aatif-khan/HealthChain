import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIName } from '../../../providers/commonfunction/commonfunction'
import { ApiProvider } from '../../../providers/api/api';
import { ValidationProvider } from '../../../providers/validation/validation';
import { FormBuilder, Validators} from '@angular/forms';
/**
 * Generated class for the TrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {
  tracking:any=[];
  trackingData:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider,private formBuilder: FormBuilder) {
    this.trackingData.packageprepared=false;
    this.trackingData.outfordelivery=false;
    this.trackingData.delivered=false;
    this.tracking = this.formBuilder.group({
      'estimatedtime': ['', []],
      'packageprepared': ['', []],
      'outfordelivery': ['', []],
      'delivered': ['', []]
    });
  }
Submit()
  {
      this.api.wsPostHeader('',this.trackingData).then((resp:any) => {
        if(resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        }
        else
        {
        console.log(resp);
        }
      }); 
  }
Cancel()
{

}
}
