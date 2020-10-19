import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { APIName } from '../../../providers/commonfunction/commonfunction'
import { DoctorvisitlistviewPage } from '../doctorvisitlistview/doctorvisitlistview';
import { DoctorAddOrEditVisitPage } from '../doctor-add-or-edit-visit/doctor-add-or-edit-visit';
//import { DoctorvisitdetailPage } from '../doctorvisitdetail/doctorvisitdetail';
/**
 * Generated class for the DoctorvisitlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctorvisitlist',
  templateUrl: 'doctorvisitlist.html',
})
export class DoctorvisitlistPage {
  visitlist: any = [];
  diagnosisMaster: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
  }


  openItem(item)
  {
    this.navCtrl.push(DoctorvisitlistviewPage,{item:item});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorvisitlistPage');
    //    alert("resp::--- ");
    //console.log("APIName.getAppointmentPatient>>> "+APIName.getAppointmentPatient);
    // this.api.wsPostHeader(APIName.getDoctorVisitlist, '').then((resp:any) => {
    //   //this.ViewAppointment=resp;
    //   console.log('getDoctorVisitlist : >>', JSON.stringify(resp.data));
    //   this.diagnosisMaster = resp.data;
    //   console.log(this.diagnosisMaster);
    //   this.visitlist = resp.data;

    // });

    this.api.wsGet(APIName.getDoctorVisitlist, '').then((resp:any) => {
      console.log('getDoctorVisitlist : >>', JSON.stringify(resp.data));
        this.diagnosisMaster = resp.data.patVisitNotePojo;
        console.log(this.diagnosisMaster);
        this.visitlist = resp.data.patVisitNotePojo; 
     });
    
  }
  addItem()
{
this.navCtrl.push(DoctorAddOrEditVisitPage);
}

}
