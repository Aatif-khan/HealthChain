import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import {
  APIName,
  showToast
} from "../../../providers/commonfunction/commonfunction";
import { ApiProvider } from "../../../providers/api/api";
import { AddbooklabPage } from "../addbooklab/addbooklab";
import { AddPharmaAppointmentPage } from "../addpharmaappointment/addpharmaappointment";
/**
 * Generated class for the PatientdoctorvisitlistviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-patientdoctorvisitlistview",
  templateUrl: "patientdoctorvisitlistview.html"
})
export class PatientdoctorvisitlistviewPage {
  item: any = [];
  PatientDoctorVisitlist: any = [];
  doctorVisitList: any = [];
  DiseaseData: any = [];

  TempDisease: any = [];
  patVisitNoteID: any = [];
  Medicine: any = [];
  TempMedicine: any = [];
  Report: any = [];

  TempReport: any = [];

  priviousIndex: any = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public toastCtrl: ToastController
  ) {
    this.item = this.navParams.get("item");
    let Id = { patVisitNoteID: this.item.patVisitNoteID };
    console.log("Let ID:::", Id);
    this.api
      .wsPostHeader(APIName.viewAndEditDoctorVisitPatient, Id)
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          let response: any = resp;
          this.PatientDoctorVisitlist = response.data;
          let jdiagnosisMasterData = this.PatientDoctorVisitlist
            .diagnosisMaster;

          if (jdiagnosisMasterData.length > 0) {
            for (let i = 0; i < jdiagnosisMasterData.length; i++) {
              this.TempDisease.push(jdiagnosisMasterData[i].diagnosiseName);
            }
            this.DiseaseData = this.TempDisease;
          } else {
            this.DiseaseData = [];
          }

          let drugCompoundMasterData = this.PatientDoctorVisitlist
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

          let labReportsLevelData = this.PatientDoctorVisitlist
            .labReportsLevel1;
          if (labReportsLevelData.length > 0) {
            for (let i = 0; i < labReportsLevelData.length; i++) {
              this.TempReport.push(labReportsLevelData[i].labReportType);
            }
            this.Report = this.TempReport;
          } else {
            this.Report = [];
          }
          //this.ViewAppointment=resp;
        }
      });
  }

  ionViewDidLoad() {
    this.getAllDrList();
  }
  bookLab() {
    console.log(
      "helloooo111111=>",
      this.PatientDoctorVisitlist.labReportsLevel1
    );
    this.navCtrl.push(AddbooklabPage, {
      obj: this.PatientDoctorVisitlist,
      patvisitnoteid: this.item.patVisitNoteID,
      flagType: 2
    });
  }
  bookpharma() {
    this.navCtrl.push(AddPharmaAppointmentPage);
  }
  getAllDrList() {
    this.api.wsGet(APIName.getAllDoctorVisitPatient, "").then((resp: any) => {
      let doctorVisitList: any = resp;
      this.doctorVisitList = doctorVisitList.data.patVisitNotePojo;
      for (let i of this.doctorVisitList) {
        console.log("i.index:::", i.index);
      }
      this.patVisitNoteID =
        doctorVisitList.data.patVisitNotePojo[0].patVisitNoteID;
      console.log("Patient Visit Note Id", this.patVisitNoteID);

      // this.priviousIndex =
    });
  }

  getDataforIndex(index: any) {
    console.log("Index:::::::::", index);
    for (let sample of this.doctorVisitList) {
      console.log("data:" + sample);
      if (this.patVisitNoteID == sample.patVisitNoteID) {
        console.log("Current index is:" + sample.index);
        this.priviousIndex = sample.index;
      }
    }

    if (index == 0) {
      this.priviousIndex = this.priviousIndex - 1;
      console.log("previous index:" + this.priviousIndex);
    } else {
      this.priviousIndex = this.priviousIndex + 1;
      console.log("next index:" + this.priviousIndex);
    }

    for (let samp of this.doctorVisitList) {
      if (this.priviousIndex == samp.index) {
        this.patVisitNoteID = samp.patVisitNoteID;

        this.previous();
      }
    }
  }
  previous() {
    var data1 = {
      patVisitNoteID: this.patVisitNoteID
    };
    this.api
      .wsPostHeader(APIName.viewAndEditDoctorVisitPatient, data1)
      .then((resp: any) => {
        if (resp.status === 500) {
          showToast(resp.error.message, this.toastCtrl);
        } else {
          this.PatientDoctorVisitlist = resp.data;
          console.log("Patient Visit Note Id", this.patVisitNoteID);
        }
      });
  }
}
