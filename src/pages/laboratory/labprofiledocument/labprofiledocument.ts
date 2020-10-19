import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ToastController,
  Platform,
  normalizeURL
} from "ionic-angular";
import { Camera, DestinationType } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";
import { ApiProvider } from "../../../providers/api/api";
import { LaboratorydashboardPage } from "../laboratorydashboard/laboratorydashboard";
import { FileEntry, File } from "@ionic-native/file";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import {
  showActionSheetPhoto,
  showToast,
  APIName
} from "../../../providers/commonfunction/commonfunction";

/**
 * Generated class for the LabprofiledocumentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-labprofiledocument",
  templateUrl: "labprofiledocument.html"
})
export class LabprofiledocumentPage {
  formData = new FormData();

  isChkBoxAdharCardActive: boolean = false;
  isChkBoxPanCardActive: boolean = false;
  isChkBoxLicenseActive: boolean = false;

  selectImageFor: number;

  // imageAadharCard: string = null
  // imagePancard: string = null
  // imageLicense: string = null

  public profileDocument: {
    personID: string;
    perAadhaar: string;
    isAadhaarverified: string;
    perPANCard: string;
    isPerPANCardverified: string;
    perAadhaarCardID: string;
    perDriving: string;
    isPerDrivingLicense: string;
    perSSN: string;
    perSIN: string;
    perPANcardNo: string;
    perDrivingLicenseNo: string;
    perAadhaarCardNo: string;
    perPANcardID: string;
    perDrivingLicenseID: string;
  } = {
    personID: "",
    perAadhaar: "",
    isAadhaarverified: "",
    perPANCard: "",
    isPerPANCardverified: "",
    perDriving: "",
    isPerDrivingLicense: "",
    perSSN: "",
    perSIN: "",
    perPANcardNo: "",
    perDrivingLicenseNo: "",
    perAadhaarCardNo: "",
    perAadhaarCardID: "",
    perPANcardID: "",
    perDrivingLicenseID: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private actionSheetCrtl: ActionSheetController,
    private tostCrtl: ToastController,
    public platform: Platform,
    public filePath: FilePath,
    public file: File,
    public photoViewer: PhotoViewer,
    public api: ApiProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LabprofiledocumentPage");
    this.getDocumentData();
  }

  clickOnAdharCardChkBox() {
    this.isChkBoxAdharCardActive = !this.isChkBoxAdharCardActive;
    console.log("Cucumbers new state:" + this.isChkBoxAdharCardActive);
  }

  buttonClickForChooseIDs(type) {
    this.selectImageFor = type;
    showActionSheetPhoto(this.actionSheetCrtl).then(seletedIndex => {
      this.choosePhotoFromCameraOrGallery(seletedIndex);
    });
  }

  clickOnButtonSave() {
    // if (this.isChkBoxAdharCardActive && (this.profileDocument.perAadhaarCardID == "" || this.profileDocument.perAadhaarCardID == null)) {
    //   showToast("Please enter adhar card number", this.tostCrtl)
    // }
    // else if (this.isChkBoxPanCardActive && (this.profileDocument.perPANcardID == "" || this.profileDocument.perPANcardID == null)) {
    //   showToast("Please enter pan card number", this.tostCrtl)
    // }
    // else if (this.isChkBoxLicenseActive && (this.profileDocument.perDrivingLicenseID == "" || this.profileDocument.perDrivingLicenseID == null)) {
    //   showToast("Please enter license number", this.tostCrtl)
    // }

    console.log(
      "ssn :- " +
        this.profileDocument.perSSN +
        "Sin" +
        this.profileDocument.perSIN
    );
    if (
      this.profileDocument.perSSN == "" ||
      this.profileDocument.perSSN == null
    ) {
      showToast("Please enter SSN No", this.tostCrtl);
    } else if (
      this.profileDocument.perSIN == "" ||
      this.profileDocument.perSIN == null
    ) {
      showToast("Please enter SIN No", this.tostCrtl);
    } else {
      this.callWebserviceUpdateDocuments();
    }
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
        console.log("getPicture >> ", imagePath);
        console.log("getPicture >> ", imagePath);
        console.log(
          "getPicture  normalizeURL(imagePath) >> ",
          normalizeURL(imagePath)
        );
        this.saveImage(normalizeURL(imagePath));

        if (this.selectImageFor == 1) {
          this.profileDocument.perAadhaarCardID = imagePath;
        } else if (this.selectImageFor == 2) {
          this.profileDocument.perPANcardID = imagePath;
        } else {
          this.profileDocument.perDrivingLicenseID = imagePath;
        }
      },
      err => {
        // Handle error
        alert(err);
      }
    );
  }

  showPhoto(imagePath) {
    console.log("showPhoto clicked");
    this.photoViewer.show(imagePath);
  }

  callWebserviceUpdateDocuments() {
    this.formData.append("personID", this.profileDocument.personID);
    this.formData.append(
      "isAadhaarverified",
      this.profileDocument.isAadhaarverified
    );
    this.formData.append(
      "isPerDrivingLicense",
      this.profileDocument.isPerDrivingLicense
    );
    this.formData.append(
      "isPerPANCardverified",
      this.profileDocument.isPerPANCardverified
    );
    this.formData.append("perSIN", this.profileDocument.perSIN);
    this.formData.append("perSSN", this.profileDocument.perSSN);

    console.log("perSIN :- " + this.profileDocument.perSIN);
    console.log("perSSN :- " + this.profileDocument.perSSN);

    console.log("Dataaaaaa :- " + JSON.stringify(this.formData));

    this.api
      .wsPostMutlipartHeader(
        APIName.updateDocumentsPatientProfile,
        this.formData
      )
      .then((resp: any) => {
        showToast(resp.message, this.tostCrtl);
      });
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
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], { type: file.type });
      console.log("imgBlob >> ", imgBlob);

      if (this.selectImageFor == 1) {
        this.formData.append("perAadhaar", imgBlob, file.name);
      } else if (this.selectImageFor == 2) {
        this.formData.append("perDriving", imgBlob, file.name);
      } else {
        this.formData.append("perPANCard", imgBlob, file.name);
      }

      // this.callWebserviceUpdateDocuments()
    };
    reader.readAsArrayBuffer(file);
  }

  getDocumentData() {
    this.api
      .wsPostHeader(APIName.getDocumentsPatientProfile, "")
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          console.log("getDocumentData >> ", resp);
          // this.profileDocument = resp.data
          this.profileDocument.personID = resp.data.personID;
          this.profileDocument.perAadhaarCardNo = resp.data.perAadhaarCardNo;
          this.profileDocument.perAadhaarCardID = resp.data.perAadhaarCardID;
          this.profileDocument.perPANcardID = resp.data.perPANcardID;
          this.profileDocument.perDrivingLicenseID =
            resp.data.perDrivingLicenseID;

          this.profileDocument.perDrivingLicenseNo =
            resp.data.perDrivingLicenseNo;
          this.profileDocument.perPANcardNo = resp.data.perPANcardNo;

          this.profileDocument.perAadhaar = resp.data.perAadhaarCardID;
          this.profileDocument.isAadhaarverified = resp.data.isAadhaarverified;
          this.profileDocument.perPANCard = resp.data.perPANcardID;
          this.profileDocument.isPerPANCardverified =
            resp.data.isPerPANCardverified;
          this.profileDocument.perDriving = resp.data.perDrivingLicenseID;
          this.profileDocument.isPerDrivingLicense =
            resp.data.isPerDrivingLicense;
          this.profileDocument.perSIN = resp.data.perSIN;
          this.profileDocument.perSSN = resp.data.perSSN;

          // this.profileDocument.perPANCardNo = resp.data.perAadhaarCardNo
          // this.profileDocument.perDrivingNo = resp.data.perDrivingLicenseNo
          // this.profileDocument.perAadhaarNo = resp.data.perPANcardNo

          /*this.formData.append('personID', this.profileDocument.personID)
        this.formData.append('isAadhaarverified', this.profileDocument.isAadhaarverified)
        this.formData.append('isPerDrivingLicense', this.profileDocument.isPerDrivingLicense)
        this.formData.append('isPerPANCardverified', this.profileDocument.isPerPANCardverified)
        this.formData.append('perSIN', this.profileDocument.perSIN)
        this.formData.append('perSSN', this.profileDocument.perSSN)*/

          // this.formData.append('perAadhaar', this.profileDocument.perAadhaarCardID)
          // this.formData.append('perDriving', this.profileDocument.perDrivingLicenseID)
          // this.formData.append('perPANCard', this.profileDocument.perPANcardID)
        }
      });
  }
  cancel() {
    console.log("cancel button clicked");

    this.navCtrl.parent.parent.push(LaboratorydashboardPage);
  }
}
