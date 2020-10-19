import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIName } from '../../../providers/commonfunction/commonfunction';
import { ApiProvider } from '../../../providers/api/api';
import { PatientlabreportlistviewPage } from '../patientlabreportlistview/patientlabreportlistview';
import { AddbooklabPage } from '../addbooklab/addbooklab';
import { AddappointmentPage } from '../addappointment/addappointment';
/**
 * Generated class for the PatientlabreportlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patientlabreportlist',
  templateUrl: 'patientlabreportlist.html',
})
export class PatientlabreportlistPage {
  labReportList:any=[];
  labReportListData:any=[];
  labReportNames:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider) {
  }
  ionViewDidLoad() {
  //   this.api.wsPostHeader(APIName.getAllLabReport,'').then((resp:any) => {
  //   console.log('labReportList : >>',resp);
  //   this.labReportListData=resp; 
  //   this.labReportList = this.labReportListData.data;
  // });

  this.api.wsGet(APIName.getAllLabReport, '').then((resp:any) => {
    // let doctorVisitList : any = resp;
    this.labReportListData=resp; 
    this.labReportList = this.labReportListData.data.labReportPojo;
    let element = '';

    // for (let index = 0; index < this.labReportList.length; index++) {
    //   element = '';

    //   for (let index1 = 0; index1 <  this.labReportList[index].reportLapdata.length; index1++) {
    //     console.log('arpit=======>',this.labReportList[index].reportLapdata[index1].labReportsLevel1Pojo.lrl1Name);
    //     element = element + this.labReportList[index].reportLapdata[index1].labReportsLevel1Pojo.lrl1Name;

    //   }
    //   console.log('<=======>',element);
        
    //  this.labReportNames.push(element)

    // }


    console.log("this.labReportNames"+JSON.stringify(this.labReportNames))
   

               });
  
  }

  // removeDuplicates(myArr, prop) {
  //   return myArr.filter((obj, pos, arr) => {
  //     return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  //   });
  // } 
  viewReportList(data)
  {
    console.log(data);
    this.navCtrl.push(PatientlabreportlistviewPage,{item:data});
  }

  addItem(){
    this.navCtrl.push(AddappointmentPage);
    // this.navCtrl.push(AddbooklabPage,{flagType:2});
    

  }
}
