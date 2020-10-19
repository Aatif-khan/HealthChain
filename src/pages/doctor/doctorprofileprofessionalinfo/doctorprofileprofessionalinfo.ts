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

/**
 * Generated class for the DoctorprofileprofessionalinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-doctorprofileprofessionalinfo",
  templateUrl: "doctorprofileprofessionalinfo.html"
})
export class DoctorprofileprofessionalinfoPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad DoctorprofileprofessionalinfoPage");
    this.getPersonalData();
  }

  public profilePersonal: {
    specialityCode: string;
    specialityID: string;
    specialityName: string;
  } = {
    specialityCode: "",
     specialityID: "",
    specialityName: ""
  };
  getPersonalData() {
    this.api.wsPostHeader(APIName.postgetfclocation, "").then((resp: any) => {
      if (resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      } else {
        this.profilePersonal.specialityCode = resp.data.specialityCode;
        this.profilePersonal.specialityID = resp.data.specialityID;
        this.profilePersonal.specialityName = resp.data.specialityName;
      }
    });
  }

  submitDetails() {
    // if (this.profilePersonal.username.length == 0) {
    // showToast("Please Enter User name", this.toastCtrl);
    // return
    // }
    // else if (nameValidation.test(this.profilePersonal.username)) {
    // showToast("Please Enter valid username", this.toastCtrl);
    // return
    // }
    if (this.profilePersonal.specialityCode.length == 0) {
      showToast("Please Enter specialityCode", this.toastCtrl);
      return;
    } else if (this.profilePersonal.specialityID.length == 0) {
      showToast("Please Enter specialityID", this.toastCtrl);
      return;
    } else if (this.profilePersonal.specialityName.length == 0) {
      showToast("Please Enter specialityName", this.toastCtrl);
      return;
    }
    this.callWebserviceUpdatePersonalDetails();
  }
  callWebserviceUpdatePersonalDetails() {
    // this.formData.append("specialityCode", this.profilePersonal.specialityCode)
    // this.formData.append("specialityID", this.profilePersonal.specialityID)
    // this.formData.append("specialityName", this.profilePersonal.specialityName)
    let data = {
      specialityCode: this.profilePersonal.specialityCode,
      specialityID: this.profilePersonal.specialityID,
      specialityName: this.profilePersonal.specialityName
    };

   console.log("adfkjsadf;lksd");
    this.api
      .wsPostHeader(APIName.postdocspecilality, data)

      .then((resp: any) => {
        console.log(resp);
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          this.profilePersonal.specialityCode = resp.data.specialityCode;
          this.profilePersonal.specialityID = resp.data.specialityID;
          this.profilePersonal.specialityName = resp.data.specialityName;
        }
        showToast(resp.message, this.toastCtrl);
      });
  }
}
