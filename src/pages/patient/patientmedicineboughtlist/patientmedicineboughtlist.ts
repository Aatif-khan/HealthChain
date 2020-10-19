import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { APIName } from '../../../providers/commonfunction/commonfunction';
import { ApiProvider } from '../../../providers/api/api';
import { PatientmedicineboughtlistviewPage } from '../patientmedicineboughtlistview/patientmedicineboughtlistview';

/**
 * Generated class for the PatientmedicineboughtlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patientmedicineboughtlist',
  templateUrl: 'patientmedicineboughtlist.html',
})
export class PatientmedicineboughtlistPage {

  medicineBoughtList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider, private alertCtrl: AlertController) {
  }
  ionViewDidLoad() {
  //   this.api.wsPostHeader(APIName.getAllDoctorVisitPatient,'').then((resp:any) => {
  //   console.log('PatientmedicineboughtlistPage : >>',resp);
  //   this.medicineBoughtList=resp.data; 
  // });
  this.api.wsGet(APIName.getAllDoctorVisitPatient, '').then((resp:any) => {
    // let doctorVisitList : any = resp;
    this.medicineBoughtList=resp.data.patVisitNotePojo;
               });
  
  }
  viewMedicineBoughtList(data)
  {
    console.log(data);
    this.navCtrl.push(PatientmedicineboughtlistviewPage,{item:data});
  }
  Cancel(obj)
  {
      console.log(obj);
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
              //this.navCtrl.push(SignupPage,{item:data});
              // let passParam = {
              //   "patAppointmentID": d.patAppointmentID, "fclProviderMapID": { "fclProviderMapID": d.fclProviderMapID },
              //   "specialityMaster": { "specialityID": d.specialityID },
              //   "patAppDate": d.patAppDate,
              //   "patAppTimeFrom": d.patAppTimeFrom,
              //   "patAppTimeTo": d.patAppTimeTo,
              //   "patAppType": d.patAppType,
              //   "patAppReason": d.patAppReason,
              //   "patAppDescription": d.patAppDescription,
              //   "patAppStatus": "cancel"
              // };
              // console.log(JSON.stringify(passParam));
              // this.api.wsPostHeader(APIName.addOrEditAppointment, passParam).then((resp) => {

              // });
            }
          }
        ]
      });
      alert.present();
  }
  Swipe(obj)
  {
      console.log(obj);
      let alert = this.alertCtrl.create({
        title: 'Alert',
        message: 'Are you sure you want to swipe?',
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
                // let passParam = {
              //   "patAppointmentID": d.patAppointmentID, "fclProviderMapID": { "fclProviderMapID": d.fclProviderMapID },
              //   "specialityMaster": { "specialityID": d.specialityID },
              //   "patAppDate": d.patAppDate,
              //   "patAppTimeFrom": d.patAppTimeFrom,
              //   "patAppTimeTo": d.patAppTimeTo,
              //   "patAppType": d.patAppType,
              //   "patAppReason": d.patAppReason,
              //   "patAppDescription": d.patAppDescription,
              //   "patAppStatus": "cancel"
              // };
              // console.log(JSON.stringify(passParam));
              // this.api.wsPostHeader(APIName.addOrEditAppointment, passParam).then((resp) => {

              // });
            }
          }
        ]
      });
      alert.present();
  }
  Add(obj)
  {
    console.log(obj);
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
}
