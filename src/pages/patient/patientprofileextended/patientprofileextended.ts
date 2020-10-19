import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import {
  showToast,
  APIName
} from "../../../providers/commonfunction/commonfunction";
import { ApiProvider } from "../../../providers/api/api";
import { DatePipe } from "@angular/common";
import { DashBoardForPatientPage } from "../dash-board-for-patient/dash-board-for-patient";

/**
 * Generated class for the PatientprofileextendedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-patientprofileextended",
  templateUrl: "patientprofileextended.html"
})
export class PatientprofileextendedPage {
  public allWorkStatus: any[] = [];
  public allEmploymentsStatus: any[] = [];
  public allMaritalStatus: any[] = [];
  // public bloodGroups:any[] = [];
  public genderArray: any[] = [];

  constructor(
    public datepipe: DatePipe,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public api: ApiProvider
  ) {}

  cancel() {
    this.navCtrl.parent.parent.push(DashBoardForPatientPage)
  }
  public bloodGroups = [
    {
      title: "A+",
      id: 1
    },
    {
      title: "A-",
      id: 2
    },
    {
      title: "B+",
      id: 3
    },
    {
      title: "B-",
      id: 4
    },
    {
      title: "AB+",
      id: 5
    },
    {
      title: "AB-",
      id: 6
    },
    {
      title: "O+",
      id: 7
    },
    {
      title: "O-",
      id: 8
    }
  ];

  ionViewDidLoad() {
    console.log("ionViewDidLoad PatientprofileextendedPage");
    this.getAllMaritalStatus();
    this.getExtendedData();
  }

  public extendedProfile: {
    personID: string;
    perDOB: string;
    marital: string;
    gender: string;
    employment: string;
    perDegree: string;
    perDesignation: string;
    work: string;
    bodyHeight: string;
    bodyWeightInKG: string;
    perBloodGroup: string;
    chestInches: string;
    waistInches: string;
  } = {
    personID: "",
    employment: "",
    work: "",
    perDOB: "",
    marital: "",
    gender: "",
    perDegree: "",
    perDesignation: "",
    bodyHeight: "",
    bodyWeightInKG: "",
    perBloodGroup: "",
    chestInches: "",
    waistInches: ""
  };

  selectedWorkStatus = this.allWorkStatus[0];
  selectedEmployement = this.allEmploymentsStatus[0];
  selectedMaritalStatus = this.allMaritalStatus[0];
  selectedBloodGroup = this.bloodGroups[0];

  getExtendedData() {
    this.api
      .wsPostHeader(APIName.getExtendedPatientProfile, "")
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          // this.extendedProfile = resp.data
          // showToast(resp.message, this.toastCtrl)
          this.getGenderList();
          this.extendedProfile.personID = resp.data.personID;
          this.extendedProfile.perDOB = resp.data.perDOB
            ? this.changeStringToDate(resp.data.perDOB)
            : "";
          this.extendedProfile.marital = resp.data.marital;
          this.extendedProfile.gender = resp.data.gender;
          this.extendedProfile.bodyHeight = resp.data.bodyHeight;
          this.extendedProfile.bodyWeightInKG = resp.data.bodyWeightInKG;
          this.extendedProfile.perBloodGroup = resp.data.perBloodGroup;
          this.extendedProfile.chestInches = resp.data.chestInches;
          this.extendedProfile.waistInches = resp.data.waistInches;
          this.extendedProfile.perDegree = resp.data.perDegree;
          this.extendedProfile.perDesignation = resp.data.perDesignation;
          this.extendedProfile.employment = resp.data.employment;
          this.extendedProfile.work = resp.data.work;
        }
      });
  }
  getGenderList() {
    this.api.wsPostHeader(APIName.gender, "").then((resp: any) => {
      if (resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      } else {
        this.genderArray = resp.data;
        this.getAllWorkStatus();
      }
    });
  }
  radioClicked(val) {
    this.extendedProfile.gender = val;
    console.log("radioselected", this.extendedProfile.gender);
  }
  getAllWorkStatus() {
    this.api
      .wsPostHeaderBackground(APIName.workStatus, "")
      .then((resp: any) => {
        this.allWorkStatus = resp.data;
        this.selectedWorkStatus = this.allWorkStatus[0].key;
      });
  }
  onWorkStatusSelected(value: any) {
    console.log("onWorkStatusSelected", value);
    this.extendedProfile.work = value;
    this.getallEmploymentStatus();
  }
  getallEmploymentStatus() {
    this.api
      .wsPostHeaderBackground(APIName.employmentStatus, "")
      .then((resp: any) => {
        this.allEmploymentsStatus = resp.data;
        this.selectedEmployement = this.allEmploymentsStatus[0].key;
      });
  }
  onEmployementSelected(value: any) {
    console.log("onEmployementSelected", value);
    this.extendedProfile.employment = value;
    // this.getAllMaritalStatus()
  }
  getAllMaritalStatus() {
    this.api
      .wsPostHeaderBackground(APIName.maritalStatus, "")
      .then((resp: any) => {
        this.allMaritalStatus = resp.data;
        this.selectedMaritalStatus = this.allMaritalStatus[0].key;
      });
  }
  onMaritalStatusSelected(value: any) {
    console.log("onMaritalStatusSelected >> ", value);
    this.extendedProfile.marital = value.value;
  }
  callWebserviceUpdateExtendedData() {
    console.log("submit===>", this.extendedProfile);
    this.api
      .wsPostHeader(APIName.updateExtendedPatientProfile, this.extendedProfile)
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          showToast(resp.message, this.toastCtrl);
        }
      });
  }
  onBloogGroupSelected(value: any) {
    console.log("onBloogGroupSelected", value.title);
    this.extendedProfile.perBloodGroup = value.title;
  }
  //to convert date and time////
  changeStringToDate(
    dateString: string,
    format?: string //date
  ) {
    if (format) {
      return this.changeDateFormat(
        new Date(
          new Date(dateString).getTime() -
            new Date(dateString).getTimezoneOffset() * 60000
        ),
        format
      );
    } else {
      return new Date(
        new Date(dateString).getTime() -
          new Date(dateString).getTimezoneOffset() * 60000
      ).toISOString();
    }
  }

  //date to any format
  changeDateFormat(date: Date, formate?: string) {
    let latest_date = this.datepipe.transform(date, formate);
    return latest_date;
  }

  submitDetails() {
    let time = new Date(this.extendedProfile.perDOB);
    console.log("time >> ", time.getTime());
    this.extendedProfile.perDOB = time.getTime().toString();

    // let date = new Date()
    // date.setTime(time.getTime())

    // console.log("this.extendedProfile.perDOB >> ", date)
    console.log("submit===>", JSON.stringify(this.extendedProfile));
    var nameValidation = /[^a-zA-Z]/;

    if (this.extendedProfile.perDOB.length == 0) {
      showToast("Please Enter dob", this.toastCtrl);
      return;
    } else if (this.extendedProfile.gender.length == 0) {
      showToast("Please select gender", this.toastCtrl);
      return;
    } else if (this.extendedProfile.perDegree.length == 0) {
      showToast("Please Enter degree", this.toastCtrl);
      return;
    } else if (this.extendedProfile.work.length == 0) {
      showToast("Please select work", this.toastCtrl);
      return;
    } else if (this.extendedProfile.employment.length == 0) {
      showToast("Please select employment", this.toastCtrl);
      return;
    } else if (this.extendedProfile.marital.length == 0) {
      showToast("Please select marital status", this.toastCtrl);
      return;
    } else if (this.extendedProfile.bodyHeight.length == 0) {
      showToast("Please enter height", this.toastCtrl);
      return;
    } else if (this.extendedProfile.bodyWeightInKG.length == 0) {
      showToast("Please enter weight", this.toastCtrl);
      return;
    }
    this.callWebserviceUpdateExtendedData();
  }
}
