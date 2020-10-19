import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import {APIName, selectedRole } from '../../../providers/commonfunction/commonfunction'
import { LabaddreportPage } from '../labaddreport/labaddreport';
import { DeliverablesPage } from '../../deliverables/deliverables';
import { AddreportPage } from '../../addreport/addreport';



@IonicPage()
@Component({
  selector: 'page-laboratorviewappoinment',
  templateUrl: 'laboratorviewappoinment.html',
})

export class LaboratorviewappoinmentPage {

  viewLabAppointment:any = [];
  item: any = [];
  selectRole: string;
  Date:any; //ViewAppointment.patAppDate
  Time:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public api:ApiProvider, 
    private alertCtrl: AlertController) 
    {

    this.selectRole = localStorage.getItem(selectedRole);
    this.item = this.navParams.get('item');
  }

  goBack(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {  
      let petId = {patLabAppointmentID: this.item.patLabAppointmentID};
      console.log(petId)
      this.api.wsPostHeader(APIName.viewAndEditLaboratory, petId)
      .then((resp:any) => {
        if(resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        }
        else
        {
      this.viewLabAppointment = resp.data;
      console.log(this.viewLabAppointment)
      this.Time= this.convertTimeTo(resp.data.patLabAppTimeTo);
      this.Date=this.convertDate(resp.data.patLabAppDate); 
        }
    });  
  }

  Canceled(data)
  {
    //console.log(data);
    let alert = this.alertCtrl.create({
      title: 'Confirmation',

      inputs: [
        {
          name: "Description",
          placeholder: "Description"
        }
      ],
      // message: 'Are you sure you want to cancel?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'save',
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
                this.Time= this.convertTimeTo(resp.data.patLabAppTimeTo);
                this.Date=this.convertDate(resp.data.patLabAppDate); 
                let petId = { patLabAppointmentID: this.item.patLabAppointmentID };
                this.navCtrl.pop();
            // console.log('resp>>>>'+resp);
            // this.api.wsGet(APIName.getAllLab, '').then((resp:any) => 
            // {
            //   console.log(resp);
            //   this.viewLabAppointment = resp.data;
            //   console.log(this.viewLabAppointment);
            //   this.Time= this.convertTimeTo(resp.data.patLabAppTimeTo);
            //   this.Date=this.convertDate(resp.data.patLabAppDate); 
            // });
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
      title: 'Confirmation',

      inputs: [
        {
          name: "Description",
          placeholder: "Description"
        }
      ],
      // message: 'Are you sure you want to reject?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: () => {
            console.log('Ok clicked');
            let passParam = {
              // "patLabAppointmentID": data.patLabAppointmentID,
              // "patAppStatus": "Rejected"
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
                this.Time= this.convertTimeTo(resp.data.patLabAppTimeTo);
                this.Date=this.convertDate(resp.data.patLabAppDate); 
                let petId = { patLabAppointmentID: this.item.patLabAppointmentID };
                this.navCtrl.pop();
            console.log('resp>>>>'+resp);
            // this.api.wsGet(APIName.getAllLab, '').then((resp:any) => {
            //   console.log(resp);
            //   this.viewLabAppointment = resp.data;
            //   console.log(this.viewLabAppointment);
            //   this.Time= this.convertTimeTo(resp.data.patLabAppTimeTo);
            //   this.Date=this.convertDate(resp.data.patLabAppDate); 
            // });
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
      title: 'Confirmation',
    
      // message: 'Are you sure you want to approve?',
      inputs: [
        {
          name: "Description",
          placeholder: "Description"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: () => {
            console.log('Ok clicked');
            let passParam = {
              // "patLabAppointmentID": data.patLabAppointmentID,
              // "patAppStatus": "Approved"
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
                this.Time= this.convertTimeTo(resp.data.patLabAppTimeTo);
                this.Date=this.convertDate(resp.data.patLabAppDate); 
                let petId = { patLabAppointmentID: this.item.patLabAppointmentID };
                this.navCtrl.pop();
            console.log('resp>>>>'+resp);
            // this.api.wsGet(APIName.getAllLab, '').then((resp:any) => 
            // {
            //   console.log(resp);
            //   this.viewLabAppointment = resp.data;
            //   console.log(this.viewLabAppointment);
               
           
             
            // });
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
    title: 'Confirmation',
    inputs: [
      {
        name: "Description",
        placeholder: "Description"
      }
    ],
      // message: 'Are you sure you want to Add?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: () => {
            console.log('Ok clicked');
            this.navCtrl.push(LabaddreportPage,{item:data});
          }
        }
      ]
    });
    alert.present();
  }
  convertDate(date)
{
  if(date)
  {
    var dateConvert = new Date(parseInt(date));
    var Year= dateConvert.getUTCFullYear();
    var Month=dateConvert.getUTCMonth()+1;
    var Day=dateConvert.getUTCDate();
    return Day+"-"+Month+"-"+Year;
  }
  else
  {
    return "";
  }
}
convertTimeTo(time)
{
  if(time)
  {
  // var dateTime = new Date(parseInt(time));
  var dateTime = new Date(time);
  // var Hours= dateTime.getUTCHours() ;
  // var Minutes= dateTime.getUTCMinutes(); 
  // var Seconds= dateTime.getUTCSeconds();
  var Hours= dateTime.getHours() ;
  var Minutes= dateTime.getMinutes(); 
  var Seconds= dateTime.getSeconds();

  return Hours+":"+Minutes;
  }
  else
  {
    return "";
  }
}
Addleboratryreport()
{
  this.navCtrl.push(AddreportPage);
}
}
