import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  ActionSheetController
} from "ionic-angular";
import {
  showToast,
  APIName,
  showActionSheetPhoto,
  perProfile
} from "../../../providers/commonfunction/commonfunction";
import { ApiProvider } from "../../../providers/api/api";
import { DatePipe } from "@angular/common";
import { FilePath } from "@ionic-native/file-path";
import { File, FileEntry } from "@ionic-native/file";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { CameraOptions, Camera, DestinationType } from "@ionic-native/camera";
import { normalizeURL } from "ionic-angular";
 import { ImagePicker } from '@ionic-native/image-picker';
/**
 * Generated class for the DoctorprofileextendedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-doctorprofileextended",
  templateUrl: "doctorprofileextended.html"
})
export class DoctorprofileextendedPage {
  // public designations: any[] = [];
  // public degreeArray: any[] = [];
  public genderArray: any[] = [];
  formData = new FormData();
  // public selectedgenderID;
  // public selecteddegreeID;
  // public selectedDesignation;
  // public selectedDOB;

  public arrcertificates : any[] = [];

  constructor(
    public datepipe: DatePipe,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public api: ApiProvider,
    public actionSheetCrtl: ActionSheetController,
    private camera: Camera,
    public alertCtrl: AlertController,
    public filePath: FilePath,
    public photoViewer: PhotoViewer,
    public file: File,
    private imagePicker: ImagePicker
  ) {}

  ionViewDidLoad() {
    this.getExtendedData();
  }

  extendedProfile: {
    personID: string;
    perDOB: string;
    gender: string;
    perDegree: string;
    perDesignation: string;
    fees: string;
    oldAptFees: string;
    description: string;
    perCertificate: any;
  } = {
    personID: "",
    perDOB: "",
    gender: "",
    perDegree: "",
    perDesignation: "",
    fees: "",
    oldAptFees: "",
    description: "",
    perCertificate: ""
  };

  // selectedDesignation = this.designations[0];
  // selectedMaritalStatus = this.allMaritalStatus[0];

  submitDetails() {
    var emailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\",this.toastCtrl);)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var nameValidation = /[^a-zA-Z]/;

    let time = new Date(this.extendedProfile.perDOB);
    console.log("time >> ", time.getTime());
    this.extendedProfile.perDOB = time.getTime().toString();

    if (this.extendedProfile.perDOB.length == 0) {
      showToast("Please Enter dob", this.toastCtrl);
      return;
    } else if (this.extendedProfile.gender.length == 0) {
      showToast("Please select gender", this.toastCtrl);
      return;
    } else if (this.extendedProfile.perDegree.length == 0) {
      showToast("Please Enter degree", this.toastCtrl);
      return;
    } else if (this.extendedProfile.perDesignation.length == 0) {
      showToast("Please Enter designation", this.toastCtrl);
      return;
    }

    this.callWebserviceUpdateExtendedData();
  }

  getExtendedData() {
    this.api
      .wsPostHeader(APIName.getExtendedDoctorProfile, "")
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          this.extendedProfile = resp.data;
          localStorage.setItem(perProfile, resp.data.perCertificate);

          // showToast(resp.message, this.toastCtrl)
          this.getGenderList();
          this.extendedProfile.fees = resp.data.fees;
          this.extendedProfile.oldAptFees = resp.data.oldAptFees;
          this.extendedProfile.perDegree = resp.data.perDegree;
          this.extendedProfile.perDesignation = resp.data.perDesignation;
          this.extendedProfile.gender = resp.data.gender;
          this.extendedProfile.description = resp.data.description;
          this.extendedProfile.perCertificate = resp.data.perCertificate;
          this.extendedProfile.perDOB = resp.data.perDOB
            ? this.changeStringToDate(resp.data.perDOB)
            : "";

            this.arrcertificates = resp.data.certificates;
            

          console.log("response====>", JSON.stringify(resp));
        }
      });
  }
  getGenderList() {
    this.api.wsPostHeader(APIName.gender, "").then((resp: any) => {
      if (resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      } else {
        this.genderArray = resp.data;
      }
    });
  }
  radioClicked(val) {
    this.extendedProfile.gender = val;
    console.log("radioselected", this.extendedProfile.gender);
  }
  callWebserviceUpdateExtendedData() {
    this.formData.append("perProfile", this.extendedProfile.perCertificate);
    console.log("submit===>", JSON.stringify(this.extendedProfile));
    this.api
      .wsPostHeader(APIName.updateExtendedDoctorProfile, this.extendedProfile)
      .then((resp: any) => {
        if (resp.status === 500) {
          showToast(resp.error.message, this.toastCtrl);
          // localStorage.setItem(perProfile, resp.data.perCertificate);
        } else {
          showToast(resp.message, this.toastCtrl);
        }
      });
  }

  ///to convert date and time////
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
  changeDateFormat(
    date: Date,
    formate?: string //date to any format
  ) {
    let latest_date = this.datepipe.transform(date, formate);
    return latest_date;
  }

  //add viral code

  buttonClickForChooseIDs() {
    showActionSheetPhoto(this.actionSheetCrtl).then(seletedIndex => {
      this.choosePhotoFromCameraOrGallery(seletedIndex);
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

  
    // this.camera.getPicture(options).then(
     this.imagePicker.getPictures(options).then(
      imagePath => {
        console.log("getPicture >> ", imagePath);
        console.log("getPicture  normalizeURL(imagePath) >> ",normalizeURL(imagePath));

        for (var i = 0; i < imagePath.length; i++) {
          console.log('Image URI: ' + imagePath[i]);
          this.saveImage(normalizeURL(imagePath[i]));

        // this.extendedProfile.perCertificate = imagePath[i];
      }

      this.arrcertificates = imagePath;

        
      },
      err => {
        alert(err);
      }
    );
  }
  showPhoto(imagePath) {
    console.log("showPhoto clicked");
    this.photoViewer.show(imagePath);
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
      var imgBlob = new Blob([reader.result], { type: file.type });
      // console.log("readFile() : file.type >> ", file.type);
      // console.log("readFile() : file >> ", file);
      this.formData.append("perCertificate", imgBlob, file.name);
    };
    reader.readAsArrayBuffer(file);
  }
}
