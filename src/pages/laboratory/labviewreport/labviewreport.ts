import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import{APIName, selectedRole } from '../../../providers/commonfunction/commonfunction'

/**
 * Generated class for the LabviewreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-labviewreport',
  templateUrl: 'labviewreport.html',
})

export class LabviewreportPage {
  viewReportDetails:any=[];
  item: any=[];
  selectRole:string;
  attachedReportArr: any;
  storeReportData:any=[];
  storeDisease:any=[];
  allDiseaseName:string;
  reportName:any=[];
  allReportlist:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiProvider,private alertCtrl: AlertController) {
    this.selectRole=localStorage.getItem(selectedRole);
    this.item = this.navParams.get('item');
  }

  goBack(){
    this.navCtrl.pop();
  }

  ionViewDidLoad()
  {
      let patientId = {reportPatLapAppId: this.item.reportPatLapAppId};
      this.api.wsPostHeader(APIName.LabViewLabReport, patientId).then((resp:any) => {
        //this.ViewAppointment=resp;
        // console.log('wsPostHeader : >>',resp);
        this.viewReportDetails = resp.data;
        //this.viewReportDetails = this.item
       // console.log('Amit : >>', this.viewReportDetails);
       if(resp.data.reportLapdata.length > 0)
       {
           console.log("here 1");
           for(let i=0;resp.data.reportLapdata.length>i;i++)
           {
              let report={extraDetail:resp.data.reportLapdata[i].extraDetail,reportPath:resp.data.reportLapdata[i].reportPath};
              this.storeReportData.push(report);
              this.reportName.push(resp.data.reportLapdata[i].labReportsLevel1Pojo.lrl1Name);
              //console.log(resp.data.reportLapdata[i].labReportsLevel1Pojo.lrl1Name);
              for(let j=0;resp.data.reportLapdata[i].diagnosisMasterdata.length>j;j++)
              {
                // let Dise={diagnosisID:resp.data.reportLapdata[i].diagnosisMasterdata[j].diagnosisID,diagnosiseName:resp.data.reportLapdata[i].diagnosisMasterdata[j].diagnosiseName}
                this.storeDisease.push(resp.data.reportLapdata[i].diagnosisMasterdata[j].diagnosiseName);
              }
              
           }
          // console.log(this.storeReportData);
          // console.log(this.storeDisease);
          // console.log(this.reportName);
       }
       this.allDiseaseName=this.storeDisease;
      this.allReportlist=this.reportName;
    }, (err) => {
      this.viewReportDetails = this.item

      //console.log('Amit : >>', this.viewReportDetails);
    });  
  }
  downloadFile(item :any){
    let path = APIName.downloadfilepationteport+item;
    let exits = APIName.existspationreport+item;
    this.api.wsGet(exits, "").then((resp: any) => {
      if(resp.status === 500){
        alert("error");
      } else {
        console.log("Resp= ",resp);
        window.open(path, '_blank');
      }
    }).catch((err: any) => {
     alert("error");
    });
  }
  clickOnAssociatedVisitButton(data)
  {
   // console.log(data);
      let alert = this.alertCtrl.create({
      title: 'Alert',
      message: 'Are you sure you want to Add visit?',
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
            //this.navCtrl.push(SignupPage,{item:data});
          }
        }
      ]
    });
    alert.present();
  }


}