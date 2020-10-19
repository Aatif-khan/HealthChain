
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { APIName,selectedRole } from '../../../providers/commonfunction/commonfunction';
import { AddappointmentPage } from '../../patient/addappointment/addappointment';
import { EditappointmentPage } from '../../patient/editappointment/editappointment';
import { LabviewreportPage } from '../labviewreport/labviewreport';
import { LabaddreportPage } from '../labaddreport/labaddreport';  
  
@IonicPage()
@Component({
  selector: 'page-labreport',
  templateUrl: 'labreport.html',
})
  
  export class LabreportPage {
  
    zone:any;
    modeKeys:any[];
    appointmentTodayItems: any =[];
    currentLabReportList : any=[];
    storeReportData:any=[];
    reportName:any;
    storeDisease:any;
    allDiseaseName:string;
    allReportlist:string;
    constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider,private alertCtrl: AlertController) {
    }
  
  ionViewDidLoad() {
        // this.api.wsPostHeader(APIName.getAllLabReportWithoutBook,'').then((resp:any) => {         
        //   this.appointmentTodayItems = resp.data;
        //   this.currentLabReportList = resp.data;       
        // });

        this.api.wsGet(APIName.getAllLabReportWithoutBook,'').then((resp:any) => {
          this.appointmentTodayItems = resp.data.labReportPojo;
          this.currentLabReportList = resp.data.labReportPojo;  
        });
    }
    
    addItem(){
      this.navCtrl.push(LabaddreportPage);
    }
  

  changeItem(stateInt:Number){
      switch (stateInt) {
        case 1:
            this.currentLabReportList = this.appointmentTodayItems;
            break;
        default:
  
    }
  }
  openItem(item)
  {
    this.navCtrl.push(LabviewreportPage,{item:item});
  }
  
  }
  