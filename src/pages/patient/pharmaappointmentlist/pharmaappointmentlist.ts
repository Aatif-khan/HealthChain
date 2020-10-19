import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { ApiProvider } from "../../../providers/api/api";
import { ViewappointmentPage } from "../viewappointment/viewappointment";
import {
  APIName,
  selectedRole
} from "../../../providers/commonfunction/commonfunction";
import { AddappointmentPage } from "../addappointment/addappointment";
import { EditappointmentPage } from "../editappointment/editappointment";
import { DatePipe } from "@angular/common";
import { RebookappointmentPage } from "../rebookappointment/rebookappointment";
import { AddPharmaAppointmentPage } from "../addpharmaappointment/addpharmaappointment";
import { PharmaviewPage } from "../../pharmaview/pharmaview";

/**
 * Generated class for the AppointmentlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-appointmentlist",
  templateUrl: "pharmaappointmentlist.html"
})
export class PharmaAppointmentlistPage {
  zone: any;
  modeKeys: any[];
  appointmentTodayItems: any = [];
  currentAppointlist: any = [];
  pharmAppList: any = [];

  selectRole: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    private alertCtrl: AlertController,
    public datepipe: DatePipe
  ) {
    //localStorage.setItem(selectedRole, 'Patient');
    //localStorage.setItem(selectedRole, 'Doctor');
    this.currentAppointlist = this.appointmentTodayItems;
    this.selectRole = localStorage.getItem(selectedRole);
    // if (localStorage.getItem(selectedRole) == 'Patient') {
    //   this.api.wsPostHeader(APIName.getAppointmentPatient, '').then((resp:any) => {
    //     this.appointmentTodayItems = resp.data;
    //     this.currentAppointlist = resp.data;
    //   });

    if (localStorage.getItem(selectedRole) == "Patient") {
      this.api.wsGet(APIName.getPharmaAppointments, "").then((resp: any) => {
        // this.appointmentTodayItems = resp.data.patAppointmentPojo;
        // this.currentAppointlist = resp.data.patAppointmentPojo;
        this.pharmAppList = resp.data.pharmapojolist;
      });
    } else if (localStorage.getItem(selectedRole) == "Doctor") {
      // this.api.wsPostHeader(APIName.getAppointmentDoctor, '').then((resp:any) => {
      //   this.appointmentTodayItems = resp.data;
      //   this.currentAppointlist = resp.data;
      // });

      this.api.wsGet(APIName.getAppointmentDoctor, "").then((resp: any) => {
        // this.appointmentTodayItems = resp.data.patAppointmentPojo;
        // this.currentAppointlist = resp.data.patAppointmentPojo;
        this.pharmAppList = resp.data.pharmapojolist;
      });
    }
  }

  ionViewDidLoad() {}

  addItem() {
    this.navCtrl.push(AddPharmaAppointmentPage);
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
    this.navCtrl.push(PharmaviewPage, { item: item });
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

              // "patAppointmentID": d.patAppointmentID,
              // "patAppStatus": "Cancel",
              // "patAppDescription":''
            };
            console.log(JSON.stringify(passParam));
            this.api
              .wsPostHeader(APIName.appointmentStatusChange, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                  // showToast( resp.error.message, this.toastCtrl)
                } else {
                  // this.api.wsPostHeaderBackground(APIName.getAppointmentDoctor, '').then((resp:any) => {
                  //   this.appointmentTodayItems = resp.data;
                  //   this.currentAppointlist = resp.data;
                  // });
                  this.api
                    .wsGetBG(APIName.getAppointmentDoctor, "")
                    .then((resp: any) => {
                      this.appointmentTodayItems = resp.data.patAppointmentPojo;
                      this.currentAppointlist = resp.data.patAppointmentPojo;
                    });
                }
              });
            //this.navCtrl.push(SignupPage,{item:data});
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
            //this.navCtrl.push(SignupPage,{item:data});
            let d: any = this.checkNulldata(data);
            let passParam = {
              // "patAppointmentID": d.patAppointmentID,
              // "patAppStatus": "Rejected",
              // "patAppDescription":''
              patientAppointmentStatus: "Rejected",
              id: d.patAppointmentID,
              description: ""
            };

            this.api
              .wsPostHeader(APIName.appointmentStatusChange, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                  // showToast( resp.error.message, this.toastCtrl)
                } else {
                  // this.api.wsPostHeaderBackground(APIName.getAppointmentDoctor, '').then((resp:any) => {
                  //   this.appointmentTodayItems = resp.data;
                  //   this.currentAppointlist = resp.data;
                  // });
                  this.api
                    .wsGetBG(APIName.getAppointmentDoctor, "")
                    .then((resp: any) => {
                      this.appointmentTodayItems = resp.data.patAppointmentPojo;
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
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: "Ok",
          handler: () => {
            // console.log('Ok clicked');
            //this.navCtrl.push(SignupPage,{item:data});
            let d: any = this.checkNulldata(data);
            let passParam = {
              // "patAppointmentID": d.patAppointmentID,
              // "patAppStatus": "Approved",
              // "patAppDescription":''
              patientAppointmentStatus: "Approved",
              id: d.patAppointmentID,
              description: ""
            };
            //console.log(passParam);

            this.api
              .wsPostHeader(APIName.appointmentStatusChange, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                  // showToast( resp.error.message, this.toastCtrl)
                } else {
                  // this.api.wsPostHeaderBackground(APIName.getAppointmentDoctor, '').then((resp:any) => {
                  //   this.appointmentTodayItems = resp.data;
                  //   this.currentAppointlist = resp.data;
                  // });
                  this.api
                    .wsGetBG(APIName.getAppointmentDoctor, "")
                    .then((resp: any) => {
                      this.appointmentTodayItems = resp.data.patAppointmentPojo;
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
            //this.navCtrl.push(SignupPage,{item:data});
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
            //this.navCtrl.push(SignupPage,{item:data});
            let d: any = this.checkNulldata(data);
            let passParam = {
              // "patAppointmentID": d.patAppointmentID,
              // "patAppStatus": "Cancel",
              // "patAppDescription":''
              patientAppointmentStatus: "Cancel",
              id: d.patAppointmentID,
              description: ""
            };

            this.api
              .wsPostHeader(APIName.appointmentStatusChange, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                  // showToast( resp.error.message, this.toastCtrl)
                } else {
                  // this.api.wsPostHeaderBackground(APIName.getAppointmentPatient, '').then((resp:any) => {
                  //   this.appointmentTodayItems = resp.data;
                  //   this.currentAppointlist = resp.data;

                  // });

                  this.api
                    .wsGet(APIName.getAppointmentPatient, "")
                    .then((resp: any) => {
                      this.appointmentTodayItems = resp.data.patAppointmentPojo;
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
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: "Ok",
          handler: () => {
            console.log("Ok clicked");
            let d: any = this.checkNulldata(data);
            let id = d.patAppointmentID;
            this.navCtrl.push(RebookappointmentPage, { patAppointmentID: id });

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
