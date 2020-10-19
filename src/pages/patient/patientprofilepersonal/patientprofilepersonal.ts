import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  ActionSheetController,
  Platform,
  Tabs,
  App
} from "ionic-angular";
import {
  showToast,
  APIName,
  showActionSheetPhoto,
  showProgressbar,
  username,
  password,
  perProfile
} from "../../../providers/commonfunction/commonfunction";
import { ApiProvider } from "../../../providers/api/api";
import { DestinationType, Camera, CameraOptions } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";
import { File, FileEntry } from "@ionic-native/file";
import { normalizeURL } from "ionic-angular";
import { FileTransfer } from "@ionic-native/file-transfer";
import { HttpHeaders } from "@angular/common/http";
import { DashBoardForPatientPage } from "../dash-board-for-patient/dash-board-for-patient";
import { PatientprofilePage } from "../patientprofile/patientprofile";
import { Crop } from "@ionic-native/crop/ngx";

/**
 * Generated class for the PatientprofilepersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-patientprofilepersonal",
  templateUrl: "patientprofilepersonal.html"
})
export class PatientprofilepersonalPage {
  croppedImagepath = "";
  isLoading = false;
  secondaryEmail: string;

  emailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\",this.toastCtrl);)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  nameValidation = /[^a-zA-Z]/;

  imageURI: any;
  imageFileName: any;

  formData = new FormData();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public api: ApiProvider,
    public alertctrl: AlertController,
    private camera: Camera,
    private actionSheetCrtl: ActionSheetController,
    public platform: Platform,
    public filePath: FilePath,
    public file: File,
    public appCtrl: App,
    private crop: Crop
  ) {}

  public profilePersonal: {
    perEmailList: string[];
    perProfile: string;
    personID: string;
    perFname: string;
    perLName: string;
    perEmailPrimary: string;
    perMobilePrimary: string;
  } = {
    perEmailList: [],
    perProfile: "",
    personID: "",
    perFname: "",
    perLName: "",
    perEmailPrimary: "",
    perMobilePrimary: ""
  };

  ionViewDidLoad() {
    console.log("ionViewDidLoad PatientprofilepersonalPage");
    this.getPersonalData();
  }

  submitDetails() {
    // if (this.profilePersonal.username.length == 0) {
    //   showToast("Please Enter User name", this.toastCtrl);
    //   return
    // }
    // if (this.nameValidation.test(this.profilePersonal.userName)) {
    //   showToast("Please Enter valid username", this.toastCtrl);
    //   return
    // }
    if (this.profilePersonal.perFname.length == 0) {
      showToast("Please Enter firstname", this.toastCtrl);
      return;
    } else if (this.nameValidation.test(this.profilePersonal.perFname)) {
      showToast("Please Enter valid firstname", this.toastCtrl);
      return;
    } else if (this.profilePersonal.perLName.length == 0) {
      showToast("Please Enter lastname", this.toastCtrl);
      return;
    } else if (this.nameValidation.test(this.profilePersonal.perLName)) {
      showToast("Please Enter valid lastname", this.toastCtrl);
      return;
    } else if (this.profilePersonal.perEmailPrimary.length == 0) {
      showToast("Please Enter email", this.toastCtrl);
      return;
    } else if (
      !this.emailValidation.test(this.profilePersonal.perEmailPrimary)
    ) {
      showToast("Please Enter valid Email Address", this.toastCtrl);
      return;
    } else if (this.profilePersonal.perMobilePrimary.length == 0) {
      showToast("Please Enter Phone Number", this.toastCtrl);
      return;
    }

    this.callWebserviceUpdatePersonalDetails();
  }

  cancle() {
    console.log("cancle button clicked");
    this.navCtrl.parent.parent.push(DashBoardForPatientPage);
  }
  getPersonalData() {
    this.api
      .wsPostHeader(APIName.getPersonalPatientProfile, "")
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          console.log("getPersonalData >> ", resp);

          localStorage.setItem(perProfile, resp.data.perProfile);

          this.profilePersonal.personID = resp.data.personID;
          this.profilePersonal.perProfile = resp.data.perProfile;
          this.profilePersonal.perFname = resp.data.perFname;
          this.profilePersonal.perLName = resp.data.perLName;
          this.profilePersonal.perEmailPrimary = resp.data.perEmailPrimary;
          this.profilePersonal.perMobilePrimary = resp.data.perMobilePrimary;
          if (resp.data.perEmailList.length > 0) {
            for (let i = 0; i < resp.data.perEmailList.length; i++) {
              this.profilePersonal.perEmailList.push(
                resp.data.perEmailList[i].value
              );
            }
          }
        }
      });
  }

  callWebserviceUpdatePersonalDetails() {
    this.formData.append("personID", this.profilePersonal.personID);
    this.formData.append("perFname", this.profilePersonal.perFname);
    this.formData.append("perLName", this.profilePersonal.perLName);
    this.formData.append("perProfile", this.profilePersonal.perProfile);

    this.formData.append(
      "perEmailPrimary",
      this.profilePersonal.perEmailPrimary
    );
    let emails: string = "";

    for (let emailItem of this.profilePersonal.perEmailList) {
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

  addtoList() {
    if (!this.emailValidation.test(this.secondaryEmail)) {
      showToast("Please Enter valid Email Address", this.toastCtrl);
      return;
    }
    this.profilePersonal.perEmailList.push(this.secondaryEmail);
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
            let index = this.profilePersonal.perEmailList.indexOf(list);

            if (index > -1) {
              this.profilePersonal.perEmailList.splice(index, 1);
            }
            console.log("Item deleted");
          }
        }
      ]
    });
    alert.present();
  }

  choosePhotoFromCameraOrGallery(sourceType: number) {
    var options = {
      quality: 100,
      destinationType: DestinationType.FILE_URL,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true
    };

    this.camera.getPicture(options).then(
      imagePath => {
        // if (
        //   this.platform.is("android") &&
        //   sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
        // ) {

        this.cropImage(imagePath);

        this.filePath.resolveNativePath(imagePath).then(filePath => {
          this.imageURI = filePath;
          console.log("getPicture >> ", filePath);
          console.log(
            "getPicture  normalizeURL(filepath) >> ",
            normalizeURL(filePath)
          );

          this.saveImage(normalizeURL(filePath));
          this.profilePersonal.perProfile = normalizeURL(filePath);
        });
        // }

        // this.cropImage(imagePath);
      },
      err => {
        alert(err);
      }
    );
  }
  //add viral this code

  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 }).then(
      newPath => {
        this.showCroppedImage(newPath.split("?")[0]);
      },
      error => {
        alert("Error cropping image" + error);
      }
    );
  }

  showCroppedImage(ImagePath) {
    this.isLoading = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split("/");
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(
      base64 => {
        this.croppedImagepath = base64;
        this.isLoading = false;
      },
      error => {
        alert("Error in showing image" + error);
        this.isLoading = false;
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
