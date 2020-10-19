import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { APIName } from "../../../providers/commonfunction/commonfunction";
import { ApiProvider } from "../../../providers/api/api";
import { DatePipe } from "@angular/common";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { AddPharmaAppointmentPage } from "../addpharmaappointment/addpharmaappointment";

/**
 * Generated class for the PatientlabreportlistviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-patientlabreportlistview",
  templateUrl: "patientlabreportlistview.html"
})
export class PatientlabreportlistviewPage {
  item: any = [];
  PatientLabReportListView: any = [];
  DiseaseData: any = [];
  TempDisease: any = [];
  Medicine: any = [];
  TempMedicine: any = [];
  Report: any = [];
  TempReport: any = [];
  imageview: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public photoViewer: PhotoViewer,
    public api: ApiProvider
  ) {
    this.item = this.navParams.get("item");
  }

  ionViewDidLoad() {
    let Id = { reportPatLapAppId: this.item.reportPatLapAppId };
    // let Id={reportPatLapAppId:22};
    this.api.wsPostHeader(APIName.ViewLabReport, Id).then((resp: any) => {
      if (resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      } else {
        //this.ViewAppointment=resp;
        console.log("ViewLabReportView : >>", resp);
        this.PatientLabReportListView = resp.data;

        //  let jdiagnosisMasterData=this.PatientLabReportListView.diagnosisMaster;
        //  for(let i=0;i<jdiagnosisMasterData.length;i++)
        //  {
        //   this.TempDisease.push(jdiagnosisMasterData[i].diagnosiseName);
        //  }
        //  this.DiseaseData=this.TempDisease;

        //  let drugCompoundMasterData=this.PatientLabReportListView.drugCompoundMaster;
        //  for(let i=0;i<drugCompoundMasterData.length;i++)
        //  {
        //   this.TempMedicine.push(drugCompoundMasterData[i].drugCompoundName);
        //  }
        //  this.Medicine=this.TempMedicine;

        //  let labReportsLevelData=this.PatientLabReportListView.labReportsLevel1;
        //  for(let i=0;i<labReportsLevelData.length;i++)
        //  {
        //   this.TempReport.push(labReportsLevelData[i].labReportType);
        //  }
        //  this.Report=this.TempReport;

        // this.ViewAppointment=resp;
      }
    });
  }

  showPhoto(imagePath: any) {
    console.log("showPhoto clicked...", imagePath);
    this.photoViewer.show(imagePath);
  }
  bookPharma() {
    this.navCtrl.push(AddPharmaAppointmentPage);
  }
}
