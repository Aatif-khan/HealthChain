import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIName } from '../../../providers/commonfunction/commonfunction';
import { ApiProvider } from '../../../providers/api/api';
import { PatienthospitaladmitlistviewPage } from '../patienthospitaladmitlistview/patienthospitaladmitlistview';

/**
 * Generated class for the PatienthospitaladmitlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patienthospitaladmitlist',
  templateUrl: 'patienthospitaladmitlist.html',
})
export class PatienthospitaladmitlistPage {
  hospitalAdmitList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider) {
  }
  ionViewDidLoad() {
  //   this.api.wsPostHeader(APIName.getAllDoctorVisitPatient,'').then((resp:any) => {
  //   console.log('hospitalAdmitList : >>',resp.data);
  //   this.hospitalAdmitList=resp.data; 
  // });

  this.api.wsGet(APIName.getAllDoctorVisitPatient, '').then((resp:any) => {
    // let doctorVisitList : any = resp;
    this.hospitalAdmitList=resp.data.patVisitNotePojo; 
           });
  }
  viewHospitalAdmitListView(data)
  {
    console.log(data);
    this.navCtrl.push(PatienthospitaladmitlistviewPage,{item:data});
  }

}
