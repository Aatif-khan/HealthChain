import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{APIName} from '../../../providers/commonfunction/commonfunction'
import { ApiProvider } from '../../../providers/api/api';
import { PatientdoctorvisitlistviewPage } from '../patientdoctorvisitlistview/patientdoctorvisitlistview';
/**
 * Generated class for the PatientdoctorvisitlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patientdoctorvisitlist',
  templateUrl: 'patientdoctorvisitlist.html',
})
export class PatientdoctorvisitlistPage {
  doctorVisitList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider) {
    // this.api.wsPostHeader(APIName.getAllDoctorVisitPatient,'').then((resp) => {
    //   //console.log('doctorVisitList : >>',JSON.stringify(resp));
    //   let doctorVisitList : any = resp;
    //   this.doctorVisitList=doctorVisitList.data; 
    // });

    this.api.wsGet(APIName.getAllDoctorVisitPatient, '').then((resp:any) => {
      let doctorVisitList : any = resp;
        this.doctorVisitList=doctorVisitList.data.patVisitNotePojo;
           });
  }

  ionViewDidLoad() {
  }
  viewVisitList(data)
  {
    this.navCtrl.push(PatientdoctorvisitlistviewPage,{item:data});
  }

}
