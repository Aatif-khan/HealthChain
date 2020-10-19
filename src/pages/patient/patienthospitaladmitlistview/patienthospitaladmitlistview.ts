import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIName } from '../../../providers/commonfunction/commonfunction';
import { ApiProvider } from '../../../providers/api/api';

/**
 * Generated class for the PatienthospitaladmitlistviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patienthospitaladmitlistview',
  templateUrl: 'patienthospitaladmitlistview.html',
})
export class PatienthospitaladmitlistviewPage {
  item: any=[];
  PatientHospitalAdmitlistView:any=[];
  DiseaseData:any=[];
  TempDisease:any=[];
  Medicine:any=[];
  TempMedicine:any=[];
  Report:any=[];
  TempReport:any=[];
constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider) {
  this.item = this.navParams.get('item');
}


ionViewDidLoad() {
  let Id={patVisitNoteID:this.item.patVisitNoteID};
  this.api.wsPostHeader(APIName.viewAndEditDoctorVisitPatient,Id).then((resp:any) => {
    if(resp.status === 500) {
      // showToast( resp.error.message, this.toastCtrl)
    }
    else
    {
  //this.ViewAppointment=resp;
   console.log('wsPostHeader : >>',resp);
   this.PatientHospitalAdmitlistView=resp.data;

   let jdiagnosisMasterData=this.PatientHospitalAdmitlistView.diagnosisMaster;
   for(let i=0;i<jdiagnosisMasterData.length;i++)
   {
    this.TempDisease.push(jdiagnosisMasterData[i].diagnosiseName);       
   }
   this.DiseaseData=this.TempDisease;

   
   let drugCompoundMasterData=this.PatientHospitalAdmitlistView.drugCompoundMaster;
   for(let i=0;i<drugCompoundMasterData.length;i++)
   {
    this.TempMedicine.push(drugCompoundMasterData[i].drugCompoundName);       
   }
   this.Medicine=this.TempMedicine;


   let labReportsLevelData=this.PatientHospitalAdmitlistView.labReportsLevel1;
   for(let i=0;i<labReportsLevelData.length;i++)
   {
    this.TempReport.push(labReportsLevelData[i].labReportType);       
   }
   this.Report=this.TempReport;

 // this.ViewAppointment=resp;
  }
}); 
}
claimInsurance()
{
  //this.navCtrl.push(PatientdoctorvisitlistviewPage);
}

}
