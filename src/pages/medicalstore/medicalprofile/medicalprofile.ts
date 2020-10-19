import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MedicalprofilebasicdetailPage } from "../medicalprofilebasicdetail/medicalprofilebasicdetail";
import { MedicalprofiledemographicPage } from "../medicalprofiledemographic/medicalprofiledemographic";
import { MedicalprofileprofessionalPage } from "../medicalprofileprofessional/medicalprofileprofessional";
import { ChangepasswordPage } from "../../commonpages/changepassword/changepassword";
import { MedicalchangepasswordPage } from "../medicalchangepassword/medicalchangepassword";
import { MedicalstoreprofiledocumentPage } from "../../medicalstore/medicalstoreprofiledocument/medicalstoreprofiledocument";

/**
 * Generated class for the MedicalprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-medicalprofile",
  templateUrl: "medicalprofile.html"
})
export class MedicalprofilePage {
  tabPersonal: any = MedicalprofilebasicdetailPage;
  tabDemographic: any = MedicalprofiledemographicPage;
  tabProfessional: any = MedicalprofileprofessionalPage;
  tabChangePassoword: any = MedicalchangepasswordPage;
  tabDocuments: any = MedicalstoreprofiledocumentPage;

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
