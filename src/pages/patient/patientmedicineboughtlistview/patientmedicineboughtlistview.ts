import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIName } from '../../../providers/commonfunction/commonfunction';
import { ApiProvider } from '../../../providers/api/api';

/**
 * Generated class for the PatientmedicineboughtlistviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patientmedicineboughtlistview',
  templateUrl: 'patientmedicineboughtlistview.html',
})
export class PatientmedicineboughtlistviewPage {
  item: any=[];
  medicineBoughtListView:any=[];

constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider) {
  this.item = this.navParams.get('item');
}


ionViewDidLoad() {
  let Id={patVisitNoteID:this.item.patVisitNoteID};
  this.api.wsPostHeader(APIName.viewAndEditDoctorVisitPatient,Id).then((resp:any) => {
    if(resp.status === 500) {
      // showToast( resp.error.message, this.toastCtrl)
    }
    else
    {
   //console.log('wsPostHeader : >>',resp);
   this.medicineBoughtListView=resp.data;
    }
}); 
}
showVisit()
{
  //this.navCtrl.push(PatientdoctorvisitlistviewPage);
}

}
