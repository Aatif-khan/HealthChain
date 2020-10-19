import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import {
  showToast,
  showAlert,
  networkAlert,
  APIName
} from "../../../providers/commonfunction/commonfunction";

import { ApiProvider } from "../../../providers/api/api";
// import { TagInputModule } from 'ngx-chips';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/**
 * Generated class for the DoctorAddOrEditVisitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-doctor-add-or-edit-visit",
  templateUrl: "doctor-add-or-edit-visit.html"
})
export class DoctorAddOrEditVisitPage {
  Facilities: any = [];
  PatientNames: any = [];
  arrMedicineRequired: any = [];

  arrReportRequired: any = [];
  arrDoctorReference: any = [];
  public objectdata: any = [];
  public objectdataForLocation: any = [
    "high blood pressure",
    "high cholesterol",
    "diabetes",
    "Meningitis"
  ];
  public newItem;
  Locations: any = [];
  PossibleDiseaseNames: any = [];
  public requestAutocompleteItems: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    private toastCtrl: ToastController
  ) {
    this.requestAutocompleteItems = [];
    console.log("facilities");

    //   TagInputModule.withDefaults({
    //     tagInput: {
    //         placeholder: '',

    //         // add here other default values for tag-input
    //     },
    // });
  }
  DoctorVisit: {
    Patient: any;
    Symptoms: string;
    TreatmentProvided: string;
    PossibleDiseaseName: any;
    SideEffect: string;
    ExtraDetails: string;
    MedicineRequired: any;
    ReportRequired: any;
    DoctorReference: any;
    Facility: any;
    Location: any;
  } = {
    Facility: {},
    Location: {},
    Patient: {},
    Symptoms: "",
    TreatmentProvided: "",
    PossibleDiseaseName: [],
    SideEffect: "",
    ExtraDetails: "",
    MedicineRequired: [],
    ReportRequired: [],
    DoctorReference: []
  };
  public ParamForLocation: { facilityCenterID: string } = {
    facilityCenterID: ""
  };

  public ParamForVisit: {
    patientMaster: any;
    fcLocationMap: any;
    diagnosisMaster: any;
    labReportsLevel1: any;
    drugCompoundMaster: any;
    patSymptoms: string;
    treatmentProvided: string;
    patSideEffect: string;
    patExtraDetails: string;
  } = {
    patientMaster: {},
    fcLocationMap: [{}],
    diagnosisMaster: [{}],
    labReportsLevel1: [{}],
    drugCompoundMaster: [{}],
    patSymptoms: "",
    treatmentProvided: "",
    patSideEffect: "",
    patExtraDetails: ""
  };
  ionViewDidLoad() {
    //   TagInputModule.withDefaults({
    //     tagInput: {
    //         placeholder: 'Possible Disease Name',

    //         // add here other default values for tag-input
    //     },
    // });
    this.Facilities = [];
    this.Locations = [];
    this.PatientNames = [];
    this.PossibleDiseaseNames = [];
    this.arrMedicineRequired = [];
    this.arrReportRequired = [];
    this.arrDoctorReference = [];

    this.WsGetAllFacilities();
    this.WsGetAllPatient();
    this.WsGetAllDiagnosis();
    this.WsGetAllMedicine();
    this.WsGetAllLab1Report();
    this.WsGetDoctorsForRefference();
  }
  onTextChange(event: string) {
    let body = {
      diagnosiseName: event
    };
  }
  WsGetAllFacilities() {
    this.api.wsPostHeader(APIName.getAllFacilityDoctor, {}).then(resp => {
      if (resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      } else {
        let TempForFacility: any = resp;
        this.Facilities = TempForFacility.data;
        this.DoctorVisit.Facility = this.Facilities[0];
        this.onSelectChange(this.Facilities);
        console.log(this.Facilities);
        console.log("ionViewDidLoad DoctorAddOrEditVisitPage");
      }
    });
  }
  onSelectChange(selectedValue: any) {
    console.log("Selected" + selectedValue);
    this.WsGetAllLocation(selectedValue);
  }
  WsGetAllLocation(strSelectedValue: string) {
    this.ParamForLocation.facilityCenterID = this.DoctorVisit.Facility.facilityCenterID;
    this.api
      .wsPostHeader(
        APIName.getAllLocationByFacilityAndDoctor,
        this.ParamForLocation
      )
      .then(resp => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          let Temparray: any = resp;
          this.Locations = Temparray.data;
          this.DoctorVisit.Location = this.Locations[0];
        }
      });
  }

  WsGetAllPatient() {
    this.api.wsPostHeaderBackground(APIName.getAllPatient, {}).then(resp => {
      let Temparray: any = resp;
      this.PatientNames = Temparray.data;
      console.log(this.PatientNames[0]);

      this.DoctorVisit.Patient = this.PatientNames[0];
    });
  }

  WsGetAllDiagnosis() {
    this.api.wsPostHeaderBackground(APIName.getAllDiagnosis, {}).then(resp => {
      let Temparray: any = resp;
      this.PossibleDiseaseNames = Temparray.data;
    });
  }
  WsGetAllMedicine() {
    this.api.wsPostHeaderBackground(APIName.getAllMedicine, {}).then(resp => {
      let Temparray: any = resp;
      this.arrMedicineRequired = Temparray.data;
    });
  }

  WsGetAllLab1Report() {
    this.api.wsPostHeaderBackground(APIName.getAllLab1Report, {}).then(resp => {
      let Temparray: any = resp;
      this.arrReportRequired = Temparray.data;
    });
  }

  WsGetDoctorsForRefference() {
    this.api
      .wsPostHeaderBackground(APIName.getDoctorsForRefference, {})
      .then(resp => {
        let Temparray: any = resp;
        this.arrDoctorReference = Temparray.data;
      });
  }

  WsGetaddOrEditVisit() {
    this.ParamForVisit.patSymptoms = this.DoctorVisit.Symptoms;
    this.ParamForVisit.treatmentProvided = this.DoctorVisit.TreatmentProvided;
    this.ParamForVisit.patSideEffect = this.DoctorVisit.SideEffect;
    this.ParamForVisit.patExtraDetails = this.DoctorVisit.ExtraDetails;
    this.ParamForVisit.patientMaster = {
      patientID: this.DoctorVisit.Patient.patientID
    };
    this.ParamForVisit.fcLocationMap = {
      fcLocationMapID: this.DoctorVisit.Location.fcLocationMapID
    };

    let tempforDisease: any = [];

    for (
      let index = 0;
      index < this.DoctorVisit.PossibleDiseaseName.length;
      index++
    ) {
      tempforDisease.push({
        diagnosisID: this.DoctorVisit.PossibleDiseaseName[index].diagnosisID
      });
    }
    this.ParamForVisit.diagnosisMaster = tempforDisease;
    let tempforlabReports: any = [];

    for (
      let index = 0;
      index < this.DoctorVisit.ReportRequired.length;
      index++
    ) {
      tempforlabReports.push({
        labReportLevel1ID: this.DoctorVisit.ReportRequired[index]
          .labReportLevel1ID
      });
    }

    this.ParamForVisit.labReportsLevel1 = tempforlabReports;
    let tempforMedicine: any = [];

    for (
      let index = 0;
      index < this.DoctorVisit.MedicineRequired.length;
      index++
    ) {
      tempforMedicine.push({
        drugCompoundID: this.DoctorVisit.MedicineRequired[index].drugCompoundID
      });
    }

    this.ParamForVisit.drugCompoundMaster = tempforMedicine;

    this.api
      .wsPostHeader(APIName.addOrEditDoctorVisit, this.ParamForVisit)
      .then(resp => {
        // this.Locations = resp
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          console.log("Submit resp = " + resp);
        }
      });
  }
  SubmitClicked() {
    let IsValid: boolean = this.Validation();
    if (IsValid) {
      this.WsGetaddOrEditVisit();
    }
    console.log("SubmitClicked DoctorAddOrEditVisitPage");
  }
  CancelClicked() {
    console.log("CancelClicked DoctorAddOrEditVisitPage");

    this.navCtrl.pop();
  }
  // delete(chip: Element) {
  //   chip.remove();
  // }
  // addTodo(){
  //   this.newItem = "<ion-item>test</ion-item>";
  // }
  Validation() {
    console.log(
      "this.DoctorVisit.Facility ========= " +
        this.DoctorVisit.Patient.patientName
    );
    console.log(
      "JSON.stringify(this.DoctorVisit) ===== = = = =  = " +
        JSON.stringify(this.DoctorVisit)
    );

    if (this.DoctorVisit.Facility == "" || this.DoctorVisit.Facility == null) {
      showToast("Please Enter Facility", this.toastCtrl);
    } else if (
      this.DoctorVisit.Location.fcLocationName == "" ||
      this.DoctorVisit.Location.fcLocationName == null
    ) {
      showToast("Please Enter Location", this.toastCtrl);
    } else if (
      this.DoctorVisit.Patient.patientName == "" ||
      this.DoctorVisit.Patient.patientName == null
    ) {
      showToast("Please Enter Patient Name", this.toastCtrl);
    } else if (
      this.DoctorVisit.Symptoms == "" ||
      this.DoctorVisit.Symptoms == null
    ) {
      showToast("Please Enter Symptoms", this.toastCtrl);
    } else if (
      this.DoctorVisit.TreatmentProvided == "" ||
      this.DoctorVisit.TreatmentProvided == null
    ) {
      showToast("Please Enter Treatment Provided", this.toastCtrl);
    } else if (this.DoctorVisit.PossibleDiseaseName.length == 0) {
      showToast("Please Enter Possible Disease Name", this.toastCtrl);
    } else if (
      this.DoctorVisit.SideEffect == "" ||
      this.DoctorVisit.SideEffect == null
    ) {
      showToast("Please Enter SideEffect", this.toastCtrl);
    } else if (
      this.DoctorVisit.ExtraDetails == "" ||
      this.DoctorVisit.ExtraDetails == null
    ) {
      showToast("Please Enter ExtraDetails", this.toastCtrl);
    } else if (this.DoctorVisit.MedicineRequired.length == 0) {
      showToast("Please Enter Medicine Required", this.toastCtrl);
    } else if (this.DoctorVisit.ReportRequired.length == 0) {
      showToast("Please Enter Report Required", this.toastCtrl);
    } else if (this.DoctorVisit.DoctorReference.length == 0) {
      showToast("Please Enter Doctor Refrence", this.toastCtrl);
    } else {
      return true;
    }
  }
}
