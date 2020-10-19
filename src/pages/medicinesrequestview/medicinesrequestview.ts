import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { DatePipe } from "@angular/common";
import {
  selectedRole,
  APIName
} from "../../providers/commonfunction/commonfunction";
import { stat } from "fs";
import { DeliverablesPage } from "../deliverables/deliverables";

/**
 * Generated class for the MedicinesrequestviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-medicinesrequestview",
  templateUrl: "medicinesrequestview.html"
})
export class MedicinesrequestviewPage {
  ViewAppointment: any = [];
  item: any = [];
  selectRole: string;
  setDate: string;
  Date: any;
  Time: any;
  apptdate: any;
  appttime: any;
  editItem: any;
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
    console.log(localStorage.getItem(selectedRole));
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
          this.Time = this.convertTimeTo(resp.data.appttime);
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
    } else if (localStorage.getItem(selectedRole) == "MedicalCenter") {
      let petId = { apptid: this.item.apptid };
      console.log("test", petId);
      this.api
        .wsPostHeader(APIName.postmedicinesrequestlistview, petId)
        .then((resp: any) => {
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
  ionViewDidLoad() {
    console.log("ionViewDidLoad MedicinesrequestviewPage");
  }
  Approved(data) {
    // console.log(data);
    let alert = this.alertCtrl.create({
      title: "Confirmation",
      // message: 'Are you sure you want to approve?',
      inputs: [
        {
          name: "Description",
          placeholder: "Description"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: "Save",
          handler: data1 => {
            // console.log('Ok clicked');
            let d: any = this.checkNulldata(data);
            let passParam = {
              // "patAppointmentID": d.patAppointmentID,
              // "patAppStatus": "Approved"
              patientAppointmentStatus: "Approved",
              id: d.apptid,
              description: data1.Description
            };
            this.api
              .wsPostHeader(APIName.postmedicinerequestviewapproved, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                  console.log("call 1");
                  // showToast( resp.error.message, this.toastCtrl)
                } else {
                  console.log("call 2");
                  let petId = { patAppointmentID: this.item.patAppointmentID };
                  this.navCtrl.pop();
                }
              });
          }
        }
      ]
    });
    alert.present();
  }

  Rejected(data) {
    //console.log(data);
    let alert = this.alertCtrl.create({
      title: "Confirmation",

      inputs: [
        {
          name: "Description",
          placeholder: "Description"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: "SAVE",
          handler: data1 => {
            console.log("Ok clicked");
            //this.navCtrl.push(SignupPage,{item:data});
            let d: any = this.checkNulldata(data);
            let passParam = {
              patientAppointmentStatus: "Rejected",
              id: d.apptid,
              description: data1.Description
            };

            this.api
              .wsPostHeader(APIName.postmedicinerequestviewapproved, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                  // showToast( resp.error.message, this.toastCtrl)
                } else {
                  console.log("call 2");
                  let petId = { patAppointmentID: this.item.patAppointmentID };
                  this.navCtrl.pop();
                }
              });
          }
        }
      ]
    });
    alert.present();
  }

  PharmaDeliveres(data) {
    // console.log(data.apptid);
    this.navCtrl.push(DeliverablesPage, { apptid: data.apptid });
  }
  Mediicinetracking(data) {
    var status = data.status;

    var packageChecked = false;
    var deliveryChecked = false;
    var deliveredChecked = false;

    var packageDisabled = false;
    var deliveryDisabled = false;
    var deliveredDisabled = false;

    var statustoset;
    if (status === "Dispatched") {
      packageChecked = true;
      deliveryChecked = true;
      deliveredChecked = false;

      packageDisabled = true;
      deliveryDisabled = true;
      deliveredDisabled = false;

      statustoset = "Completed";
    } else if (status === "Dispatching") {
      packageChecked = false;
      deliveryChecked = false;
      deliveredChecked = false;

      packageDisabled = false;
      deliveryDisabled = true;
      deliveredDisabled = true;

      statustoset = "Prepared";
    } else if (status === "Prepared") {
      packageChecked = true;
      deliveryChecked = false;
      deliveredChecked = false;

      packageDisabled = true;
      deliveryDisabled = false;
      deliveredDisabled = true;

      statustoset = "Dispatched";
    }

    console.log(status);

    let alert = this.alertCtrl.create({
      title: "Medicine Tracking",

      inputs: [
        {
          name: "package",
          type: "checkbox",
          label: "Package Prepared",
          value: "test1",
          checked: packageChecked,
          disabled: packageDisabled
        },
        {
          name: "delivery",
          type: "checkbox",
          label: "Out For Delivery",
          value: "test1",
          checked: deliveryChecked,
          disabled: deliveryDisabled
        },

        {
          name: "delivered",
          type: "checkbox",
          label: "Delivered",
          value: "test1",
          checked: deliveredChecked,
          disabled: deliveredDisabled
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: "Save",
          handler: () => {
            let d: any = this.checkNulldata(data);
            let passParam = {
              apptid: d.apptid,
              status: statustoset
            };
            this.api
              .wsPostHeader(APIName.postmedicinestracking, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                  // showToast( resp.error.message, this.toastCtrl)
                } else {
                  console.log("call 2");
                  // let petId={patAppointmentID:this.item.patAppointmentID};
                  this.navCtrl.pop();
                }
              });
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
}
