import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { APIName,selectedRole } from '../../../providers/commonfunction/commonfunction';
import { AddappointmentPage } from '../../patient/addappointment/addappointment';
import { EditappointmentPage } from '../../patient/editappointment/editappointment';
import { LaboratorviewappoinmentPage } from '../laboratorviewappoinment/laboratorviewappoinment';
import { LabaddreportPage } from '../labaddreport/labaddreport';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the LabincomingappoinmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-labincomingappoinment',
  templateUrl: 'labincomingappoinment.html',
})

export class LabincomingappoinmentPage {

  zone:any;
  modeKeys:any[];
  appointmentTodayItems: any =[];
  labIncomingAppoimentList : any=[];
  labIncomingAppoimentListData : any=[];

  selectRole:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider,private alertCtrl: AlertController,public datepipe: DatePipe) {

  }

ionViewDidLoad() {
    this.labIncomingAppoimentList = this.appointmentTodayItems;
    this.selectRole=localStorage.getItem(selectedRole);
    this.api.wsGet(APIName.laboratoryIncomingBookingRequest,'').then((resp:any) => {
      this.appointmentTodayItems = resp.data.patLabAppointmentsPojo;
      this.labIncomingAppoimentListData = resp.data.patLabAppointmentsPojo;  
      this.labIncomingAppoimentList = resp.data.patLabAppointmentsPojo;  
    });
  
}  
  
  addItem(){
    //this.navCtrl.push(AddappointmentPage);
  }

  editItem(id:any){
     //this.navCtrl.push(EditappointmentPage,{patAppointmentID:id});
  }
changeItem(stateInt:Number){
    switch (stateInt) {
      case 1:
          this.labIncomingAppoimentList = this.appointmentTodayItems;
          break;
      default:

  }
}
openItem(item)
{
  this.navCtrl.push(LaboratorviewappoinmentPage,{item:item});
}

Canceled(data)
{
  //console.log(data);
  let alert = this.alertCtrl.create({
    title: 'Alert',
    message: 'Are you sure you want to cancel?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: () => {
          console.log('Ok clicked');
          let passParam = {
            // "patLabAppointmentID": data.patLabAppointmentID,
            // "patAppStatus": "Cancel"
            "patientAppointmentStatus": "Cancel",
              "id":data.patLabAppointmentID,
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
            this.appointmentTodayItems = resp.data.patLabAppointmentsPojo;
            this.labIncomingAppoimentListData = resp.data.patLabAppointmentsPojo;  
            this.labIncomingAppoimentList = resp.data.patLabAppointmentsPojo;  
          });
        }
          });
        }
      }
    ]
  });
  alert.present();
}
Rejected(data)
{
  //console.log(data);
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
            // "patLabAppointmentID": data.patLabAppointmentID,
            // "patAppStatus": "Rejected",
            // "patLabAppDescription":''
            "patientAppointmentStatus": "Rejected",
            "id":data.patLabAppointmentID,
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
            this.appointmentTodayItems = resp.data.patLabAppointmentsPojo;
            this.labIncomingAppoimentListData = resp.data.patLabAppointmentsPojo;  
            this.labIncomingAppoimentList = resp.data.patLabAppointmentsPojo;  
          });
        }
          });      
        }
      }
    ]
  });
  alert.present();
}
Approved(data)
{
 // console.log(data);
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
          let passParam = {
            // "patLabAppointmentID": data.patLabAppointmentID,
            // "patAppStatus": "Approved",
            // "patLabAppDescription":''
            "patientAppointmentStatus": "Approved",
            "id":data.patLabAppointmentID,
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
            this.appointmentTodayItems = resp.data.patLabAppointmentsPojo;
            this.labIncomingAppoimentListData = resp.data.patLabAppointmentsPojo;  
            this.labIncomingAppoimentList = resp.data.patLabAppointmentsPojo;  
          });
        }
          });
        }
      }
    ]
  });
  alert.present();
}

Add(data)
{
  // console.log(data);
  let alert = this.alertCtrl.create({
    title: 'Alert',
    message: 'Are you sure you want to Add ?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: () => {
          console.log('Ok clicked');
          this.navCtrl.push(LabaddreportPage,{item:data});
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
