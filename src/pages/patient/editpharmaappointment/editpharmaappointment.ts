import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController
} from "ionic-angular";
import { ApiProvider } from "../../../providers/api/api";
import {
  showToast,
  APIName
} from "../../../providers/commonfunction/commonfunction";
import { DatePipe } from "@angular/common";
import { Cordova } from "@ionic-native/core";
// import { callbackify } from "util";
import {
  InAppBrowser,
  InAppBrowserOptions
} from "@ionic-native/in-app-browser";
/**
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
  selector: "page-editpharmaappointment",
  templateUrl: "editpharmaappointment.html"
})
export class EditPharmaAppointmentPage {
  public facilitiesArray: any[] = [];
  public locationArray: any[] = [];
  public MedicalStoreArray: any[] = [];
  public MedByPharmaArray: any[] = [];
  public doctorArray: any[] = [];
  public visittypeArray: any[] = [];
  public visitreasonArray: any[] = [];
  public facilityCenterID = "";
  public fcLocationMapID = "";
  public fclProviderMapID = "";
  public drugcompundID = "";
  public visittypeId = "Home";
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

  paramarray = {};

  public apptID: any = [];

  public viewgetappointmentArray: any[] = [];

  public selectedfacilityCenterID;
  public selectedfcLocationMapID;
  public selectedfclProviderMapID;
  public selectedvisittypeId;
  public selectedpatAppDate;
  public selectedpatAppTime;
  public selectedpatAppDescription;
  public selecteddrugcompundID;
  public selectedStatus;
  public selectedProviderID;
  public selectedMedStoreName;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public datepipe: DatePipe,
    public toastCtrl: ToastController,
    private iab: InAppBrowser,
    private alertCtrl: AlertController
  ) {
    this.paramarray["MID"] = paytm_config.MID; //Provided by Paytm
    this.paramarray["INDUSTRY_TYPE_ID"] = "Retail"; //Provided by Paytm
    this.paramarray["CHANNEL_ID"] = "WAP"; //Provided by Paytm
    this.paramarray["WEBSITE"] = "WEBSTAGING"; //Provided by Paytm
    this.paramarray["ENVIRONMENT"] = "staging";
    this.paramarray["CHECKSUMHASH"] = "";
  }

  // constructor(public datepipe:DatePipe, public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider,public toastCtrl:ToastController) {
  //   this.patAppointmentID = this.navParams.get('patAppointmentID');
  //   this.getviewgetappointment();
  // }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddappointmentPage");
    ///to call all facility////
    // this.getallFacilities();
    this.visitreason();
    this.visittype();

    this.apptID = this.navParams.get("apptID");
    this.getviewgetpharmaappointment();
    console.log(this.apptID);
    // this.getAllMedicalStore();
    // this.getfees();
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
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          this.facilitiesArray = resp.data;

          if (this.facilityCenterID.length) {
          } else {
            this.facilityCenterID = this.selectedfacilityCenterID;
          }

          // this.facilityCenterID = this.facilitiesArray[0].facilityCenterID;
        }
      });
  }
  getFacilityid(facilityid: any) {
    this.facilityCenterID = facilityid;
    this.getAllLocations();
    console.log("facilityCenterID", "" + this.facilityCenterID);
  }

  // fetchFees(fetch: Number) {
  //   console.log("Called");
  //   console.log("fetched:" + fetch);
  //   let feesRequestmodel = new FeesRequestModel(fetch);
  //   this.addAppointmentService.getFees(feesRequestmodel).subscribe(
  //     response => {
  //       this.fees = response.data.fees;
  //       console.log(this.fees);
  //     },
  //     error => {}
  //   );
  // }

  // getfees() {
  // this.api.wsPostHeader(APIName.getfeesofdoctor, "").then((resp: any) => {
  //   if (resp.status === 500) {
  //     // showToast( resp.error.message, this.toastCtrl)
  //   } else {
  //     this.fees = resp.data.fees;
  //     console.log(this.fees);
  //   }
  // });
  //   this.fees = "400.00";
  // }

  /// locations////
  getAllLocations() {
    var data = {
      facilityCenterID: this.facilityCenterID
    };
    this.api
      .wsPostHeaderBackground(APIName.getAllLocationByFacility, data)
      .then((resp: any) => {
        this.locationArray = resp.data;

        // if (this.locationArray.length > 0) {
        //   this.fcLocationMapID = this.locationArray[0].fcLocationMapID;
        // } else {
        //   this.fcLocationMapID = "";
        // }

        this.getlocationid(this.selectedfcLocationMapID);
      });
  }
  getlocationid(locationid: any) {
    this.fcLocationMapID = locationid;
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
        // if (this.MedicalStoreArray.length > 0) {
        //   this.fclProviderMapID = this.MedicalStoreArray[0].fclProviderMapID;
        //   this.providerId = this.MedicalStoreArray[0].providerID;
        // } else {
        //   this.fclProviderMapID = "";
        //   this.providerId = "";
        // }

        this.getmedicalStoreID(this.selectedfclProviderMapID);
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

        console.log("drugCompundID:", this.selecteddrugcompundID);

        if (this.drugcompundID.length) {
        } else {
          this.drugcompundID = this.selecteddrugcompundID;
        }

        // if (this.MedByPharmaArray.length > 0) {
        //   this.drugcompundID = this.MedByPharmaArray[0].drugcompundID;
        // } else {
        //   this.drugcompundID = "";
        // }

        // this.getMedByPharmaID(this.selecteddrugcompundID);
      });
  }

  getMedByPharmaID(medByPharma: any) {
    this.drugcompundID = medByPharma;
    // this.getAllDoctors();
  }

  /// get all doctors////
  // getAllDoctors() {
  //   var data = {
  //     FcLocationMapID: this.fcLocationMapID,
  //     fclProviderMapID: this.medicalStoreID
  //   };
  //   this.api
  //     .wsPostHeaderBackground(APIName.getAllDoctorByLocationAndspeciality, data)
  //     .then((resp: any) => {
  //       this.doctorArray = resp.data;
  //       if (this.doctorArray.length > 0) {
  //         this.fclProviderMapID = this.doctorArray[0].fclProviderMapID;
  //       } else {
  //         this.fclProviderMapID = "";
  //       }
  //     });
  // }

  // getdoctorid(doctorid: any) {
  //   this.fclProviderMapID = doctorid;
  // }

  /// get visit type////
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

  ///available schedule////
  // availableschedule = [
  //   {
  //     time: " Mon: 12:00 pm to 4:00 pm ",
  //     time1: " Wed: 12:00 pm to 4:00 pm "
  //   },
  //   {
  //     time: " Fri: 06:00 pm to 08:00 pm ",
  //     time1: "Sat: 06:00 pm to 08:00 pm"
  //   }
  // ];

  callAddAppointmentApi() {
    if (this.facilityCenterID.length == 0) {
      showToast("Please select facility", this.toastCtrl);
      return;
    }
    if (this.fcLocationMapID.length == 0) {
      showToast("Please select Location", this.toastCtrl);
      return;
    }
    if (this.fclProviderMapID.length == 0) {
      showToast("Please select Speciality", this.toastCtrl);
      return;
    }
    if (this.drugcompundID.length == 0) {
      showToast("Please select Medicine", this.toastCtrl);
      return;
    }
    // if (this.fclProviderMapID.length == 0) {
    //   showToast("Please select Doctor", this.toastCtrl);
    //   return;
    // }
    if (this.selectedpatAppDate.length == 0) {
      showToast("Please select Appointment date", this.toastCtrl);
      return;
    }
    if (this.selectedpatAppTime.length == 0) {
      showToast("Please select Appointment time", this.toastCtrl);
      return;
    }
    // if (this.patAppTimeTo.length == 0) {
    //   showToast("Please select Appointment end time", this.toastCtrl);
    //   return;
    // }
    if (this.visittypeId.length == 0) {
      showToast("Please select type Of Visit", this.toastCtrl);
      return;
    }
    // if (this.visitreasonId.length == 0) {
    //   showToast("Please select Reason to Visit", this.toastCtrl);
    //   return;
    // }

    if (this.selectedpatAppDescription.length == 0) {
      showToast("Please add Medicine detail", this.toastCtrl);
      return;
    }

    let date = new Date(this.selectedpatAppDate);
    let datetopass = date.getTime();
    console.log("datebefore", "" + datetopass);

    let timefrom = new Date(this.selectedpatAppTime);
    let timefromtopass = timefrom.getTime();

    // let date = new Date(
    //   this.selectedpatAppDate + " " + this.selectedpatAppTime
    // );
    // let datetopass = date.getTime();
    // var date1 = date.getUTCDate();

    // console.log("datebefore", "" + datetopass);

    // let time = new Date(
    //   this.selectedpatAppDate + " " + this.selectedpatAppTime
    // );
    // let timepass = time.getTime();

    // console.log("timebefrm", "" + timepass);

    // let drugname = this.MedByPharmaArray.find(
    //   item => item.drugcompundID === this.drugcompundID
    // ).medicineName;
    let data = JSON.stringify({
      apptdate: datetopass,
      appttime: timefromtopass,
      apptid: this.apptID,

      medstorename: this.selectedMedStoreName,
      providerID: this.selectedProviderID,
      status: this.selectedStatus,

      fclProviderMapID: { fclProviderMapID: this.fclProviderMapID },
      meddetail: this.selectedpatAppDescription,
      medname: this.drugcompundID,
      // providerID: "511",
      visittype: this.visittypeId.trim()
    });

    console.log(data);
    this.api
      .wsPostHeader(APIName.getmedicineboughtlist, data)
      .then((resp: any) => {
        if (resp.status === 500) {
          showToast(resp.error.message, this.toastCtrl);
        } else {
          showToast("" + resp.message, this.toastCtrl);
          this.navCtrl.pop();
        }
      });
    // this.makePayment();

    // this.makePaymentPlugin();
  }

  ///to convert date and time////
  changeDateToString(date: Date, format: string) {
    // this.changeStringToDate(this.selectedDate +' '+this.TimeFrom)
    var date1 = date.toISOString();
    // var date2 = this.changeStringToDate(date1,s)
    console.log("dateString=>", date1);
  }

  ///to convert date and time////
  changeStringToDate(
    dateString: string,
    format?: string //date
  ) {
    if (format) {
      //19800000
      //
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

  makePaymentPlugin() {
    var self = this;

    var min = 0;
    var max = 9999;
    var ORDER_ID = Math.floor(Math.random() * (+max - +min)) + +min;
    var CUST_ID = Math.floor(Math.random() * (+max + -min)) + +min;
    this.orderID = ORDER_ID;
    this.custID = CUST_ID;
    this.txnAmount = this.fees;
    this.paramarray["ORDER_ID"] = this.orderID; //unique OrderId for every request
    this.paramarray["CUST_ID"] = this.custID;
    this.paramarray["TXN_AMOUNT"] = this.fees;
    this.paramarray["CALLBACK_URL"] =
      "https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp"; //Provided by Paytm

    // var checksum =  checksum_lib.genchecksum(paytmParams, "!29FEIkWuEqB@GEG");

    checksum_lib.genchecksumbystring(
      this.paramarray,
      paytm_config.MERCHANT_KEY,
      function(err, checksum) {
        console.log(checksum);
        console.log(JSON.stringify(checksum));
        // callback(checksum);

        self.pay(checksum, self.orderID.toString());
      }
    );
  }

  public pay(checksum: String, orderID: String) {
    var isValidChecksum = checksum_lib.verifychecksumbystring(
      this.paramarray,
      paytm_config.MERCHANT_KEY,
      checksum
    );
    if (isValidChecksum) {
      console.log("Checksum Matched");
    } else {
      console.log("Checksum Mismatched");
    }
    this.paramarray["CALLBACK_URL"] =
      "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" + orderID;
    this.paramarray["CHECKSUMHASH"] = checksum;

    window.paytm.startPayment(
      this.paramarray,
      this.successCallback,
      this.failureCallback
    );
  }
  makePayment() {
    console.log("make PAyment");
    var min = 0;
    var max = 9999;
    var ORDER_ID = Math.floor(Math.random() * (+max - +min)) + +min;
    var CUST_ID = Math.floor(Math.random() * (+max + -min)) + +min;
    this.orderID = ORDER_ID;
    this.custID = CUST_ID;
    this.txnAmount = this.fees;

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
    // window.open(
    //   "http://client.attuneinfocom.com/paytm_payment_demo/pgRedirect.php?ORDER_ID=" +
    //     this.orderID +
    //     "&CUST_ID=" +
    //     this.custID +
    //     "&TXN_AMOUNT=" +
    //     this.txnAmount +
    //     "&redirect_url=ionic",
    //   "_self"
    // );
  }
  successCallback(response) {
    if (response.STATUS == "TXN_SUCCESS") {
      var txn_id = response.TXNID;
      var paymentmode = response.PAYMENTMODE;
      // other details and function after payment transaction
      console.log("payment succes ");
    } else {
      // error code will be available in RESPCODE
      // error list page https://docs.google.com/spreadsheets/d/1h63fSrAmEml3CYV-vBdHNErxjJjg8-YBSpNyZby6kkQ/edit#gid=2058248999
      console.log("Transaction Failed for reason " + response.RESPMSG);
      console.log(response);
      // console.log(response.stringify())
      // showToast
    }
  }

  failureCallback(error) {
    // error code will be available in RESCODE
    // error list page https://docs.google.com/spreadsheets/d/1h63fSrAmEml3CYV-vBdHNErxjJjg8-YBSpNyZby6kkQ/edit#gid=2058248999
    console.log("Transaction Failed for reason " + error.RESPMSG);
    console.log(error);
    // console.log(error.stringify())
  }

  /// view and get appointment api////
  getviewgetpharmaappointment() {
    var data1 = {
      apptid: this.apptID
      // patAppointmentID: 107
    };

    this.api.wsPostHeader(APIName.getpharmaview, data1).then((resp: any) => {
      if (resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      } else {
        console.log("RESPONNSE:--- " + JSON.stringify(resp));
        this.viewgetappointmentArray = resp.data;
        // var obj = JSON.stringify(resp);
        // this.specialityArray = JSON.parse(obj);
        // this.specialityArray=resp.data.filter(item => item.specialityName === 'Skin')
        console.log(
          "successsssssss=> apointmentpage",
          this.viewgetappointmentArray
        );
        this.getallFacilities();
        this.selectedfacilityCenterID = resp.data.facilityCenterID;
        console.log("centered ID", this.selectedfacilityCenterID);
        this.selectedfcLocationMapID = resp.data.fcLocationMapID;
        this.selectedfclProviderMapID = resp.data.fclProviderMapID;
        this.selectedvisittypeId = resp.data.visittype;
        this.selecteddrugcompundID = resp.data.medname;

        this.selectedMedStoreName = resp.data.medstorename;
        this.selectedProviderID = resp.data.providerID;
        this.selectedStatus = resp.data.status;
        console.log("SelectedVisiteType", this.selectedvisittypeId);
        let timediff: number = resp.data.appttime - 19800000;
        // let timediffTo: number = resp.data.patAppTimeTo - 19800000;
        this.selectedpatAppDate = this.changeStringToDate(
          new Date(resp.data.apptdate).toISOString()
        );
        console.log("datettttttttttttttttttt", this.selectedpatAppDate);

        this.selectedpatAppTime = this.changeStringToDate(
          new Date(timediff).toISOString()
        );
        console.log("time", this.selectedpatAppTime);
        // this.selectedpatAppTimeTo = this.changeStringToDate(
        //   new Date(timediffTo).toISOString()
        // );
        // console.log("datettttttttttttttttttt", this.selectedpatAppTimeTo);

        // this.selectedpatAppTime = resp.data.apptdate
        //   ? this.changeStringToDate(
        //       resp.data.apptdate + " " + resp.data.appttime
        //     )
        //   : "";

        this.selectedpatAppDescription = resp.data.meddetail;
      }
    });
  }
}
