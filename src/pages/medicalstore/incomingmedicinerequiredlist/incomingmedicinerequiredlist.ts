import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import {
  APIName,
  selectedRole
} from "../../../providers/commonfunction/commonfunction";
import { EditappointmentPage } from "../../patient/editappointment/editappointment";
import { AddappointmentPage } from "../../patient/addappointment/addappointment";
import { ViewappointmentPage } from "../../patient/viewappointment/viewappointment";
import { ApiProvider } from "../../../providers/api/api";
import { MedicinesrequestviewPage } from "../../medicinesrequestview/medicinesrequestview";
import { DatePipe } from "@angular/common";

/**
 * Generated class for the IncomingmedicinerequiredlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-incomingmedicinerequiredlist",
  templateUrl: "incomingmedicinerequiredlist.html"
})
export class IncomingmedicinerequiredlistPage {
  zone: any;
  modeKeys: any[];
  appointmentTodayItems: any = [];
  currentAppointlist: any = [];
  medicinerequestlist: any = [];
  selectRole: string;

  constructor(
    public datepipe: DatePipe,
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    private alertCtrl: AlertController
  ) {
    //localStorage.setItem(selectedRole, 'Patient');
    //localStorage.setItem(selectedRole, 'Doctor');
    this.currentAppointlist = this.appointmentTodayItems;
    this.selectRole = localStorage.getItem(selectedRole);
  }

  ionViewDidLoad() {
    if (localStorage.getItem(selectedRole) == "Patient") {
      this.api.wsPostHeader(APIName.getAppointmentPatient, "").then(resp => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          //console.log('wsPostHeader : >>',resp);
          this.appointmentTodayItems = resp;
          this.currentAppointlist = resp;
        }
      });
    } else if (localStorage.getItem(selectedRole) == "Doctor") {
      this.api.wsPostHeader(APIName.getAppointmentPatient, "").then(resp => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          //console.log('wsPostHeader : >>',resp);
          this.appointmentTodayItems = resp;
          this.currentAppointlist = resp;
        }
      });
    } else if (localStorage.getItem(selectedRole) == "MedicalCenter") {
      this.api.wsGet(APIName.getmedicinesrequest, "").then((resp: any) => {
        this.medicinerequestlist = resp.data.pharmapojolist;
        console.log(resp);
      });
    }
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
        this.currentAppointlist = this.appointmentTodayItems;
        break;
      default:
    }
  }
  openItem(item) {
    this.navCtrl.push(MedicinesrequestviewPage, { item: item });
  }

  Canceled(data) {
    //console.log(data);
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
            let passParam = {
              patAppointmentID: data.patAppointmentID,
              fclProviderMapID: { fclProviderMapID: data.fclProviderMapID },
              specialityMaster: { specialityID: data.specialityID },
              patAppDate: "2018-04-23T10:15:43.511Z",
              patAppTimeFrom: "2018-04-23T10:15:43.511Z",
              patAppTimeTo: "2018-04-23T10:15:43.511Z",
              patAppType: data.patAppType,
              patAppReason: data.patAppReason,
              patAppDescription: data.patAppDescription,
              patAppStatus: "Canceled"
            };
            this.api
              .wsPostHeader(APIName.addOrEditAppointment, passParam)
              .then(resp => {
                if (resp.status === 500) {
                  // showToast( resp.error.message, this.toastCtrl)
                } else {
                  //this.ViewAppointment=resp;
                  console.log("wsPostHeader : >>", resp);
                  if (localStorage.getItem(selectedRole) == "Patient") {
                    this.api
                      .wsPostHeader(APIName.getAppointmentPatient, "")
                      .then(resp => {
                        if (resp.status === 500) {
                          // showToast( resp.error.message, this.toastCtrl)
                        } else {
                          //console.log('wsPostHeader : >>',resp);
                          this.appointmentTodayItems = resp;
                          this.currentAppointlist = resp;
                        }
                      });
                  } else if (localStorage.getItem(selectedRole) == "Doctor") {
                    this.api
                      .wsPostHeader(APIName.getAppointmentPatient, "")
                      .then(resp => {
                        if (resp.status === 500) {
                          // showToast( resp.error.message, this.toastCtrl)
                        } else {
                          //console.log('wsPostHeader : >>',resp);
                          this.appointmentTodayItems = resp;
                          this.currentAppointlist = resp;
                        }
                      });
                  }
                }
              });

            //this.navCtrl.push(SignupPage,{item:data});
          }
        }
      ]
    });
    alert.present();
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
            //this.navCtrl.push(SignupPage,{item:data});
            let passParam = {
              patAppointmentID: data.patAppointmentID,
              fclProviderMapID: { fclProviderMapID: data.fclProviderMapID },
              specialityMaster: { specialityID: data.specialityID },
              patAppDate: "2018-04-23T10:15:43.511Z",
              patAppTimeFrom: "2018-04-23T10:15:43.511Z",
              patAppTimeTo: "2018-04-23T10:15:43.511Z",
              patAppType: data.patAppType,
              patAppReason: data.patAppReason,
              patAppDescription: data.patAppDescription,
              patAppStatus: "Rejected"
            };
            this.api
              .wsPostHeader(APIName.addOrEditAppointment, passParam)
              .then(resp => {
                if (resp.status === 500) {
                  // showToast( resp.error.message, this.toastCtrl)
                } else {
                  //this.ViewAppointment=resp;
                  console.log("wsPostHeader222 : >>", resp);
                  if (localStorage.getItem(selectedRole) == "Patient") {
                    this.api
                      .wsPostHeader(APIName.getAppointmentPatient, "")
                      .then(resp => {
                        if (resp.status === 500) {
                          // showToast( resp.error.message, this.toastCtrl)
                        } else {
                          //console.log('wsPostHeader : >>',resp);
                          this.appointmentTodayItems = resp;
                          this.currentAppointlist = resp;
                        }
                      });
                  } else if (localStorage.getItem(selectedRole) == "Doctor") {
                    this.api
                      .wsPostHeader(APIName.getAppointmentPatient, "")
                      .then(resp => {
                        if (resp.status === 500) {
                          // showToast( resp.error.message, this.toastCtrl)
                        } else {
                          //console.log('wsPostHeader : >>',resp);
                          this.appointmentTodayItems = resp;
                          this.currentAppointlist = resp;
                        }
                      });
                  }
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
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: "Ok",
          handler: () => {
            // console.log('Ok clicked');
            //this.navCtrl.push(SignupPage,{item:data});
            let passParam = {
              patAppointmentID: data.patAppointmentID,
              fclProviderMapID: { fclProviderMapID: data.fclProviderMapID },
              specialityMaster: { specialityID: data.specialityID },
              patAppDate: "2018-04-23T10:15:43.511Z",
              patAppTimeFrom: "2018-04-23T10:15:43.511Z",
              patAppTimeTo: "2018-04-23T10:15:43.511Z",
              patAppType: data.patAppType,
              patAppReason: data.patAppReason,
              patAppDescription: data.patAppDescription,
              patAppStatus: "Approved"
            };
            //console.log(passParam);
            this.api
              .wsPostHeader(APIName.addOrEditAppointment, passParam)
              .then(resp => {
                if (resp.status === 500) {
                  // showToast( resp.error.message, this.toastCtrl)
                } else {
                  //this.ViewAppointment=resp;
                  console.log("wsPostHeader : >>", resp);
                  if (localStorage.getItem(selectedRole) == "Patient") {
                    this.api
                      .wsPostHeader(APIName.getAppointmentPatient, "")
                      .then(resp => {
                        if (resp.status === 500) {
                          // showToast( resp.error.message, this.toastCtrl)
                        } else {
                          //console.log('wsPostHeader : >>',resp);
                          this.appointmentTodayItems = resp;
                          this.currentAppointlist = resp;
                        }
                      });
                  } else if (localStorage.getItem(selectedRole) == "Doctor") {
                    this.api
                      .wsPostHeader(APIName.getAppointmentPatient, "")
                      .then(resp => {
                        if (resp.status === 500) {
                          // showToast( resp.error.message, this.toastCtrl)
                        } else {
                          //console.log('wsPostHeader : >>',resp);
                          this.appointmentTodayItems = resp;
                          this.currentAppointlist = resp;
                        }
                      });
                  }
                }
              });
          }
        }
      ]
    });
    alert.present();
  }
  Addvisit(data) {
    // console.log(data);
    let alert = this.alertCtrl.create({
      title: "Alert",
      message: "Are you sure you want to Add visit?",
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
            //this.navCtrl.push(SignupPage,{item:data});
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
