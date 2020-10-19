import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ToastController,
  Platform,
  AlertController
} from "ionic-angular";
import {
  showToast,
  showActionSheetPhoto,
  APIName
} from "../../../providers/commonfunction/commonfunction";
import { Camera, CameraOptions, DestinationType } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";
import { ApiProvider } from "../../../providers/api/api";

/**
 * Generated class for the HospitalbasicdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-hospitalbasicdetail",
  templateUrl: "hospitalbasicdetail.html"
})
export class HospitalbasicdetailPage {
  secondaryEmail: string = "";

  emailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\",this.toastCtrl);)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  nameValidation = /[^a-zA-Z]/;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private actionSheetCrtl: ActionSheetController,
    private tostCrtl: ToastController,
    public api: ApiProvider,
    public alertctrl: AlertController
  ) {}

  public profileHospital: {
    HospitalEmailLists: string[];
    HospitalID: string;
    HospitalCompanyName: string;
    HospitalEmailPrimary: string;
  } = {
    HospitalEmailLists: [],
    HospitalID: "",
    HospitalCompanyName: "",
    HospitalEmailPrimary: ""
  };

  ionViewDidLoad() {
    console.log("ionViewDidLoad PatientprofileHospitalPage");
    //  this.getPersonalData()
  }

  submitDetails() {
    if (this.profileHospital.HospitalCompanyName.length == 0) {
      showToast("Please Enter Hospital name", this.tostCrtl);
      return;
    } else if (
      this.nameValidation.test(this.profileHospital.HospitalCompanyName)
    ) {
      showToast("Please Enter valid Hospital name", this.tostCrtl);
      return;
    } else if (this.profileHospital.HospitalEmailPrimary.length == 0) {
      showToast("Please Enter email", this.tostCrtl);
      return;
    } else if (
      !this.emailValidation.test(this.profileHospital.HospitalEmailPrimary)
    ) {
      showToast("Please Enter valid Email Address", this.tostCrtl);
      return;
    }
    //this.callWebserviceUpdatePersonalDetails()
  }

  getPersonalData() {
    this.api
      .wsPostHeader(APIName.getPersonalPatientProfile, "")
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          console.log("getPersonalData >> ", resp);

          this.profileHospital.HospitalID = resp.HospitalID;
          this.profileHospital.HospitalCompanyName = resp.HospitalName;
          this.profileHospital.HospitalEmailPrimary = resp.HospitalEmailPrimary;
          if (
            resp.HospitalEmailLists[0] != null &&
            resp.HospitalEmailLists[0] != "[]"
          ) {
            this.profileHospital.HospitalEmailLists = resp.HospitalEmailLists;
          }
        }
      });
  }

  callWebserviceUpdatePersonalDetails() {
    this.api
      .wsPostHeader(APIName.updatePersonalPatientProfile, this.profileHospital)
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          showToast(resp.message, this.tostCrtl);
        }
      });
  }

  addtoList() {
    if (this.secondaryEmail.length == 0) {
      showToast("Please Enter Email Address", this.tostCrtl);
      return;
    }
    if (!this.emailValidation.test(this.secondaryEmail)) {
      showToast("Please Enter valid Email Address", this.tostCrtl);
      return;
    }
    this.profileHospital.HospitalEmailLists.push(this.secondaryEmail);
    this.secondaryEmail = "";
  }

  deleteelement(list: any) {
    let alert = this.alertctrl.create({
      title: "Confirm Delete",
      message: "Are you sure, you want to delete this email?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "OK",
          handler: () => {
            let index = this.profileHospital.HospitalEmailLists.indexOf(list);

            if (index > -1) {
              this.profileHospital.HospitalEmailLists.splice(index, 1);
            }
            console.log("Item deleted");
          }
        }
      ]
    });
    alert.present();
  }
}
