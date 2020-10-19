import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import {
  selectedRole,
  APIName
} from "../../providers/commonfunction/commonfunction";
import { AddappointmentPage } from "../patient/addappointment/addappointment";
import { EditappointmentPage } from "../patient/editappointment/editappointment";
import { RebookappointmentPage } from "../patient/rebookappointment/rebookappointment";
import { ApiProvider } from "../../providers/api/api";
import { DatePipe } from "@angular/common";
import { EditPharmaAppointmentPage } from "../patient/editpharmaappointment/editpharmaappointment";

/**
 * Generated class for the PharmaviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-pharmaview",
  templateUrl: "pharmaview.html"
})
export class PharmaviewPage {
  ViewAppointment: any = [];
  item: any = [];
  selectRole: string;
  setDate: string;
  Date: any; //ViewAppointment.patAppDate
  Time: any; //ViewAppointment.patAppTimeTo
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    private alertCtrl: AlertController,
    public datepipe: DatePipe
  ) {
    this.selectRole = localStorage.getItem(selectedRole);
    this.item = this.navParams.get("item");
    console.log("POP");
    console.log(this.item);
    if (localStorage.getItem(selectedRole) == "Patient") {
      let petId = { apptid: this.item.apptid };

      this.api.wsPostHeader(APIName.getpharmaview, petId).then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          this.ViewAppointment = resp.data;
          this.ViewAppointment.facilityCenterType =
            this.ViewAppointment.facilityCenterType +
            " - " +
            this.ViewAppointment.fcLocationName;

          let timediff: number = resp.data.appttime - 19800000;

          this.Time = this.convertTimeTo(timediff);
          this.Date = this.convertDate(resp.data.apptdate);
        }
      });
    } else if (localStorage.getItem(selectedRole) == "Doctor") {
      let petId = { apptid: this.item.apptid };

      this.api.wsPostHeader(APIName.getpharmaview, petId).then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          this.ViewAppointment = resp.data;
          this.ViewAppointment.facilityCenterType =
            this.ViewAppointment.facilityCenterType +
            " - " +
            this.ViewAppointment.fcLocationName;

          this.Time = this.convertTimeTo(resp.data.appttime);
          this.Date = this.convertDate(resp.data.apptdate);
        }
      });
    }
  }
  goBack() {
    this.navCtrl.pop();
  }
  ionViewDidLoad() {}
  addItem() {
    this.navCtrl.push(AddappointmentPage);
  }
  editItem(id: any) {
    this.navCtrl.push(EditPharmaAppointmentPage, { apptID: id });
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
            let d: any = this.checkNulldata(data);
            let passParam = {
              // "patAppointmentID": d.patAppointmentID,
              // "patAppStatus": "Cancel"
              patientAppointmentStatus: "Cancel",
              id: d.patAppointmentID,
              description: ""
            };
            this.api
              .wsPostHeader(APIName.getpharmaview, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                  // showToast( resp.error.message, this.toastCtrl)
                } else {
                  let petId = { patAppointmentID: this.item.patAppointmentID };
                  this.api
                    .wsPostHeader(APIName.viewAndEditAppointmentDoctor, petId)
                    .then((resp: any) => {
                      if (resp.status === 500) {
                        // showToast( resp.error.message, this.toastCtrl)
                      } else {
                        this.ViewAppointment = resp.data;
                        console.log(
                          "wbfbwfbuiwbuiwbfuwb - > " +
                            JSON.stringify(this.ViewAppointment)
                        );
                        this.Time = this.convertTimeTo(resp.data.appttime);
                        this.Date = this.convertDate(resp.data.apptdate);
                      }
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
              // "patAppointmentID": d.patAppointmentID,
              // "patAppStatus": "Rejected"
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
                  let petId = { patAppointmentID: this.item.patAppointmentID };
                  this.api
                    .wsPostHeader(APIName.viewAndEditAppointmentDoctor, petId)
                    .then((resp: any) => {
                      if (resp.status === 500) {
                        // showToast( resp.error.message, this.toastCtrl)
                      } else {
                        this.ViewAppointment = resp.data;
                        this.Time = this.convertTimeTo(resp.data.appttime);
                        this.Date = this.convertDate(resp.data.apptdate);
                      }
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
            let d: any = this.checkNulldata(data);
            let passParam = {
              // "patAppointmentID": d.patAppointmentID,
              // "patAppStatus": "Approved"
              patientAppointmentStatus: "Approved",
              id: d.patAppointmentID,
              description: ""
            };
            this.api
              .wsPostHeader(APIName.appointmentStatusChange, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                  // showToast( resp.error.message, this.toastCtrl)
                } else {
                  let petId = { patAppointmentID: this.item.patAppointmentID };
                  this.api
                    .wsPostHeader(APIName.viewAndEditAppointmentDoctor, petId)
                    .then((resp: any) => {
                      if (resp.status === 500) {
                        // showToast( resp.error.message, this.toastCtrl)
                      } else {
                        this.ViewAppointment = resp.data;
                        this.Time = this.convertTimeTo(resp.data.appttime);
                        this.Date = this.convertDate(resp.data.apptdate);
                      }
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
              // "patAppStatus": "Cancel"
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
                  let petId = { patAppointmentID: this.item.patAppointmentID };
                  this.api
                    .wsPostHeader(APIName.viewAndEditAppointmentDoctor, petId)
                    .then((resp: any) => {
                      if (resp.status === 500) {
                        // showToast( resp.error.message, this.toastCtrl)
                      } else {
                        this.ViewAppointment = resp.data;
                        this.Time = this.convertTimeTo(resp.data.appttime);
                        this.Date = this.convertDate(resp.data.apptdate);
                      }
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
          }
        }
      ]
    });
    alert.present();
  }
  convertDate(date) {
    if (date) {
      var dateConvert = new Date(date);
      var Year = dateConvert.getUTCFullYear();
      var Month = dateConvert.getUTCMonth() + 1;
      var Day = dateConvert.getUTCDate();
      return Day + "-" + Month + "-" + Year;
    } else {
      return "";
    }
  }
  convertTimeTo(time) {
    if (time) {
      // var dateTime = new Date(parseInt(time));
      var dateTime = new Date(time);
      // var Hours= dateTime.getUTCHours() ;
      // var Minutes= dateTime.getUTCMinutes();
      // var Seconds= dateTime.getUTCSeconds();
      var Hours = dateTime.getHours();
      var Minutes = dateTime.getMinutes();
      var Seconds = dateTime.getSeconds();

      return Hours + ":" + Minutes;
    } else {
      return "";
    }
  }
}
