import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LabreportPage } from "../labreport/labreport";
import { ApiProvider } from "../../../providers/api/api";
import { APIName } from "../../../providers/commonfunction/commonfunction";
import { LabtransactionhistoryPage } from "../labtransactionhistory/labtransactionhistory";

/**
 * Generated class for the LaboratorydashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-laboratorydashboard",
  templateUrl: "laboratorydashboard.html"
})
export class LaboratorydashboardPage {
  viewPatientReportListCount: any = "";
  appointmentTodayItems: any = [];
  currentLabReportList: any = [];
  transactionHistorycount: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LaboratorydashboardPage");

    this.api.wsGet(APIName.getAllLabReportWithoutBook, "").then((resp: any) => {
      this.appointmentTodayItems = resp.data.labReportPojo;
      this.viewPatientReportListCount = resp.data.totalNumber;
    });
    //API for Transaction History
    this.api.wsGet(APIName.getAllLabTransaction, "").then((resp: any) => {
      this.appointmentTodayItems = resp.data.patLabAppointmentsPojo;
      this.transactionHistorycount = resp.data.totalNumber;
    });
  }

  // API for PatientReportList
  viewPatientReportList() {
    this.navCtrl.push(LabreportPage);
  }
  viewTransactionList() {
    this.navCtrl.push(LabtransactionhistoryPage);
  }
}
