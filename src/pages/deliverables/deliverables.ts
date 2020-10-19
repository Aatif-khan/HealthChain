import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIName } from '../../providers/commonfunction/commonfunction';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the DeliverablesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deliverables',
  templateUrl: 'deliverables.html',
})
export class DeliverablesPage {

  
  item: any = [];
  public data:any;
  public id = "";
  public patientname = "";
  public visittype = "";
  public medicineRequired = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public api: ApiProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliverablesPage');
    this.id = this.navParams.get("apptid");
  
    
    var data1 = {
      apptid: this.id
    };
    this.api
      .wsPostHeader(APIName.postmedicinesrequestlistview, data1)
    
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {

          this.data=resp.data;
          console.log(this.data);
          this.patientname = resp.data.patientName;
          this.visittype = resp.data.visittype;
          this.medicineRequired=resp.data.medname;

        }
      });
  }

  test(data){
    this.patientname = data;
  }

  cancel(data)
  {
    
      console.log('Cancel clicked');
      this.navCtrl.pop();
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
  save()
  {
       console.log("save call");
    let d:any=this.checkNulldata(this.data)
    let passParam = {
        
      "status": "Dispatching",
      "apptid":d.apptid
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

