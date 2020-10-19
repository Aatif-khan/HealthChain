import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AppointmentlistPage } from "../../patient/appointmentlist/appointmentlist";
import { DoctorvisitlistPage } from "../doctorvisitlist/doctorvisitlist";
import { PatientreportsPage } from "../../patientreports/patientreports";
import { ApiProvider } from "../../../providers/api/api";
import {
  APIName,
  selectedRole
} from "../../../providers/commonfunction/commonfunction";
import { count } from "rxjs/operators";
import { TransactionhistoryPage } from "../transactionhistory/transactionhistory";

/**
 * Generated class for the DashBoardForDoctorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-dash-board-for-doctor",
  templateUrl: "dash-board-for-doctor.html"
})
export class DashBoardForDoctorPage {
  appointmentlistcount: any = "";
  doctorvisitlistcount: any = "";
  patientreportlistcount: any = "";


  patientreportlist: any = [];
  transactionHistorycount: any = "";

  diagnosisMaster: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad DashBoardForDoctorPage");

    //API for AppointmentList
    if (localStorage.getItem(selectedRole) == "Patient") {
      this.api.wsGet(APIName.getAppointmentPatient, "").then((resp: any) => {
        this.appointmentlistcount = resp.data.totalNumber;
      });
    } else if (localStorage.getItem(selectedRole) == "Doctor") {
      this.api.wsGet(APIName.getAppointmentDoctor, "").then((resp: any) => {
        this.appointmentlistcount = resp.data.totalNumber;
      });
    }

    //API for DoctorVisitList
    this.api.wsGet(APIName.getDoctorVisitlist, "").then((resp: any) => {
      this.doctorvisitlistcount = resp.data.totalNumber;
    });

    //API for PatientReportList
    this.api.wsGet(APIName.getpatientreports, "").then((resp: any) => {
      this.patientreportlist = resp.data.labReportPojo;
      // this.patientreportlistcount = this.patientreportlist.length();
    });

    //API for Transaction History
    this.api.wsGet(APIName.getTransactionHistory, "").then((resp: any) => {
      this.transactionHistorycount = resp.data.totalNumber;
    });
  }

  viewAppointmentList() {
    this.navCtrl.push(AppointmentlistPage);
  }
  viewDoctorVisitList() {
    this.navCtrl.push(DoctorvisitlistPage);
  }
  viewPatientReportList() {
    this.navCtrl.push(PatientreportsPage);
  }
  viewTransactionList() {
    this.navCtrl.push(TransactionhistoryPage);
  }
}
