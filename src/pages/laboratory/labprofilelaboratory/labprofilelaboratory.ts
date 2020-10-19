import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  ActionSheetController,
  Platform,
  normalizeURL
} from "ionic-angular";
import {
  showToast,
  APIName,
  username,
  password,
  showActionSheetPhoto,
  perProfile
} from "../../../providers/commonfunction/commonfunction";
import { ApiProvider } from "../../../providers/api/api";
import { HttpHeaders } from "@angular/common/http";
import { FileUploadOptions, FileTransfer } from "@ionic-native/file-transfer";
import { DestinationType, Camera } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";
import { FileEntry, File } from "@ionic-native/file";
import { DatePipe } from "@angular/common";

/**
 * Generated class for the LabprofilelaboratoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-labprofilelaboratory",
  templateUrl: "labprofilelaboratory.html"
})
export class LabprofilelaboratoryPage {
  secondaryEmail: string;
  emailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\",this.toastCtrl);)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  nameValidation = /[^a-zA-Z]/;
  imageURI: any;
  imageFileName: any;
  public patAppTimeFrom = "";
  public patAppDate = "";

  public patAppTimeTo = "";
  formData = new FormData();

  public laboratoryProfile: {
    perEmailList: string[];
    personID: string;
    perFname: string;
    perLName: string;
    perProfile: string;
    facilityCenterName: string;
    facilityCenterID: any;
    additionalInformation: string;
    perEmailPrimary: string;
  } = {
    perEmailList: [],
    personID: "",
    perFname: "",
    perLName: "",
    perProfile: "",
    facilityCenterID: "",
    facilityCenterName: "",
    additionalInformation: "",
    perEmailPrimary: ""
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public datepipe: DatePipe,

    public toastCtrl: ToastController,
    public alertctrl: AlertController,
    private camera: Camera,
    private actionSheetCrtl: ActionSheetController,
    public platform: Platform,
    public filePath: FilePath,
    private transfer: FileTransfer,
    public file: File
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LabprofilelaboratoryPage");
    this.getLaboratoryData();
  }

  getLaboratoryData() {
    this.api.wsPostHeader(APIName.getLaboratoryData, "").then((resp: any) => {
      if (resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      } else {
        console.log("LABgetPersonalData >> ", JSON.stringify(resp));

        localStorage.setItem(perProfile, resp.data.perProfile);

        this.laboratoryProfile.personID = resp.data.personID;
        this.laboratoryProfile.perFname = resp.data.perFname;
        this.laboratoryProfile.perLName = resp.data.perLName;
        this.laboratoryProfile.perProfile = resp.data.perProfile;
        this.laboratoryProfile.facilityCenterID = resp.data.facilityCenterID;
        this.laboratoryProfile.facilityCenterName =
          resp.data.facilityCenterName;
        this.laboratoryProfile.additionalInformation =
          resp.data.additionalInformation;
        this.laboratoryProfile.perEmailPrimary = resp.data.perEmailPrimary;
        console.log("EmailList :--- " + resp.data.perEmailList.length);
        if (resp.data.perEmailList.length > 0) {
          for (let i = 0; i < resp.data.perEmailList.length; i++) {
            this.laboratoryProfile.perEmailList.push(
              resp.data.perEmailList[i].value
            );
          }
          //    this.laboratoryProfile.perEmailList = resp.perEmailList.value
        }
      }
    });
  }

  addtoList() {
    if (!this.emailValidation.test(this.secondaryEmail)) {
      showToast("Please Enter Valid Email Address", this.toastCtrl);
      return;
    }
    this.laboratoryProfile.perEmailList.push(this.secondaryEmail);
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
            let index = this.laboratoryProfile.perEmailList.indexOf(list);

            if (index > -1) {
              this.laboratoryProfile.perEmailList.splice(index, 1);
            }
            console.log("Item deleted");
          }
        }
      ]
    });
    alert.present();
  }

  /* Submit Details */

  submitDetails() {
    if (this.laboratoryProfile.facilityCenterName.length == 0) {
      showToast("Please Enter Lab Name", this.toastCtrl);
      return;
    }
    // else if (this.nameValidation.test(this.laboratoryProfile.facilityCenterName)) {
    //   showToast("Please Enter valid Lab Name", this.toastCtrl);
    //   return
    // }
    else if (this.laboratoryProfile.additionalInformation.length == 0) {
      showToast("Please Enter Additional Information", this.toastCtrl);
      return;
    } else if (this.laboratoryProfile.perEmailPrimary.length == 0) {
      showToast("Please Enter email", this.toastCtrl);
      return;
    } else if (
      !this.emailValidation.test(this.laboratoryProfile.perEmailPrimary)
    ) {
      showToast("Please Enter Valid Email Address", this.toastCtrl);
      return;
    } else if (this.patAppTimeFrom.length == 0) {
      showToast("Please select Appointment start time", this.toastCtrl);
      return;
    } else if (this.patAppTimeTo.length == 0) {
      showToast("Please select Appointment end time", this.toastCtrl);
      return;
    }

    let date = new Date(this.patAppDate);
    let datetopass = date.getTime();
    var date1 = date.getUTCDate();

    console.log("datebefore", "" + datetopass);

    let timefrom = new Date(this.patAppDate + " " + this.patAppTimeFrom);
    let timefromtopass = timefrom.getTime();

    console.log("timebefrm", "" + timefromtopass);

    let timeto = new Date(this.patAppDate + " " + this.patAppTimeTo);
    let timetopass = timeto.getTime();

    console.log("timeto", "" + timetopass);

    //this.uploadFile()
    this.callWebserviceUpdateLaboratoryDetails();
  }

  changeDateFormat(date: Date, formate?: string) {
    let latest_date = this.datepipe.transform(date, formate);
    console.log("ChangeDateFormat", latest_date);
    return latest_date;
  }

  callWebserviceUpdateLaboratoryDetails() {
    this.formData.append("personID", this.laboratoryProfile.personID);
    this.formData.append("perFname", this.laboratoryProfile.perFname);
    this.formData.append("perLName", this.laboratoryProfile.perLName);
    this.formData.append(
      "facilityCenterID",
      this.laboratoryProfile.facilityCenterID
    );
    this.formData.append(
      "additionalInformation",
      this.laboratoryProfile.additionalInformation
    );
    this.formData.append(
      "perEmailPrimary",
      this.laboratoryProfile.perEmailPrimary
    );
    this.formData.append("perProfile", this.laboratoryProfile.perProfile);

    let emails: string = "";

    for (let emailItem of this.laboratoryProfile.perEmailList) {
      emails = emails + "," + emailItem;
    }

    while (emails.charAt(0) === ",") {
      emails = emails.substr(1);
    }

    this.formData.append("perEmailList", emails);

    this.api
      .wsPostMutlipartHeader(
        APIName.updatePersonalPatientProfile,
        this.formData
      )
      .then((resp: any) => {
        showToast(resp.message, this.toastCtrl);

        localStorage.setItem(perProfile, resp.data.perProfile);
      });
  }

  choosePhotoFromCameraOrGallery(sourceType: number) {
    var options = {
      quality: 100,
      destinationType: DestinationType.FILE_URL,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(
      imagePath => {
        this.imageURI = imagePath;
        console.log("getPicture >> ", imagePath);
        console.log(
          "getPicture  normalizeURL(imagePath) >> ",
          normalizeURL(imagePath)
        );
        this.saveImage(normalizeURL(imagePath));

        this.laboratoryProfile.perProfile = imagePath;
      },
      err => {
        alert(err);
      }
    );
  }

  private saveImage(imageFileUri: any): void {
    this.file
      .resolveLocalFilesystemUrl(imageFileUri)
      .then(entry =>
        (<FileEntry>entry).file(file => {
          this.readFile(file);
        })
      )
      .catch(err => console.log(err));
  }

  private readFile(file: any) {
    var reader = new FileReader();
    reader.onloadend = () => {
      //[ this.result ], type: "image/jpeg"

      var imgBlob = new Blob([reader.result], { type: file.type });
      console.log("readFile() : file.type >> ", file.type);
      console.log("readFile() : file >> ", file);

      this.formData.append("perProfile", imgBlob, file.name);
      // this.callWebserviceUpdateDocuments()
    };
    reader.readAsArrayBuffer(file);
  }

  buttonClickForChooseIDs() {
    showActionSheetPhoto(this.actionSheetCrtl).then(seletedIndex => {
      this.choosePhotoFromCameraOrGallery(seletedIndex);
    });
  }
}
