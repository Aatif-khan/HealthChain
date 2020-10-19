import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{APIName} from '../../../providers/commonfunction/commonfunction'
import { ApiProvider } from '../../../providers/api/api';
import { PatientclaimedinsurancelistviewPage } from '../patientclaimedinsurancelistview/patientclaimedinsurancelistview';

/**
 * Generated class for the PatientclaimedinsurancelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patientclaimedinsurancelist',
  templateUrl: 'patientclaimedinsurancelist.html',
})
export class PatientclaimedinsurancelistPage {
  ClaimedInsuranceList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider) {
  }

  ionViewDidLoad() {
  //   this.api.wsPostHeader(APIName.getAllDoctorVisitPatient,'').then((resp:any) => {
  //   console.log('doctorVisitList : >>',resp);
  //   this.ClaimedInsuranceList=resp.data; 
  // });
  this.api.wsGet(APIName.getAllDoctorVisitPatient, '').then((resp:any) => {
    this.ClaimedInsuranceList=resp.data.patVisitNotePojo
  });
  }
  viewClaimedInsuranceListView(data)
  {
    console.log(data);
    this.navCtrl.push(PatientclaimedinsurancelistviewPage,{item:data});
  }

}
