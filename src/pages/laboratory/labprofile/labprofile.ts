import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LabprofilelaboratoryPage } from "../labprofilelaboratory/labprofilelaboratory";
import { LabprofiledemographicPage } from "../labprofiledemographic/labprofiledemographic";
import { LabprofileprofessionalinfoPage } from "../labprofileprofessionalinfo/labprofileprofessionalinfo";
import { ChangepasswordPage } from "../../commonpages/changepassword/changepassword";
import { LabprofiledocumentPage } from "../labprofiledocument/labprofiledocument";

/**
 * Generated class for the LabprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-labprofile",
  templateUrl: "labprofile.html"
})
export class LabprofilePage {
  tabLaboratory: any = LabprofilelaboratoryPage;
  tabDemographic: any = LabprofiledemographicPage;
  tabChangePassoword: any = ChangepasswordPage;
  tabDocuments: any = LabprofiledocumentPage;

  scrollableTabsopts: any = {};

  mySelectedIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LabprofilePage");
  }

  refreshScrollbarTabs() {
    this.scrollableTabsopts = { refresh: true };
  }

  switchTabs(pos) {
    this.navCtrl.parent.setlect(pos);
  }
}
