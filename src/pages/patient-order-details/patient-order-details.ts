import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { selectedRole, APIName,showActionSheetPhoto } from '../../providers/commonfunction/commonfunction';
import { ApiProvider } from '../../providers/api/api';
import {
  Camera,
  CameraOptions,
  DestinationType,
  PictureSourceType
} from "@ionic-native/camera";
import { ImagePicker } from '@ionic-native/image-picker';
import { normalizeURL } from "ionic-angular";
import { File,FileEntry } from '@ionic-native/file';
import { PhotoViewer } from "@ionic-native/photo-viewer";

/**
 * Generated class for the PatientOrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-order-details',
  templateUrl: 'patient-order-details.html',
})
export class PatientOrderDetailsPage {

  selectedRole:any;
  finalcost:any;
  public ordertype:any = "Home"; 
  public paymenttype:any = "COD"
  public checkpres:any="No";
  showForm:boolean;
  public addresses = [];
  public arrcertificates : any[] = [];
  formData = new FormData();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public api: ApiProvider,
              public actionSheetCrtl: ActionSheetController,
              private camera: Camera,
              private imagePicker: ImagePicker,
              public file: File,
              public photoViewer: PhotoViewer) {
  }

  ionViewDidLoad() {
    this.selectedRole = this.navParams.get("selectedMeds");
    this.finalcost = this.navParams.get("finalcost");
    console.log("New Role= ",this.selectedRole);
    console.log('ionViewDidLoad PatientOrderDetailsPage');

    this.getpatientmedlocation();
  }

  getpatientmedlocation()
  {
    this.api
    .wsPostHeader(APIName.postordermedicinelocation, "")
    .then((resp: any) => {
     console.log(resp);
     this.addresses = resp.data.patAddressPojo;
    });
  }

  checkpresmethod(){
    if(this.checkpres == "Yes"){
      this.showForm = false;
    } else {
      this.showForm = true;
    }
  }

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

  showPhoto(imagePath) {
    console.log("showPhoto clicked");
    this.photoViewer.show(imagePath);
  }

  // visittype() {
  //   this.api
  //     .wsPostHeaderBackground(APIName.appointmentType, "")
  //     .then((resp: any) => {
  //       this.visittypeArray = resp.data;
  //       if (this.visittypeArray.length > 0) {
  //         this.visittypeId = this.visittypeArray[0].key;
  //       } else {
  //         this.visittypeId = "";
  //       }
  //     });
  // }

  // getvisittypeid(visit: any) {
  //   this.visittypeId = visit;
  // }

}
