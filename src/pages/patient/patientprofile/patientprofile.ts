import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ProfiledemographicPage } from "../profiledemographic/profiledemographic";
import { PatientprofiledocumentsPage } from "../patientprofiledocuments/patientprofiledocuments";

import { PatientprofilepersonalPage } from "../patientprofilepersonal/patientprofilepersonal";
import { PatientprofileextendedPage } from "../patientprofileextended/patientprofileextended";
import { ChangepasswordPage } from "../../commonpages/changepassword/changepassword";

/**
 * Generated class for the PatientprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-patientprofile",
  templateUrl: "patientprofile.html"
})
export class PatientprofilePage {
  // @ViewChild('ionTabs') tabRef: Tabs;

 
  tabPersonal: any = PatientprofilepersonalPage;
  tabDemographic: any = ProfiledemographicPage;
  tabExtendedProfile: any = PatientprofileextendedPage;
  tabDocuments: any = PatientprofiledocumentsPage;
  tabChangePassoword: any = ChangepasswordPage;

  scrollableTabsopts: any = {};

  mySelectedIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PatientprofilePage");
  }

  refreshScrollbarTabs() {
    this.scrollableTabsopts = { refresh: true };
  }

  switchTabs(pos) {
    this.navCtrl.parent.setlect(pos);
  }
}
