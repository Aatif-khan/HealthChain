import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIName } from '../../../providers/commonfunction/commonfunction';
import { ApiProvider } from '../../../providers/api/api';
import { PatientinsurancelistviewPage } from '../patientinsurancelistview/patientinsurancelistview';

/**
 * Generated class for the PatientinsurancelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patientinsurancelist',
  templateUrl: 'patientinsurancelist.html',
})
export class PatientinsurancelistPage {

  insuranceList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider) {
  }
  ionViewDidLoad() {
  //   this.api.wsPostHeader(APIName.getAllDoctorVisitPatient,'').then((resp:any) => {
  //   console.log('insuranceList : >>',resp.data);
  //   this.insuranceList=resp.data; 
  // });
  this.api.wsGet(APIName.getAllDoctorVisitPatient, '').then((resp:any) => {
    // let doctorVisitList : any = resp;
    this.insuranceList=resp.data.patVisitNotePojo; 
             });
  }
  viewInsuranceList(data)
  {
    console.log(data);
    this.navCtrl.push(PatientinsurancelistviewPage,{item:data});
  }

}
