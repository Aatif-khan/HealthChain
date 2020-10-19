import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { APIName, selectedRole } from '../../../providers/commonfunction/commonfunction';
import { ApiProvider } from '../../../providers/api/api';

/**
 * Generated class for the LabbookinglistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-labbookinglist',
  templateUrl: 'labbookinglist.html',
})
export class LabbookinglistPage {
  labbookinglist:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.api.wsGet(APIName.laboratoryIncomingBookingRequest, '').then((resp:any) => {
      console.log(resp);
      this.labbookinglist = resp.data.patLabAppointmentsPojo;
    });
  }
  openItem(d)
  {
    // this.navCtrl.push(PatientdoctorvisitlistviewPage,{item:data});
  }
  Canceled(d)
  {
    console.log(d);
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: 'Are you sure you want to cancel?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');
            let passParam = {
              "patientAppointmentStatus": "Cancel",
              "id":d.patLabAppointmentID,
              "description":''

              // "patLabAppointmentID": d.patLabAppointmentID,
              // "patAppStatus": "Cancel"
            };
            console.log(JSON.stringify(passParam));
            this.api.wsPostHeader(APIName.labStatusChange, passParam).then((resp:any) => {
              if(resp.status === 500) {
                // showToast( resp.error.message, this.toastCtrl)
              }
              else
              {
            console.log('resp>>>>'+resp);
            this.api.wsGet(APIName.laboratoryIncomingBookingRequest, '').then((resp:any) => {
              console.log(resp);
              this.labbookinglist = resp.data.patLabAppointmentsPojo;
            });
          }
            });
          }
        }
      ]
    });
    alert.present();
  }
  editItem(d)
  {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: 'Are you sure you want to edit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');
            //this.navCtrl.push(SignupPage,{item:data});
          }
        }
      ]
    });
    alert.present();
  }
  Add(d)
  {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: 'Are you sure you want to add?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');
            //this.navCtrl.push(SignupPage,{item:data});
          }
        }
      ]
    });
    alert.present();
  }
  Rejected(d)
  {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: 'Are you sure you want to reject?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');
            let passParam = {
              // "patLabAppointmentID": d.patLabAppointmentID,
              // "patAppStatus": "Rejected"
              "patientAppointmentStatus": "Rejected",
              "id":d.patLabAppointmentID,
              "description":''
            };
            console.log(JSON.stringify(passParam));
            this.api.wsPostHeader(APIName.labStatusChange, passParam).then((resp:any) => {
              if(resp.status === 500) {
                // showToast( resp.error.message, this.toastCtrl)
              }
              else
              {
            console.log('resp>>>>'+resp);
            this.api.wsGet(APIName.laboratoryIncomingBookingRequest, '').then((resp:any) => {
              console.log(resp);
              this.labbookinglist = resp.data.patLabAppointmentsPojo;
            });
          }
            });
          }
        }
      ]
    });
    alert.present();
  }
  Approved(d)
  {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: 'Are you sure you want to approve?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');
            let passParam = {
              // "patLabAppointmentID": d.patLabAppointmentID,
              // "patAppStatus": "Approved"
              "patientAppointmentStatus": "Approved",
              "id":d.patLabAppointmentID,
              "description":''
            };
            console.log(JSON.stringify(passParam));
            this.api.wsPostHeader(APIName.labStatusChange, passParam).then((resp:any) => {
              if(resp.status === 500) {
                // showToast( resp.error.message, this.toastCtrl)
              }
              else
              {
            console.log('resp>>>>'+resp);
            this.api.wsGet(APIName.laboratoryIncomingBookingRequest, '').then((resp:any) => {
              console.log(resp);
              this.labbookinglist = resp.data.patLabAppointmentsPojo;
            });
          }
            });
          }
        }
      ]
    });
    alert.present();
  }
}
