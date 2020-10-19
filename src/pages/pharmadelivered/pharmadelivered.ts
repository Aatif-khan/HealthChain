import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";

import { DatePipe } from "@angular/common";
import {
  selectedRole,
  APIName
} from "../../providers/commonfunction/commonfunction";
import { AddappointmentPage } from "../patient/addappointment/addappointment";
import { EditappointmentPage } from "../patient/editappointment/editappointment";
import { ViewappointmentPage } from "../patient/viewappointment/viewappointment";
import { RebookappointmentPage } from "../patient/rebookappointment/rebookappointment";
import { ApiProvider } from "../../providers/api/api";

/**
 * Generated class for the PharmadeliveredPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-pharmadelivered",
  templateUrl: "pharmadelivered.html"
})
export class PharmadeliveredPage {
  zone: any;
  modeKeys: any[];
  appointmentTodayItemes: any = [];
  currentAppointlist: any = [];
  pharmadeliveredlist: any = [];
  selectRole: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    private alertCtrl: AlertController,
    public datepipe: DatePipe
  ) {
    this.currentAppointlist = this.appointmentTodayItemes;
    this.selectRole = localStorage.getItem(selectedRole);

    if (localStorage.getItem(selectedRole) == "Patient") {
      this.api.wsGet(APIName.getpharmadelivered, "").then((resp: any) => {
        // this.appointmentTodayItemes=resp.data.patAppointmentPojo;
        // this.currentAppointlist=resp.data.patAppointmentPojo;
        this.pharmadeliveredlist = resp.data.pharmapojolist;
      });
    } else if (localStorage.getItem(selectedRole) == "Doctor") {
      this.api.wsGet(APIName.getpharmadelivered, "").then((resp: any) => {
        this.appointmentTodayItemes = resp.data.patAppointmentPojo;
        this.currentAppointlist = resp.data.patAppointmentPojo;
      });
  } else if (localStorage.getItem(selectedRole) == "MedicalCenter") {

      this.api.wsGet(APIName.getpharmadeliverdpharma, "").then((resp: any) => {
        this.pharmadeliveredlist = resp.data.pharmapojolist;
      });
   
    }
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PharmadeliveredPage");
  }
  addItem() {
    this.navCtrl.push(AddappointmentPage);
  }
  editItem(id: any) {
    this.navCtrl.push(EditappointmentPage, { patAppointmentID: id });
  }
  changeItem(stateInt: Number) {
    switch (stateInt) {
      case 1:
        this.currentAppointlist = this.appointmentTodayItemes;
        break;
      default:
    }
  }
  openItem(item) {
    this.navCtrl.push(ViewappointmentPage, { item: item });
  }
  Canceled(data) {
    console.log(data);
    let alert = this.alertCtrl.create({
      title: "Alert",
      message: "Are you sure you want to cancel?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Ok",
          handler: () => {
            console.log("Ok clicked");
            let d: any = this.checkNulldata(data);
            let passParam = {
              patientAppointmentStatus: "Cancel",
              id: d.patAppointmentID,
              description: ""
            };
            console.log(JSON.stringify(passParam));
            this.api
              .wsPostHeader(APIName.appointmentStatusChange, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                } else {
                  this.api
                    .wsGetBG(APIName.getAppointmentDoctor, "")
                    .then((resp: any) => {
                      this.appointmentTodayItemes =
                        resp.data.patAppointmentPojo;
                      this.currentAppointlist = resp.data.patAppointmentPojo;
                    });
                }
              });
          }
        }
      ]
    });
    alert.present();
  }
  checkNulldata(data) {
    if (data.fclProviderMapID === null) {
      data.fclProviderMapID = "";
    }
    if (data.specialityID === null) {
      data.specialityID = "";
    }
    if (data.patAppDate === null) {
      data.patAppDate = 1524123001;
    }
    if (data.patAppTimeFrom === null) {
      data.patAppTimeFrom = 1524123001;
    }
    if (data.patAppTimeTo === null) {
      data.patAppTimeTo = 1524123001;
    }
    if (data.patAppType === null) {
      data.patAppType = "New";
    }
    if (data.patAppReason === null) {
      data.patAppReason = "BP";
    }
    if (data.patAppDescription === null) {
      data.patAppDescription = "dsfdsfdf";
    }
    return data;
  }
  Rejected(data) {
    //console.log(data);
    let alert = this.alertCtrl.create({
      title: "Alert",
      message: "Are you sure you want to reject?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: "Ok",
          handler: () => {
            console.log("Ok clicked");

            let d: any = this.checkNulldata(data);
            let passParam = {
              patientAppointmentStatus: "Rejected",
              id: d.patAppointmentID,
              description: ""
            };

            this.api
              .wsPostHeader(APIName.appointmentStatusChange, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                } else {
                  this.api
                    .wsGetBG(APIName.getAppointmentDoctor, "")
                    .then((resp: any) => {
                      this.appointmentTodayItemes =
                        resp.data.patAppointmentPojo;
                      this.currentAppointlist = resp.data.patAppointmentPojo;
                    });
                }
              });
          }
        }
      ]
    });
    alert.present();
  }
  Approved(data) {
    // console.log(data);
    let alert = this.alertCtrl.create({
      title: "Alert",
      message: "Are you sure you want to approve?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {}
        },
        {
          text: "Ok",
          handler: () => {
            let d: any = this.checkNulldata(data);
            let passParam = {
              patientAppointmentStatus: "Approved",
              id: d.patAppointmentID,
              description: ""
            };
            this.api
              .wsPostHeader(APIName.appointmentStatusChange, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                } else {
                  this.api
                    .wsGetBG(APIName.getAppointmentDoctor, "")
                    .then((resp: any) => {
                      this.appointmentTodayItemes =
                        resp.data.patAppointmentPojo;
                      this.currentAppointlist = resp.data.patAppointmentPojo;
                    });
                }
              });
          }
        }
      ]
    });
    alert.present();
  }
  Edit(data) {
    //console.log(data);
    let alert = this.alertCtrl.create({
      title: "Alert",
      message: "Are you sure you want to edit?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: "Ok",
          handler: () => {
            console.log("Ok clicked");
          }
        }
      ]
    });
    alert.present();
  }

  Cancel(data) {
    //console.log(data);
    let alert = this.alertCtrl.create({
      title: "Alert",
      message: "Are you sure you want to cancel?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: "Ok",
          handler: () => {
            console.log("Ok clicked");

            let d: any = this.checkNulldata(data);
            let passParam = {
              patientAppointmentStatus: "Cancel",
              id: d.patAppointmentID,
              description: ""
            };

            this.api
              .wsPostHeader(APIName.appointmentStatusChange, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                } else {
                  this.api
                    .wsGet(APIName.getAppointmentPatient, "")
                    .then((resp: any) => {
                      this.appointmentTodayItemes =
                        resp.data.patAppointmentPojo;
                      this.currentAppointlist = resp.data.patAppointmentPojo;
                    });
                }
              });
          }
        }
      ]
    });
    alert.present();
  }
  ReBook(data) {
    // console.log(data);
    let alert = this.alertCtrl.create({
      title: "Alert",
      message: "Are you sure you want to re-book?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {}
        },
        {
          text: "Ok",
          handler: () => {
            console.log("Ok clicked");
            let d: any = this.checkNulldata(data);
            let id = d.patAppointmentID;
            this.navCtrl.push(RebookappointmentPage, { patAppointmentID: id });
          }
        }
      ]
    });
    alert.present();
  }
  changeStringToDate(dateString: string, format?: string) {
    if (format) {
      console.log(
        "StringToDate==>",
        this.changeDateFormat(new Date(dateString), format)
      );
      return this.changeDateFormat(new Date(dateString), format);
    } else {
      console.log("completeString=>>>>>>", dateString);
      console.log("StringToDate==>", new Date(dateString).toISOString());
      return new Date(dateString).toISOString();
    }
  }

  //date to any format
  changeDateFormat(date: Date, formate?: string) {
    let latest_date = this.datepipe.transform(date, formate);
    console.log("ChangeDateFormat", latest_date);
    return latest_date;
  }
}
