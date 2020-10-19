import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { APIName } from "../../../providers/commonfunction/commonfunction";
import { ApiProvider } from "../../../providers/api/api";

/**
 * Generated class for the DoctorvisitlistviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-doctorvisitlistview",
  templateUrl: "doctorvisitlistview.html"
})
export class DoctorvisitlistviewPage {
  item: any = [];
  PatientDoctorVisitlistView: any = [];
  DiseaseData: any = [];
  TempDisease: any = [];
  Medicine: any = [];
  TempMedicine: any = [];
  Report: any = [];
  Report1: any = [];
  refferedDoctor: any = [];
  lrl1Name: any = [];
  TempReport: any = [];
  TempReport1: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider
  ) {
    this.item = this.navParams.get("item");
    let Id = { patVisitNoteID: this.item.patVisitNoteID };
    this.api
      .wsPostHeader(APIName.viewAndEditDoctorVisit, Id)
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          console.log(resp);
          let response: any = resp;
          this.PatientDoctorVisitlistView = response.data;
          let jdiagnosisMasterData = this.PatientDoctorVisitlistView
            .diagnosisMaster;

          if (jdiagnosisMasterData.length > 0) {
            for (let i = 0; i < jdiagnosisMasterData.length; i++) {
              this.TempDisease.push(jdiagnosisMasterData[i].diagnosiseName);
            }
            this.DiseaseData = this.TempDisease;
          } else {
            this.DiseaseData = [];
          }

          let drugCompoundMasterData = this.PatientDoctorVisitlistView
            .drugCompoundMaster;
          if (drugCompoundMasterData.length > 0) {
            for (let i = 0; i < drugCompoundMasterData.length; i++) {
              this.TempMedicine.push(
                drugCompoundMasterData[i].drugCompoundName
              );
            }
            this.Medicine = this.TempMedicine;
          } else {
            this.Medicine = [];
          }

          let labReportsLevelData = this.PatientDoctorVisitlistView
            .labReportsLevel1;
          if (labReportsLevelData.length > 0) {
            for (let i = 0; i < labReportsLevelData.length; i++) {
              this.TempReport.push(labReportsLevelData[i].labReportType);
              this.TempReport1.push(labReportsLevelData[i].lrl1Name);
            }
            this.Report = this.TempReport;
            this.Report1 = this.TempReport1;
          } else {
            this.Report = [];
            this.Report1 = [];
          }
          //this.ViewAppointment=resp;
        }
      });
  }

  ionViewDidLoad() {}
  bookLab() {
    //this.navCtrl.push(PatientdoctorvisitlistviewPage);
  }
}
