import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ActionSheetController,
  AlertController,
  normalizeURL
} from "ionic-angular";
import {
  showToast,
  showActionSheetPhoto,
  APIName,
  perProfile
} from "../../../providers/commonfunction/commonfunction";
import { ApiProvider } from "../../../providers/api/api";
import { CameraOptions, Camera, DestinationType } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";
import { File, FileEntry } from "@ionic-native/file";
import { DatePipe } from "@angular/common";

/**
 * Generated class for the DoctorprofilepersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-doctorprofilepersonal",
  templateUrl: "doctorprofilepersonal.html"
})
export class DoctorprofilepersonalPage {
  public base64Image: string;
  secondaryEmail: string;
  emailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\",this.toastCtrl);)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  nameValidation = /[^a-zA-Z]/;

  formData = new FormData();
  public patAppTimeFrom = "";
  public patAppDate = "";
  public patAppTimeTo = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public api: ApiProvider,
    public actionSheetCrtl: ActionSheetController,
    private camera: Camera,
    public datepipe: DatePipe,
    public alertCtrl: AlertController,
    public filePath: FilePath,
    public file: File
  ) {}

  public profilePersonal: {
    perEmailList: string[];
    perProfile: string;
    personID: string;
    perFname: string;
    perLName: string;
    perEmailPrimary: string;
  } = {
    perEmailList: [],
    perProfile: "",
    personID: "",
    perFname: "",
    perLName: "",
    perEmailPrimary: ""
  };

  ionViewDidLoad() {
    console.log("ionViewDidLoad DoctorprofilepersonalPage");
    this.getPersonalData();
  }

  submitDetails() {
    // if (this.profilePersonal.username.length == 0) {
    //   showToast("Please Enter User name", this.toastCtrl);
    //   return
    // }
    // else if (nameValidation.test(this.profilePersonal.username)) {
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
    }
    //  else if (this.patAppTimeFrom.length == 0) {
    //   showToast("Please select Appointment start time", this.toastCtrl);
    //   return;
    // } else if (this.patAppTimeTo.length == 0) {
    //   showToast("Please select Appointment end time", this.toastCtrl);
    //   return;
    // }

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

    this.callWebserviceUpdatePersonalDetails();
  }
  changeDateFormat(date: Date, formate?: string) {
    let latest_date = this.datepipe.transform(date, formate);
    console.log("ChangeDateFormat", latest_date);
    return latest_date;
  }

  getPersonalData() {
    this.api
      .wsPostHeader(APIName.getPersonalDoctorProfile, "")
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          localStorage.setItem(perProfile, resp.data.perProfile);

          this.profilePersonal.personID = resp.data.personID;
          this.profilePersonal.perProfile = resp.data.perProfile;
          this.profilePersonal.perFname = resp.data.perFname;
          this.profilePersonal.perLName = resp.data.perLName;
          this.profilePersonal.perEmailPrimary = resp.data.perEmailPrimary;

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
    this.formData.append(
      "perEmailPrimary",
      this.profilePersonal.perEmailPrimary
    );
    this.formData.append("perProfile", this.profilePersonal.perProfile);

    let emails: string = "";

    for (let emailItem of this.profilePersonal.perEmailList) {
      emails = emails + "," + emailItem;
    }

    while (emails.charAt(0) === ",") {
      emails = emails.substr(1);
    }

    this.formData.append("perEmailList", emails);

    this.api
      .wsPostMutlipartHeader(APIName.updatePersonalDoctorProfile, this.formData)
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
    let alert = this.alertCtrl.create({
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

  buttonClickForChooseIDs() {
    showActionSheetPhoto(this.actionSheetCrtl).then(seletedIndex => {
      this.choosePhotoFromCameraOrGallery(seletedIndex);
    });
  }

  choosePhotoFromCameraOrGallery(sourceType: number) {
    console.log("111111111");
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
    console.log("22222222");
    this.camera.getPicture(options).then(
      imagePath => {
        console.log("3333333");
        console.log("getPicture >> ", imagePath);
        console.log("4444444444");
        console.log(
          "getPicture  normalizeURL(imagePath) >> ",
          normalizeURL(imagePath)
        );
        console.log("5555555555");
        this.saveImage(normalizeURL(imagePath));
        console.log("6666666666");
        this.profilePersonal.perProfile = imagePath;
        console.log("777777777");
      },
      err => {
        alert(err);
        console.log("88888888");
      }
    );
  }

  private saveImage(imageFileUri: any): void {
    console.log("99999999");
    this.file
      .resolveLocalFilesystemUrl(imageFileUri)
      .then(entry =>
        (<FileEntry>entry).file(file => {
          console.log("aaaaaaaaa");
          this.readFile(file);
          console.log("bbbbbb");
        })
      )
      .catch(err => console.log(err));
    console.log("ccccccccc");
  }

  private readFile(file: any) {
    console.log("dddddddddd");
    var reader = new FileReader();
    reader.onloadend = () => {
      console.log("eeeeeeeeee");
      var imgBlob = new Blob([reader.result], { type: file.type });
      // console.log("readFile() : file.type >> ", file.type);
      // console.log("readFile() : file >> ", file);
      console.log("fffffff");
      this.formData.append("perProfile", imgBlob, file.name);
      console.log("gggggggggg");
    };
    reader.readAsArrayBuffer(file);
    console.log("hhhhhhh");
  }
}
