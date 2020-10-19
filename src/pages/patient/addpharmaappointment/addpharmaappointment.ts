import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ActionSheetController
} from "ionic-angular";
import { ApiProvider } from "../../../providers/api/api";
import {
  showToast,
  APIName,
  showActionSheetPhoto
} from "../../../providers/commonfunction/commonfunction";
import { DatePipe } from "@angular/common";
import { Cordova } from "@ionic-native/core";
import { callbackify } from "util";
import {
  InAppBrowser,
  InAppBrowserOptions
} from "@ionic-native/in-app-browser";
import { Select2OptionData } from "ng2-select2";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import {
  Camera,
  CameraOptions,
  DestinationType,
  PictureSourceType
} from "@ionic-native/camera";
import { normalizeURL } from "ionic-angular";
import { ImagePicker } from "@ionic-native/image-picker";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { File, FileEntry } from "@ionic-native/file";
import { PatientOrderDetailsPage } from "../../patient-order-details/patient-order-details";
// import * as $ from "jquery";
/**import { FormGroup, FormControl } from '@angular/forms';

 * Generated class for the AddappointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// declare var paytm: any;
declare let window: any; // <--- Declare it like this
const checksum_lib = require("../../../../paytm/checksum");
var paytm_config = require("../../../../paytm/paytm_config").paytm_config;

@IonicPage()
@Component({
  selector: "page-addpharmaappointment",
  templateUrl: "addpharmaappointment.html"
})
export class AddPharmaAppointmentPage {
  public facilitiesArray: any[] = [];
  public locationArray: any[] = [];
  public MedicalStoreArray: any[] = [];
  public MedByPharmaArray: any[] = [];
  public doctorArray: any[] = [];
  public visittypeArray: any[] = [];
  public deliverytypeArray: any[] = [];
  public visitreasonArray: any[] = [];
  public facilityCenterID = "";
  public fcLocationMapID = "";
  public fclProviderMapID = "";
  public drugcompundID = "";
  public costpermedicine = "";
  public visittypeId = "";
  public deliverytypeId = "";
  public visitreasonId = "";
  public patAppDate = "";
  public patAppTime = "";
  public patAppTimeTo = "";
  public patAppDescription = "";
  public fees = "";
  public orderID = 0;
  public custID = 0;
  public txnAmount = "";
  public providerId = "";
  public selectedMeds: any[] = [];
  public deliveryType = "";
  paramarray = {};
  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public value: string[];
  public current: string;
  public checkpres: any = "No";
  public checked: boolean = false;
  uploadpres: any;
  showForm: boolean;
  newmed: any = [];
  sameselectedMeds: any = [];
  selectedQuantity: any = [];
  finalmedcost: any;
  public orderMedicineForm: FormGroup;
  public arrcertificates: any[] = [];
  formData = new FormData();

  medData = {
    medicineName: "",
    selectedQuantity: 0
  };

  selectForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public datepipe: DatePipe,
    public toastCtrl: ToastController,
    private iab: InAppBrowser,
    private fb: FormBuilder,
    public actionSheetCrtl: ActionSheetController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    public photoViewer: PhotoViewer,
    public file: File,
    private fb1: FormBuilder
  ) {
    this.paramarray["MID"] = paytm_config.MID; //Provided by Paytm
    this.paramarray["INDUSTRY_TYPE_ID"] = "Retail"; //Provided by Paytm
    this.paramarray["CHANNEL_ID"] = "WAP"; //Provided by Paytm
    this.paramarray["WEBSITE"] = "WEBSTAGING"; //Provided by Paytm
    this.paramarray["ENVIRONMENT"] = "staging";
    this.paramarray["CHECKSUMHASH"] = "";
    this.orderMedicineForm = this.fb.group({});

    this.value = ["multiple2", "multiple4"];

    this.options = {
      multiple: true
    };

    this.current = this.value.join(" | ");
    this.selectForm = this.fb1.group({
      MedicineRequired: new FormControl()
    });

    // this.selectForm.controls['MedicineRequired'].valueChanges.subscribe(val=>{
    //   console.log(val);
    // });
  }
  changed(data: { value: string[] }) {
    // this.current = data.value.join(' | ');
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad AddappointmentPage");
    this.getallFacilities();
    this.visitreason();
    this.visittype();
  }

  /// facility////
  getallFacilities() {
    var data1 = {
      facilityCenterType: "MedicalStore"
    };
    this.api
      .wsPostHeader(APIName.getAllFacilityByPerameter, data1)

      .then((resp: any) => {
        if (resp.status === 500) {
        } else {
          this.facilitiesArray = resp.data;
          this.facilityCenterID = this.facilitiesArray[0].facilityCenterID;
          this.getFacilityid(this.facilityCenterID);
        }
      });
  }
  getFacilityid(facilityid: any) {
    this.facilityCenterID = facilityid;
    this.getAllLocations();
    console.log("facilityCenterID", "" + this.facilityCenterID);
  }

  checkpresmethod() {
    if (this.checkpres == "Yes") {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
  }

  /// locations////
  getAllLocations() {
    var data = {
      facilityCenterID: this.facilityCenterID
    };
    this.api
      .wsPostHeaderBackground(APIName.getAllLocationByFacility, data)
      .then((resp: any) => {
        this.locationArray = resp.data;

        if (this.locationArray.length > 0) {
          this.fcLocationMapID = this.locationArray[0].fcLocationMapID;
          this.getlocationid(this.fcLocationMapID);
        } else {
          this.fcLocationMapID = "";
          this.getlocationid(this.fcLocationMapID);
        }
      });
  }
  getlocationid(locationid: any) {
    this.fcLocationMapID = locationid;
    console.log("locationID::" + locationid);
    this.getAllMedicalStore();
  }

  /// MedicalStore////
  getAllMedicalStore() {
    var data = {
      fcLocationMapID: this.fcLocationMapID
    };
    this.api
      .wsPostHeaderBackground(APIName.getAllMedicalStore, data)
      .then((resp: any) => {
        this.MedicalStoreArray = resp.data;
        if (this.MedicalStoreArray.length > 0) {
          this.fclProviderMapID = this.MedicalStoreArray[0].fclProviderMapID;
          this.providerId = this.MedicalStoreArray[0].providerID;
          this.getmedicalStoreID(this.fclProviderMapID);
        } else {
          this.fclProviderMapID = "";
          this.providerId = "";
        }
      });
  }

  getmedicalStoreID(medicalStore: any) {
    console.log(medicalStore);
    this.fclProviderMapID = medicalStore;
    this.getMedByPharma();
  }

  getMedByPharma() {
    var data = {
      fclProviderMapID: this.fclProviderMapID
    };
    this.api
      .wsPostHeaderBackground(APIName.getMedByPharma, data)
      .then((resp: any) => {
        this.MedByPharmaArray = resp.data.medicinePojoList;
        console.log("MedByPharma===========", this.MedByPharmaArray);
        if (this.MedByPharmaArray.length > 0) {
          this.drugcompundID = this.MedByPharmaArray[0];
          this.getMedByPharmaID(this.drugcompundID, this.drugcompundID);
        } else {
          this.drugcompundID = "";
        }
      });
  }

  getMedByPharmaID(medByPharma: any, type: any) {
    // if (type != undefined) {

    console.log(JSON.stringify(medByPharma));
    console.log(type);

    this.selectedMeds = [];
    if (medByPharma != undefined && medByPharma instanceof Array) {
      medByPharma.forEach(element => {
        let drugname = this.MedByPharmaArray.find(
          item => item.medicineName === element.text
        );

        this.selectedMeds.push(drugname);
      });
    } else {
    }
    // }
    // console.log(this.selectedMeds);
  }

  getQuantity() {
    var totalcost = 0;
    for (let key in this.newmed) {
      if (this.newmed[key] < 0) {
        showToast("Please Enter Proper Quantity", this.toastCtrl);
      }
      var costformed = this.selectedMeds.filter(
        item => item.medicineName === key
      );
      let data = { medname: "", medqua: 0, costpermedicine: 0 };
      data.medname = key;
      data.medqua = this.newmed[key];
      for (let cost of costformed) {
        data.costpermedicine = cost.costpermedicine;
      }
      this.sameselectedMeds.push(data);
    }
    this.selectedQuantity = this.sameselectedMeds;
    for (let val of this.selectedMeds) {
      var result = this.sameselectedMeds.filter(
        item => item.medname === val.medicineName
      );
      if (result) {
        for (let total of result) {
          if (total.medqua <= val.medicineQuantity) {
            totalcost += total.medqua * val.costpermedicine;
          } else {
            // this.is_med = true;
            showToast(
              "Please Enter Proper Quantity for " +
                "'" +
                val.medicineName +
                "'" +
                " Medicine",
              this.toastCtrl
            );
            // this.errorMessage = "Please Enter Proper Quantity for " +"'"+val.medicineName+"'"+" Medicine";
          }
        }
      }
    }
    this.finalmedcost = totalcost;
    this.sameselectedMeds = [];
    for (let key in this.newmed) {
      this.newmed[key] = "0";
    }
  }

  addValue(): void {
    this.checked = !this.checked;
    console.log("checked: " + this.checked); //it is working !!!
  }
  visittype() {
    this.api
      .wsPostHeaderBackground(APIName.appointmentType, "")
      .then((resp: any) => {
        this.visittypeArray = resp.data;
        if (this.visittypeArray.length > 0) {
          this.visittypeId = this.visittypeArray[0].key;
        } else {
          this.visittypeId = "";
        }
      });
  }

  getvisittypeid(visit: any) {
    this.visittypeId = visit;
  }

  deliverytype() {
    this.api
      .wsPostHeaderBackground(APIName.appointmentType, "")
      .then((resp: any) => {
        this.deliverytypeArray = resp.data;
        if (this.deliverytypeArray.length > 0) {
          this.deliverytypeId = this.deliverytypeArray[0].key;
        } else {
          this.deliverytypeId = "";
        }
      });
  }

  getdeliverytypeid(delivery: any) {
    this.deliverytypeId = delivery;
  }

  /// visit reason////
  visitreason() {
    this.api
      .wsPostHeaderBackground(APIName.appointmentReason, "")
      .then((resp: any) => {
        this.visitreasonArray = resp.data;
        if (this.visitreasonArray.length > 0) {
          this.visitreasonId = this.visitreasonArray[0].key;
        } else {
          this.visitreasonId = "";
        }
      });
  }
  getvisitreasonid(visit: any) {
    this.visitreasonId = visit;
  }

  callAddAppointmentApi(item: any) {
    if (this.facilityCenterID.length == 0) {
      showToast("Please select facility", this.toastCtrl);
      return;
    }
    if (this.fcLocationMapID.length == 0) {
      showToast("Please select Location", this.toastCtrl);
      return;
    }
    // if (this.fclProviderMapID.length == 0) {
    //   showToast("Please select Speciality", this.toastCtrl);
    //   return;
    // }
    if (this.drugcompundID.length == 0) {
      showToast("Please select Medicine", this.toastCtrl);
      return;
    }

    if (this.visittypeId.length == 0) {
      showToast("Please select type Of Visit", this.toastCtrl);
      return;
    }

    if (this.patAppDescription.length == 0) {
      showToast("Please add Medicine detail", this.toastCtrl);
      return;
    }

    let drugname = this.MedByPharmaArray.find(
      item => item.drugcompundID === this.drugcompundID
    ).medicineName;
    let drugcost = this.MedByPharmaArray.find(
      item => item.drugcompundID === this.drugcompundID
    ).costpermedicine;

    if (this.checked == false) {
      this.makePayment();
    } else {
      let data = JSON.stringify({
        fclProviderMapID: { fclProviderMapID: this.fclProviderMapID },
        meddetail: this.patAppDescription,
        medname: drugname,
        medcost: drugcost,

        visittype: this.visittypeId.trim()
      });

      // if (this.visittypeId.length == 0) {
      //   showToast("Please select type Of Visit", this.toastCtrl);
      //   return;
      // }

      // if (this.patAppDescription.length == 0) {
      //   showToast("Please add Medicine detail", this.toastCtrl);
      //   return;
      // }

      // this.navCtrl.push(PatientOrderDetailsPage);
      console.log("PharmaArray= ", this.selectedQuantity);
      this.navCtrl.push(PatientOrderDetailsPage, {
        selectedMeds: this.selectedQuantity,
        finalcost: this.finalmedcost
      });
      // let drugname = this.MedByPharmaArray.find(
      //   item => item.drugcompundID === this.drugcompundID
      // ).medicineName;
      // let drugcost = this.MedByPharmaArray.find(
      //   item => item.drugcompundID === this.drugcompundID
      // ).costpermedicine;

      // if (this.checked == false) {
      //   this.makePayment();
      // } else
      // {

      // let data = JSON.stringify({

      //   fclProviderMapID: { fclProviderMapID: this.fclProviderMapID },
      //   meddetail: this.patAppDescription,
      //   medname: drugname,
      //   medcost: drugcost,

      //   visittype: this.visittypeId.trim()
      // });

      // console.log(data);
      // this.api
      //   .wsPostHeader(APIName.getmedicineboughtlist, data)
      //   .then((resp: any) => {
      //     if (resp.status === 500) {
      //       showToast(resp.error.message, this.toastCtrl);
      //     } else {
      //       if(this.showForm == true){
      //         const formModel = this.orderMedicineForm.value;
      //         const formData = new FormData();
      //         formData.append('apptid',resp.data);
      //         formData.append('`uploadpres`', this.uploadpres);
      //         this.api
      //         .wsPostHeader(APIName.pharmaimgupload, formData)
      //         .then((resp: any) => {
      //           if (resp.status === 500) {
      //             showToast(resp.error.message, this.toastCtrl);
      //             // localStorage.setItem(perProfile, resp.data.perCertificate);
      //           } else {
      //             showToast(resp.message, this.toastCtrl);
      //           }
      //         });
      //       }

      //       showToast("" + resp.message, this.toastCtrl);
      //       this.navCtrl.pop();
      //     }
      //   });
      // }

      console.log(data);
      this.api
        .wsPostHeader(APIName.getmedicineboughtlist, data)
        .then((resp: any) => {
          if (resp.status === 500) {
            showToast(resp.error.message, this.toastCtrl);
          } else {
            if (this.showForm == true) {
              const formModel = this.orderMedicineForm.value;
              const formData = new FormData();
              formData.append("apptid", resp.data);
              formData.append("`uploadpres`", this.uploadpres);
              this.api
                .wsPostHeader(APIName.pharmaimgupload, formData)
                .then((resp: any) => {
                  if (resp.status === 500) {
                    showToast(resp.error.message, this.toastCtrl);
                    // localStorage.setItem(perProfile, resp.data.perCertificate);
                  } else {
                    showToast(resp.message, this.toastCtrl);
                  }
                });
            }

            showToast("" + resp.message, this.toastCtrl);
            this.navCtrl.pop();
          }
        });
    }
    this.makePayment();
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
        console.log(
          "getPicture  normalizeURL(imagePath) >> ",
          normalizeURL(imagePath)
        );

        for (var i = 0; i < imagePath.length; i++) {
          console.log("Image URI: " + imagePath[i]);
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

  // makePaymentPlugin() {
  //   var self = this;

  //   var min = 0;
  //   var max = 9999;
  //   var ORDER_ID = Math.floor(Math.random() * (+max - +min)) + +min;
  //   var CUST_ID = Math.floor(Math.random() * (+max + -min)) + +min;
  //   this.orderID = ORDER_ID;
  //   this.custID = CUST_ID;
  //   this.txnAmount = this.fees;
  //   this.paramarray["ORDER_ID"] = this.orderID; //unique OrderId for every request
  //   this.paramarray["CUST_ID"] = this.custID;
  //   this.paramarray["TXN_AMOUNT"] = this.fees;
  //   this.paramarray["CALLBACK_URL"] =
  //     "https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp"; //Provided by Paytm

  //   // var checksum =  checksum_lib.genchecksum(paytmParams, "!29FEIkWuEqB@GEG");

  //   checksum_lib.genchecksumbystring(
  //     this.paramarray,
  //     paytm_config.MERCHANT_KEY,
  //     function(err, checksum) {
  //       console.log(checksum);
  //       console.log(JSON.stringify(checksum));
  //       self.pay(checksum, self.orderID.toString());
  //     }
  //   );
  // }

  // public pay(checksum: String, orderID: String) {
  //   var isValidChecksum = checksum_lib.verifychecksumbystring(
  //     this.paramarray,
  //     paytm_config.MERCHANT_KEY,
  //     checksum
  //   );
  //   if (isValidChecksum) {
  //     console.log("Checksum Matched");
  //   } else {
  //     console.log("Checksum Mismatched");
  //   }
  //   this.paramarray["CALLBACK_URL"] =
  //     "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" + orderID;
  //   this.paramarray["CHECKSUMHASH"] = checksum;

  //   window.paytm.startPayment(
  //     this.paramarray,
  //     this.successCallback,
  //     this.failureCallback
  //   );
  // }
  makePayment() {
    console.log("make PAyment");
    var min = 0;
    var max = 9999;
    var ORDER_ID = Math.floor(Math.random() * (+max - +min)) + +min;
    var CUST_ID = Math.floor(Math.random() * (+max + -min)) + +min;
    this.orderID = ORDER_ID;
    this.custID = CUST_ID;
    this.txnAmount = this.finalmedcost;

    // this.navCtrl.loadUrl(url, { openExternal:true });
    const options: InAppBrowserOptions = {
      zoom: "no",
      fullscreen: "yes",
      hidenavigationbuttons: "no",
      toolbar: "no",
      hideurlbar: "yes"
    };
    const browser = this.iab.create(
      "http://client.attuneinfocom.com/paytm_payment_demo/pgRedirect.php?ORDER_ID=" +
        this.orderID +
        "&CUST_ID=" +
        this.custID +
        "&TXN_AMOUNT=" +
        this.txnAmount +
        "&redirect_url=ionic",
      "_blank",
      {
        toolbar: "no",
        hideurlbar: "yes",
        fullscreen: "yes",
        location: "no",
        options
      }
    );
    browser.on("loadstop").subscribe(event => {
      console.log("Stopeed");
      browser.insertCSS({ code: "toolbar{display: none;" });
    });
  }
  successCallback(response) {
    if (response.STATUS == "TXN_SUCCESS") {
      var txn_id = response.TXNID;
      var paymentmode = response.PAYMENTMODE;
      // other details and function after payment transaction
      console.log("payment succes ");
    } else {
      console.log("Transaction Failed for reason " + response.RESPMSG);
      console.log(response);
    }
  }

  failureCallback(error) {
    console.log("Transaction Failed for reason " + error.RESPMSG);
    console.log(error);
  }
}
