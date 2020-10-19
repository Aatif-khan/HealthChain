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
import { File } from "@ionic-native/file";
/**
 * Generated class for the InsurancebasicdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;

@IonicPage()
@Component({
  selector: "page-insurancebasicdetail",
  templateUrl: "insurancebasicdetail.html"
})
export class InsurancebasicdetailPage {
  secondaryEmail: string;

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

  public profileInsurance: {
    insuranceEmailLists: string[];
    insuranceID: string;
    insuranceCompanyName: string;
    insuranceEmailPrimary: string;
  } = {
    insuranceEmailLists: [],
    insuranceID: "",
    insuranceCompanyName: "",
    insuranceEmailPrimary: ""
  };

  ionViewDidLoad() {
    console.log("ionViewDidLoad PatientprofileInsurancePage");
    //  this.getPersonalData()
  }

  submitDetails() {
    // if (this.profileInsurance.username.length == 0) {
    //   showToast("Please Enter User name", this.toastCtrl);
    //   return
    // }
    // if (this.nameValidation.test(this.profileInsurance.userName)) {
    //   showToast("Please Enter valid username", this.toastCtrl);
    //   return
    // }
    if (this.profileInsurance.insuranceCompanyName.length == 0) {
      showToast("Please Enter Insurance companyname", this.tostCrtl);
      return;
    } else if (
      this.nameValidation.test(this.profileInsurance.insuranceCompanyName)
    ) {
      showToast("Please Enter valid Insurance companyname", this.tostCrtl);
      return;
    } else if (this.profileInsurance.insuranceEmailPrimary.length == 0) {
      showToast("Please Enter email", this.tostCrtl);
      return;
    } else if (
      !this.emailValidation.test(this.profileInsurance.insuranceEmailPrimary)
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

          this.profileInsurance.insuranceID = resp.insuranceID;
          this.profileInsurance.insuranceCompanyName = resp.insuranceName;
          this.profileInsurance.insuranceEmailPrimary =
            resp.insuranceEmailPrimary;
          if (
            resp.insuranceEmailLists[0] != null &&
            resp.insuranceEmailLists[0] != "[]"
          ) {
            this.profileInsurance.insuranceEmailLists =
              resp.insuranceEmailLists;
          }
        }
      });
  }

  callWebserviceUpdatePersonalDetails() {
    this.api
      .wsPostHeader(APIName.updatePersonalPatientProfile, this.profileInsurance)
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          showToast(resp.message, this.tostCrtl);
        }
      });
  }

  addtoList() {
    if (!this.emailValidation.test(this.secondaryEmail)) {
      showToast("Please Enter valid Email Address", this.tostCrtl);
      return;
    }
    this.profileInsurance.insuranceEmailLists.push(this.secondaryEmail);
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
            let index = this.profileInsurance.insuranceEmailLists.indexOf(list);

            if (index > -1) {
              this.profileInsurance.insuranceEmailLists.splice(index, 1);
            }
            console.log("Item deleted");
          }
        }
      ]
    });
    alert.present();
  }
}
