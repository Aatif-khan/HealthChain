import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PatientdoctorvisitlistPage } from "../patientdoctorvisitlist/patientdoctorvisitlist";
import { PatientlabreportlistPage } from "../patientlabreportlist/patientlabreportlist";
import { PharmadeliveredPage } from "../../pharmadelivered/pharmadelivered";
import { ApiProvider } from "../../../providers/api/api";
import {
  APIName,
  selectedRole
} from "../../../providers/commonfunction/commonfunction";
import { FCM } from "@ionic-native/fcm";
import { LocalNotifications } from "@ionic-native/local-notifications";
/**
 * Generated class for the DashBoardForPatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-dash-board-for-patient",
  templateUrl: "dash-board-for-patient.html"
})
export class DashBoardForPatientPage {
  visitlistcount: any = "";
  patientlablistcount: any = "";
  pharmadeliverlistcount: any = "";

  selectRole: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public localNotifications: LocalNotifications,
    public fcm: FCM
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad DashBoardForPatientPage");

    //API for visitList
    this.api.wsGet(APIName.getAllDoctorVisitPatient, "").then((resp: any) => {
      let doctorVisitList: any = resp;
      this.visitlistcount = doctorVisitList.data.totalNumber;
    });

    //API for patientLabList
    this.api.wsGet(APIName.getAllLabReport, "").then((resp: any) => {
      let doctorVisitList: any = resp;
      this.patientlablistcount = doctorVisitList.data.totalNumber;
    });

    //API For PharmaDeliveredList

    this.selectRole = localStorage.getItem(selectedRole);

    if (localStorage.getItem(selectedRole) == "Patient") {
      this.api.wsGet(APIName.getpharmadelivered, "").then((resp: any) => {
        // this.appointmentTodayItemes=resp.data.patAppointmentPojo;
        // this.currentAppointlist=resp.data.patAppointmentPojo;
        this.pharmadeliverlistcount = resp.data.totalNumber;
      });
    } else if (localStorage.getItem(selectedRole) == "Doctor") {
      this.api.wsGet(APIName.getpharmadelivered, "").then((resp: any) => {
        // this.= resp.data.patAppointmentPojo;
        this.pharmadeliverlistcount = resp.data.totalNumber;
      });
    }
  }

  viewVisitList() {
    this.navCtrl.push(PatientdoctorvisitlistPage);
  }
  viewLaboratoryReportList() {
    this.navCtrl.push(PatientlabreportlistPage);
  }
  viewPharmaDeliverdList() {
    this.navCtrl.push(PharmadeliveredPage);
  }

  singlenotification() {
    this.fcm.onNotification().subscribe(resp => {
      // showToast("on notification call " + resp, this.toastCtrl);
      console.log("on notification call : ");

      console.log("Respomse : " + resp);
      const myObjStr = JSON.stringify(resp);
      console.log("response:" + myObjStr);
      alert("on notification" + myObjStr);

      this.localNotifications.schedule({
        // id: 1,
        title: resp.title,
        text: resp.body
      });
      //this.singlenotification();
      // if (resp.wasTapped) {
      //   showToast("Received in background", this.toastCtrl);
      //   console.log("Received in background");
      // } else {
      //   showToast("Received in foreground", this.toastCtrl);
      //   console.log("Received in foreground");
      // }
    });
  }
}
