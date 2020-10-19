import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { APIName,selectedRole } from '../../../providers/commonfunction/commonfunction'
import { AddappointmentPage } from '../addappointment/addappointment';
import { EditappointmentPage } from '../editappointment/editappointment';
import { DatePipe } from '@angular/common';
import { RebookappointmentPage } from '../rebookappointment/rebookappointment';
import { AddbooklabPage } from '../addbooklab/addbooklab';
/**
 * Generated class for the ViewpatientbooklabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewpatientbooklab',
  templateUrl: 'viewpatientbooklab.html',
})
export class ViewpatientbooklabPage {

  ViewAppointment:any=[];
  item: any=[];
  selectRole:string;
  setDate:string;
  Date:any; //ViewAppointment.patAppDate
  Time:any; //ViewAppointment.patAppTimeTo
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiProvider,private alertCtrl: AlertController, public datepipe: DatePipe) {
    this.selectRole=localStorage.getItem(selectedRole);
    this.item = this.navParams.get('item');
   // this.item = this.item.patAppointmentID
  //  var obj1  = this.item;
  //  console.log("akslkdjflskjdflkj",obj1.patAppointmentID);
  console.log('kashifa=======',JSON.stringify(this.item));
    if(localStorage.getItem(selectedRole) == 'Patient')
    {
      let petId={patLabAppointmentID:this.item.patLabAppointmentID};

      console.log("rahuldude",""+this.item.patLabAppointmentID);
      
      this.api.wsPostHeader(APIName.viewAndEditLabPatient,petId).then((resp:any) => {
        if(resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        }
        else
        {
      this.ViewAppointment=resp.data;
      this.Time= this.convertTimeTo(resp.data.patLabAppTimeTo);
      this.Date=this.convertDate(resp.data.patLabAppDate);
        }
    }); 
    }
    else if(localStorage.getItem(selectedRole) == 'Doctor')
    {
      let petId={patLabAppointmentID:this.item.patLabAppointmentID};
      this.api.wsPostHeader(APIName.viewAndEditLabPatient,petId).then((resp:any) => {
        if(resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        }
        else
        {
      this.ViewAppointment=resp.data;  
      this.Time= this.convertTimeTo(resp.data.patLabAppTimeTo);
      this.Date=this.convertDate(resp.data.patLabAppDate); 
        }
    }); 
    } 
  }

goBack()
{
    this.navCtrl.pop();
}
ionViewDidLoad()
  {

  }
addItem(){
    this.navCtrl.push(AddbooklabPage,{flagType:2});
  }
editItem(id:any){
  this.navCtrl.push(AddbooklabPage,{obj :this.item,patvisitnoteid:this.item.patVisitNoteID,flagType:1});
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
          let d:any=this.checkNulldata(data)

          
          let passParam = {
            // "patLabAppointmentID": d.patLabAppointmentID,
            // "patAppStatus": "Cancel"
            "patientAppointmentStatus": "Cancel",
            "id":d.patLabAppointmentID,
            "description":''
            };
          this.api.wsPostHeader(APIName.appointmentStatusChange,passParam).then((resp:any) => {
            if(resp.status === 500) {
              // showToast( resp.error.message, this.toastCtrl)
            }
            else
            {
          // let petId={patAppointmentID:this.item.patAppointmentID};
          // this.api.wsPostHeader(APIName.viewAndEditAppointmentDoctor,petId).then((resp:any) => {
          // this.ViewAppointment=resp.data;
          // this.Time= this.convertTimeTo(resp.data.patAppTimeTo);
          // this.Date=this.convertDate(resp.data.patAppDate); 
          // });
            }
          });    
          }
        }
      ]
    });
    alert.present();
  }
checkNulldata(data)
{
  if(data.fclProviderMapID === null){
    data.fclProviderMapID="";
  }
  if(data.specialityID === null){
    data.specialityID="";
  }
  if(data.patAppDate === null){
    data.patAppDate=1524123001;
  }
  if(data.patAppTimeFrom === null){
    data.patAppTimeFrom=1524123001;
  }
  if(data.patAppTimeTo === null){
    data.patAppTimeTo=1524123001;
  }
  if(data.patAppType === null){
    data.patAppType="New";
  }
  if(data.patAppReason === null){
    data.patAppReason="BP";
  }
  if(data.patAppDescription === null){
    data.patAppDescription="dsfdsfdf";
  }

  return data;
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
            let d:any=this.checkNulldata(data)
           
            let passParam = {
              // "patLabAppointmentID": d.patLabAppointmentID,
              // "patAppStatus": "Rejected"
              "patientAppointmentStatus": "Rejected",
              "id":d.patLabAppointmentID,
              "description":''
              };
              this.api.wsPostHeader(APIName.appointmentStatusChange,passParam).then((resp:any) => {
                if(resp.status === 500) {
                  // showToast( resp.error.message, this.toastCtrl)
                }
                else
                {
              this.navCtrl.pop();
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
           // console.log('Ok clicked');
           let d:any=this.checkNulldata(data)
           
           let passParam = {
            // "patLabAppointmentID": d.patLabAppointmentID,
            // "patAppStatus": "Approved"
            "patientAppointmentStatus": "Approved",
            "id":d.patLabAppointmentID,
            "description":''
            };
            this.api.wsPostHeader(APIName.appointmentStatusChange,passParam).then((resp:any) => {
              if(resp.status === 500) {
                // showToast( resp.error.message, this.toastCtrl)
              }
              else
              {
              this.navCtrl.pop();
              }
            }); 
          }
        }
      ]
    });
    alert.present();
  } 

Edit(data)
  {
    //console.log(data);
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
            this.navCtrl.push(AddbooklabPage,{obj :data,patvisitnoteid:data.patVisitNoteID,flagType:1});          }
        }
      ]
    });
    alert.present();
  }
Cancel(data)
  {
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
                }
              
            });
          }
        }
      ]
    });
    alert.present();
  }
ReBook(data)
  {
   // console.log(data);
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: 'Are you sure you want to re-book?',
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
             let d: any = this.checkNulldata(data)
             let id  = d.patAppointmentID
             this.navCtrl.push(AddbooklabPage,{obj :data,patvisitnoteid:data.patVisitNoteID,flagType:3});    
            

             //this.navCtrl.push(SignupPage,{item:data});
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
  var dateTime = new Date(parseInt(time));
  var Hours= dateTime.getUTCHours() ;
  var Minutes= dateTime.getUTCMinutes(); 
  var Seconds= dateTime.getUTCSeconds();
  return Hours+":"+Minutes;
  }
  else
  {
    return "";
  }
}
}
