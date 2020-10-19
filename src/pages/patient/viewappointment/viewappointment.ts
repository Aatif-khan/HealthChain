import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { ApiProvider } from "../../../providers/api/api";
import {
  APIName,
  selectedRole
} from "../../../providers/commonfunction/commonfunction";
import { AddappointmentPage } from "../addappointment/addappointment";
import { EditappointmentPage } from "../editappointment/editappointment";
import { DatePipe } from "@angular/common";
import { RebookappointmentPage } from "../rebookappointment/rebookappointment";
import { AddPharmaAppointmentPage } from "../addpharmaappointment/addpharmaappointment";
import { AddbooklabPage } from "../addbooklab/addbooklab";
/**
 * Generated class for the ViewappointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-viewappointment",
  templateUrl: "viewappointment.html"
})
export class ViewappointmentPage {
  ViewAppointment: any = [];
  item: any = [];
  selectRole: string;
  setDate: string;
  Date: any; //ViewAppointment.patAppDate
  Time: any; //ViewAppointment.patAppTimeFrom
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
      let petId = { patAppointmentID: this.item.patAppointmentID };

      this.api
        .wsPostHeader(APIName.viewAndEditAppointmentPatient, petId)
        .then((resp: any) => {
          if (resp.status === 500) {
            // showToast( resp.error.message, this.toastCtrl)
          } else {
            this.ViewAppointment = resp.data;
            this.ViewAppointment.facilityCenterType =
              this.ViewAppointment.facilityCenterType +
              " - " +
              this.ViewAppointment.fcLocationName;
            this.Time = this.convertTimeTo(resp.data.patAppTimeFrom);
            this.Date = this.convertDate(resp.data.patAppDate);
          }
        });
    } else if (localStorage.getItem(selectedRole) == "Doctor") {
      let petId = { patAppointmentID: this.item.patAppointmentID };
      this.api
        .wsPostHeader(APIName.viewAndEditAppointmentDoctor, petId)
        .then((resp: any) => {
          if (resp.status === 500) {
            // showToast( resp.error.message, this.toastCtrl)
          } else {
            this.ViewAppointment = resp.data;
            this.ViewAppointment.facilityCenterType =
              this.ViewAppointment.facilityCenterType +
              " - " +
              this.ViewAppointment.fcLocationName;

            this.Time = this.convertTimeTo(resp.data.patAppTimeFrom);
            this.Date = this.convertDate(resp.data.patAppDate);
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
    this.navCtrl.push(EditappointmentPage, { patAppointmentID: id });
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
                        console.log(
                          "wbfbwfbuiwbuiwbfuwb - > " +
                            JSON.stringify(this.ViewAppointment)
                        );
                        this.Time = this.convertTimeTo(
                          resp.data.patAppTimeFrom
                        );
                        this.Date = this.convertDate(resp.data.patAppDate);
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
    if (data.patAppTimeFrom === null) {
      data.patAppTimeFrom = 1524123001;
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
                        this.Time = this.convertTimeTo(
                          resp.data.patAppTimeFrom
                        );
                        this.Date = this.convertDate(resp.data.patAppDate);
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
                        this.Time = this.convertTimeTo(
                          resp.data.patAppTimeFrom
                        );
                        this.Date = this.convertDate(resp.data.patAppDate);
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
                        this.Time = this.convertTimeTo(
                          resp.data.patAppTimeFrom
                        );
                        this.Date = this.convertDate(resp.data.patAppDate);
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
      var dateConvert = new Date(parseInt(date));
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

  bookPharma() {
    this.navCtrl.push(AddPharmaAppointmentPage);
  }

  bookLab() {
    this.navCtrl.push(AddbooklabPage, { flagType: 2 });
  }
}
