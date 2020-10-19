import { Component, ElementRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ToastController,
  normalizeURL,
  Platform
} from "ionic-angular";
import { ApiProvider } from "../../../providers/api/api";
import {
  APIName,
  showActionSheetPhoto,
  username,
  password,
  showToast
} from "../../../providers/commonfunction/commonfunction";
import { Camera, DestinationType } from "@ionic-native/camera";
import { HttpHeaders } from "@angular/common/http";
import { FileTransferObject, FileTransfer } from "@ionic-native/file-transfer";
import { FileEntry, File } from "@ionic-native/file";
import { LabreportPage } from "../labreport/labreport";
import { VideoPlayer, VideoOptions } from "@ionic-native/video-player";
import { ViewChild } from "@angular/core";

/**
 * Generated class for the LabaddreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-labaddreport",
  templateUrl: "labaddreport.html"
})
export class LabaddreportPage {
  public labReportList: any = [];
  public AllReportList: any = [];

  num: number = 0;
  imagePancard: any ;
  LabReportFile = "";
  LabReportvideoFile = "";
  reportPatLapAppId: string;
  formData = new FormData();

  arrDiseaseAssociated: any = [];

  public Objecttobeinserted = {
    ReportDate: "12 Jan 2017",
    ReportTime: "07:15 pm",
    PatientId: this.num,
    ReportName: "CBC", //lrl1Name
    DiseaseAssociated: "    Impetigo" //diagnosisMasterdata->diagnosiseName
  };
  public Objecttobeinserted1 = {
    ReportDate: "13 Jan 2017",
    ReportTime: "8:20 pm",
    PatientId: "00001",
    ReportName: "HB",
    DiseaseAssociated: "Ring Warm"
  };
  Patients: any = [];
  // arrDiseaseAssociated: any = [];
  public IsShow: boolean = false;
  public DataFromOtherPage: any;
  public IsShowDataFromOtherPage: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public camera: Camera,
    public actionSheetCrtl: ActionSheetController,
    public toastCtrl: ToastController,
    private transfer: FileTransfer,
    public file: File,
    private videoPlayer: VideoPlayer,
    public platform: Platform
  ) {
    if (this.navParams.get("item")) {
      console.log(
        'JSON.stringify(this.navParams.get("item")) === ' +
          JSON.stringify(this.navParams.get("item"))
      );
      this.DataFromOtherPage = this.navParams.get("item");
      this.labReportList = [];
      this.AllReportList = [];
      this.Patients = [];
      this.IsShowDataFromOtherPage = true;

      this.arrDiseaseAssociated = [];
    } else {
      console.log(
        "Undefineeeeeeddddddd === " + JSON.stringify(this.navParams.get("item"))
      );
      this.labReportList = [];
      this.AllReportList = [];
      this.Patients = [];
      this.IsShowDataFromOtherPage = false;
      this.arrDiseaseAssociated = [];
    }
    console.log(
      'JSON.stringify(this.navParams.get("item")) === ' +
        JSON.stringify(this.navParams.get("item"))
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LabaddreportPage");

    if (this.IsShowDataFromOtherPage) {
      let tempObj = {
        patientID: this.DataFromOtherPage.patientID,
        patientName: this.DataFromOtherPage.name
      };

      this.Patients.push(tempObj);
      this.LabReport.Patient = this.Patients[0];
    } else {
      this.api.wsPostHeader(APIName.getAllPatient, {}).then((resp: any) => {
        if (resp.status === 500) {
        } else {
          console.log("location array 0 item", this.Patients);
          this.Patients = resp.data;
        }
      });
    }
  }
  LabReport: {
    Patient: any;
    PatientID: any;
    PatLabAppointmentID: any;
    ReportDetail: string;
    AdditionalDetail: string;
    ReportName: string;
    ExtraDetail: string;
    DiseaseAssociated: any;
    DiseaseID: string;
    labReportLevel1ID: string;
  } = {
    Patient: {},
    PatientID: "",
    PatLabAppointmentID: "",
    ReportDetail: "",
    AdditionalDetail: "",
    ReportName: "",
    ExtraDetail: "",
    DiseaseAssociated: {},
    DiseaseID: "",
    labReportLevel1ID: ""
  };
  viewReportList(data) {
    console.log(data);
  }
  NextClicked() {
    let patientMaster1 = { patientID: this.LabReport.PatientID };
    let Param: any;
    if (this.IsShowDataFromOtherPage) {
      let patLabAppointmentID123 = {
        patLabAppointmentID: this.DataFromOtherPage.patLabAppointmentID
      };

      Param = {
        patientMaster: patientMaster1,
        reportDetail: this.LabReport.ReportDetail,
        additionalDetail: this.LabReport.AdditionalDetail,
        patLabAppointments: patLabAppointmentID123,
        patAppStatus: "Completed"
        //  patLabAppointmentID: this.DataFromOtherPage.patLabAppointmentID
      };
    } else {
      Param = {
        patientMaster: patientMaster1,
        reportDetail: this.LabReport.ReportDetail,
        additionalDetail: this.LabReport.AdditionalDetail,
        patAppStatus: "Completed"
      };
    }
    this.api
      .wsPostHeaderBackground(APIName.addOrEditLabReportByLabUser, Param)
      .then((resp: any) => {
        this.IsShow = true;

        this.reportPatLapAppId = resp.data.reportPatLapAppId;

        if (this.IsShowDataFromOtherPage) {
          this.AllReportList = this.DataFromOtherPage.data;
          console.log(
            "this.AllReportList" + JSON.stringify(this.AllReportList)
          );
          this.LabReport.ReportName = this.AllReportList[0];
          this.LabReport.labReportLevel1ID = this.AllReportList[0].labReportLevel1ID;
          this.WsGetAllDiagnosis();
        } else {
          this.WsGetAllLab1ReportByLab();
        }
      });

    console.log("dsfffewfewf" + this.IsShow);
  }

  BackClicked() {
    this.IsShow = false;
  }
  SaveClicked() {
    if (this.IsShowDataFromOtherPage) {
      this.formData.append("reportLapAppId", "0");
      this.formData.append("reportPatLapAppId", this.reportPatLapAppId);
      this.formData.append("diagnosisMaster", this.LabReport.DiseaseID);
      this.formData.append(
        "labReportLevel1ID",
        this.LabReport.labReportLevel1ID
      );
      this.formData.append("extraDetail", this.LabReport.ExtraDetail);
    } else {
      this.formData.append("reportLapAppId", "0");
      this.formData.append("reportPatLapAppId", this.reportPatLapAppId);
      this.formData.append("diagnosisMaster", this.LabReport.DiseaseID);
      this.formData.append(
        "labReportLevel1ID",
        this.LabReport.labReportLevel1ID
      );
      this.formData.append("extraDetail", this.LabReport.ExtraDetail);
    }
    // this.formData.append("vidreportPath", undefined);

    this.api
      .wsPostMutlipartHeader(APIName.addOrEditReportByLabUser, this.formData)
      .then((resp: any) => {
        showToast(resp.message, this.toastCtrl);
      });
  }
  onSelectChange(event) {
    this.LabReport.PatientID = event.patientID;
    this.LabReport.PatLabAppointmentID = event.patLabAppointmentID;

    console.log("Event =" + JSON.stringify(event));
  }

  public onSelectChangeReportName(event) {
    // this.LabReport.ReportName = event.lrl1Name;
    console.log("onsaelectcll");
    this.LabReport.labReportLevel1ID = event.labReportLevel1ID;
    console.log(this.LabReport.labReportLevel1ID);
  }

  onSelectChangeDesease(event) {
    this.LabReport.DiseaseID = event.diagnosisID;
  }

  SaveAndAddClicked() {
    // console.log(this.LabReport.DiseaseAssociated);

    console.log(this.reportPatLapAppId);
    console.log(this.LabReport.DiseaseID);
    console.log(this.LabReport.labReportLevel1ID);
    console.log(this.LabReport.ExtraDetail);

    // this.uploadFile();
    this.callWebserviceUpdatePersonalDetails();

    // this.labReportList.push(this.Objecttobeinserted);
  }
  WsGetAllDiagnosis() {
    this.api.wsPostHeaderBackground(APIName.getAllDiagnosis, {}).then(resp => {
      let Temparray: any = resp;
      this.arrDiseaseAssociated = Temparray.data;
    });
  }

  WsGetAllLab1ReportByLab() {
    this.api
      .wsPostHeaderBackground(APIName.getAllLab1ReportByLab, {})
      .then(resp => {
        let Temparray: any = resp;
        this.AllReportList = Temparray.data;
        console.log("this.AllReportList" + JSON.stringify(this.AllReportList));
        this.WsGetAllDiagnosis();
      });
  }
  CancelClicked() {}
  DeleteFromList(obj) {
    let index = this.labReportList.indexOf(obj);
    console.log(index);

    this.labReportList.splice(index, 1);
  }

  buttonClickForChooseReports() {
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

    this.camera.getPicture(options).then(
      imagePath => {
        console.log("getPicture >> ", imagePath);
        console.log(
          "getPicture  normalizeURL(imagePath) >> ",
          normalizeURL(imagePath)
        );
        this.saveImage(normalizeURL(imagePath));
        this.LabReportFile = imagePath;
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
      var imgBlob = new Blob([reader.result], { type: file.type });
      // console.log("readFile() : file.type >> ", file.type);
      // console.log("readFile() : file >> ", file);
      this.formData.append("reportPath", imgBlob, file.name);
    };
    reader.readAsArrayBuffer(file);
  }
  callWebserviceUpdatePersonalDetails() {
    if (this.IsShowDataFromOtherPage) {
      console.log("if call...");
      this.formData.append("reportLapAppId", "0");
      this.formData.append("reportPatLapAppId", this.reportPatLapAppId);
      this.formData.append("diagnosisMaster", this.LabReport.DiseaseID);
      this.formData.append(
        "labReportLevel1ID",
        this.LabReport.labReportLevel1ID
      );
      this.formData.append("extraDetail", this.LabReport.ExtraDetail);
      this.formData.append("reportPath", this.LabReportFile);
      this.formData.append("vidreportPath", this.LabReportvideoFile);
    } else {
      console.log(this.labReportList.labReportLevel1ID + "else call...");
      this.formData.append("reportLapAppId", "0");
      this.formData.append("reportPatLapAppId", this.reportPatLapAppId);
      this.formData.append("diagnosisMaster", this.LabReport.DiseaseID);
      this.formData.append(
        "labReportLevel1ID",
        this.LabReport.labReportLevel1ID
      );
      this.formData.append("extraDetail", this.LabReport.ExtraDetail);
      this.formData.append("reportPath", this.LabReportFile);
      this.formData.append("vidreportPath", this.LabReportvideoFile);
    }

    this.api
      .wsPostMutlipartHeader(APIName.addOrEditReportByLabUser, this.formData)
      .then((resp: any) => {
        showToast(resp.message, this.toastCtrl);
      });
  }

  //video

  selectedVideo: string;

  videoopt: VideoOptions;
  videourl: string;

  buttonClickForChooseReportsvideo() {
    showActionSheetPhoto(this.actionSheetCrtl).then(seletedIndex => {
      this.choosePhotoFromCameraOrGalleryvideo(seletedIndex);
    });
  }
  videooption: VideoOptions;
  choosePhotoFromCameraOrGalleryvideo(sourceType: number) {
    var options = {
      quality: 100,
      destinationType: DestinationType.FILE_URL,
      sourceType: sourceType,
      // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: true,
      // encodingType: this.camera.EncodingType.,
      mediaType: this.camera.MediaType.VIDEO,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(
      async videoPath => {
        console.log("getPicture >> ", "file://" + videoPath);
        console.log(
          "getvideo  normalizeURL(videopath) >> ",
          normalizeURL("file://" + videoPath)
        );
        this.savevideo(normalizeURL("file://" + videoPath));
        var filename = videoPath.substr(videoPath.lastIndexOf("/") + 1);
        var dirpath = videoPath.substr(0, videoPath.lastIndexOf("/") + 1);
        dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
        try {
          var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
          var retrievedFile = await this.file.getFile(dirUrl, filename, {});
        } catch (err) {}

        this.videooption = { volume: 0.7 };
        retrievedFile.file(data => {
          this.LabReportvideoFile = retrievedFile.nativeURL;
          console.log("video url------" + retrievedFile.nativeURL);
          this.selectedVideo = retrievedFile.nativeURL;
        });
      },
      err => {
        alert(err);
      }
    );
  }
  private savevideo(videoFileUri: any): void {
    this.file
      .resolveLocalFilesystemUrl(videoFileUri)
      .then(entry =>
        (<FileEntry>entry).file(file => {
          this.readFilevideo(file);
        })
      )
      .catch(err => console.log(err));
  }

  private readFilevideo(file: any) {
    var reader = new FileReader();
    reader.onloadend = () => {
      var imgBlob = new Blob([reader.result], { type: file.type });
      this.formData.append("vidreportPath", imgBlob, file.name);
    };
    reader.readAsArrayBuffer(file);
  }
}
