import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { APIName, showToast } from '../../../providers/commonfunction/commonfunction';
import { InsurancebasicdetailPage } from '../insurancebasicdetail/insurancebasicdetail';
import { InsuranceprofiledemographicPage } from '../insuranceprofiledemographic/insuranceprofiledemographic';
import { InsuranceprofileprofessionalPage } from '../insuranceprofileprofessional/insuranceprofileprofessional';
import { InsurancechangepasswordPage } from '../insurancechangepassword/insurancechangepassword';

/**
 * Generated class for the InsuranceprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insuranceprofile',
  templateUrl: 'insuranceprofile.html',
})
export class InsuranceprofilePage {

  tabPersonal: any = InsurancebasicdetailPage;
  tabDemographic: any = InsuranceprofiledemographicPage;
  tabProfessional: any = InsuranceprofileprofessionalPage;
  tabChangePassoword: any = InsurancechangepasswordPage;

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
