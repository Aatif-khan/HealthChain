import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HospitalprofiledemographicPage } from '../hospitalprofiledemographic/hospitalprofiledemographic';
import { HospitalprofileprofessionalPage } from '../hospitalprofileprofessional/hospitalprofileprofessional';
import { HospitalchangepasswordPage } from '../hospitalchangepassword/hospitalchangepassword';
import { HospitalbasicdetailPage } from '../hospitalbasicdetail/hospitalbasicdetail';

/**
 * Generated class for the HospitalprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hospitalprofile',
  templateUrl: 'hospitalprofile.html',
})
export class HospitalprofilePage {

  tabPersonal: any = HospitalbasicdetailPage;
  tabDemographic: any = HospitalprofiledemographicPage;
  tabProfessional: any = HospitalprofileprofessionalPage;
  tabChangePassoword: any = HospitalchangepasswordPage;

  scrollableTabsopts: any = {};

  mySelectedIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorprofilePage');
  }

  refreshScrollbarTabs() {
    this.scrollableTabsopts = { refresh: true };
  }

  switchTabs(pos) {
    this.navCtrl.parent.setlect(pos);
  }
}
