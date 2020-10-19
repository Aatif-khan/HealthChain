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
import { ApiProvider } from "../../../providers/api/api";
import { AddbooklabPage } from "../addbooklab/addbooklab";
import { ViewpatientbooklabPage } from "../viewpatientbooklab/viewpatientbooklab";
import { DatePipe } from "@angular/common";

/**
 * Generated class for the PatientbooklablistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-patientbooklablist",
  templateUrl: "patientbooklablist.html"
})
export class PatientbooklablistPage {
  lablist: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    private alertCtrl: AlertController,
    public datepipe: DatePipe
  ) {}

  ionViewDidLoad() {
    // this.api.wsPostHeader(APIName.getAllLabPatient, '').then((resp:any) => {
    //   console.log(resp);
    //   this.lablist = resp.data;
    // });

    this.api.wsGet(APIName.getAllLabPatient, "").then((resp: any) => {
      console.log(resp);
      this.lablist = resp.data.patLabAppointmentsPojo;
    });
  }
  openItem(d) {
    console.log("rahilobj===>", d);
    this.navCtrl.push(ViewpatientbooklabPage, { item: d });
  }
  Cancel(d) {
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
            let passParam = {
              // "patLabAppointmentID": d.patLabAppointmentID,
              // "patAppStatus": "Cancel"
              patientAppointmentStatus: "Cancel",
              id: d.patLabAppointmentID,
              description: ""
            };
            console.log(JSON.stringify(passParam));
            this.api
              .wsPostHeader(APIName.labStatusChange, passParam)
              .then((resp: any) => {
                if (resp.status === 500) {
                  // showToast( resp.error.message, this.toastCtrl)
                } else {
                  console.log("resp>>>>" + resp);
                  // this.api.wsPostHeader(APIName.getAllLabPatient, '').then((resp:any) => {
                  // console.log(resp);
                  // this.lablist = resp.data;
                  // });

                  this.api
                    .wsGet(APIName.getAllLabPatient, "")
                    .then((resp: any) => {
                      console.log(resp);
                      this.lablist = resp.data.patLabAppointmentsPojo;
                    });
                }
              });
          }
        }
      ]
    });
    alert.present();
  }
  editItem(d) {
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
            this.navCtrl.push(AddbooklabPage, {
              obj: d,
              patvisitnoteid: d.patVisitNoteID,
              flagType: 1
            });
          }
        }
      ]
    });
    alert.present();
  }
  Rebook(d) {
    let alert = this.alertCtrl.create({
      title: "Alert",
      message: "Are you sure you want to rebook?",
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
            this.navCtrl.push(AddbooklabPage, {
              obj: d,
              patvisitnoteid: d.patVisitNoteID,
              flagType: 3
            });

            //this.navCtrl.push(SignupPage,{item:data});
          }
        }
      ]
    });
    alert.present();
  }

  addItem() {
    // this.navCtrl.push(AddbooklabPage,{flag:2});
    this.navCtrl.push(AddbooklabPage, { flagType: 2 });
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
