import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DoctorprofilepersonalPage } from "../doctorprofilepersonal/doctorprofilepersonal";
import { ProfiledemographicPage } from "../../patient/profiledemographic/profiledemographic";
import { DoctorprofileextendedPage } from "../doctorprofileextended/doctorprofileextended";
import { DoctorprofiledemographicPage } from "../doctorprofiledemographic/doctorprofiledemographic";
import { DoctorprofileprofessionalinfoPage } from "../doctorprofileprofessionalinfo/doctorprofileprofessionalinfo";
import { DoctorprofiledocumentPage } from "../doctorprofiledocument/doctorprofiledocument";
import { ChangepasswordPage } from "../../commonpages/changepassword/changepassword";

/**
 * Generated class for the DoctorprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-doctorprofile",
  templateUrl: "doctorprofile.html"
})
export class DoctorprofilePage {
  tabPersonal: any = DoctorprofilepersonalPage;
  tabProfessional: any = DoctorprofileprofessionalinfoPage;
  tabDemographic: any = DoctorprofiledemographicPage;
  tabExtendedProfile: any = DoctorprofileextendedPage;
  tabChangePassoword: any = ChangepasswordPage;
  tabDocuments: any = DoctorprofiledocumentPage;

  scrollableTabsopts: any = {};

  mySelectedIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DoctorprofilePage");
  }

  refreshScrollbarTabs() {
    this.scrollableTabsopts = { refresh: true };
  }

  switchTabs(pos) {
    this.navCtrl.parent.setlect(pos);
  }
}
