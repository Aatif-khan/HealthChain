import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { ApiProvider } from "../../../providers/api/api";
import {
  showToast,
  APIName
} from "../../../providers/commonfunction/commonfunction";
import { DatePipe } from "@angular/common";
import { Cordova } from "@ionic-native/core";
/**
 * Generated class for the AddappointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var paytm: any;
const checksum_lib = require("../../../../paytm/checksum");

@IonicPage()
@Component({
  selector: "page-addappointment",
  templateUrl: "addappointment.html"
})
export class AddappointmentPage {
  public facilitiesArray: any[] = [];
  public addressArray: any[] = [];
  public drAvailableArray: any[] = [];
  public add1: any[] = [];
  public patAddressPojo: any[] = [];
  public locationArray: any[] = [];
  public specialityArray: any[] = [];
  public doctorArray: any[] = [];
  public timestampArray: any[] = [];
  public visittypeArray: any[] = [];
  public promocodeArray: any[] = [];
  public feesamountArray: any[] = [];
  public visitreasonArray: any[] = [];
  public facilityCenterID = "";
  public addressLine1 = "";
  public fcLocationMapID = "";
  public fclProviderMapID = "";
  public specialityID = "";
  public fcLocationDoctorID = "";
  public visittypeId = "";
  public facilityProviderMapId = "";
  public coupounID = "";
  public visitreasonId = "";
  public patAppDate = "";
  public coupounCode = "";
  public patAppAmount = "";
  public patAppTimeFrom = "";
  public patAppTimeFromStatus = "";
  public patAppTimeTo = "";
  public patAppDescription = "";
  public fees = "";
  public oldAptFees = "";
  public feesAmount = "";
  public orderID = 0;
  public custID = 0;
  public txnAmount = "";
  public checked: boolean = false;

  public isDisabled: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public datepipe: DatePipe,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddappointmentPage");
    ///to call all facility////

    this.getallAddress();
    // this.getallFacilities();
    // this.visitreason();
    // this.visittype();
    // this.applypromocode();
    // this.feesType();
  }

  /// facility////
  // getallFacilities() {
  //   var data1 = {
  //     facilityCenterType: "Hospital"
  //   };
  //   this.api
  //     .wsPostHeader(APIName.getAllFacilityByPerameter, data1)
  //     .then((resp: any) => {
  //       if (resp.status === 500) {
  //         // showToast( resp.error.message, this.toastCtrl)
  //       } else {
  //         this.facilitiesArray = resp.data;
  //         this.facilityCenterID = this.facilitiesArray[0].facilityCenterID;
  //         this.getFacilityid(this.facilityCenterID);
  //       }
  //     });
  // }
  // getFacilityid(facilityid: any) {
  //   this.facilityCenterID = facilityid;
  //   this.getAllLocations();
  //   console.log("facilityCenterID", "" + this.facilityCenterID);
  // }

  /// Address////

  getallAddress() {
    var data1 = {};
    this.api
      .wsPostHeader(APIName.getAllPatientLocation, data1)
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          this.addressArray = resp.data.patAddressPojo;
          // this.add1 = this.addressArray.patAddressPojo;
          this.addressLine1 = this.addressArray[0].addressLine1;
          this.getAddressid(this.addressLine1);
        }
      });
  }
  getAddressid(facilityid: any) {
    this.addressLine1 = facilityid;
    this.getallAvailableDoctor();
    console.log("addressID", "" + this.addressLine1);
  }

  /// Available Doctor////

  getallAvailableDoctor() {
    var data1 = {
      addressLine1: this.addressLine1
    };
    this.api
      .wsPostHeader(APIName.getallavailabaledoctor, data1)
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          this.drAvailableArray = resp.data;
          // this.add1 = this.addressArray.patAddressPojo;
          if (this.drAvailableArray.length > 0) {
            this.fcLocationMapID = this.drAvailableArray[0].fcLocationMapID;
            this.facilityProviderMapId = this.drAvailableArray[0].facilityProviderMapId;
            this.getAvailableDoctor(this.fcLocationMapID);
          }
        }
      });
  }
  getAvailableDoctor(facilityid: any) {
    this.fcLocationMapID = facilityid;
    this.getAllDoctors();
    console.log("availableID", "" + this.fcLocationMapID);
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

  /// locations////
  // getAllLocations() {
  //   var data = {
  //     facilityCenterID: this.facilityCenterID
  //   };
  //   this.api
  //     .wsPostHeaderBackground(APIName.getAllLocationByFacility, data)
  //     .then((resp: any) => {
  //       this.locationArray = resp.data;
  //       if (this.locationArray.length > 0) {
  //         this.fcLocationMapID = this.locationArray[0].fcLocationMapID;
  //         this.getlocationid(this.fcLocationMapID);
  //       } else {
  //         this.fcLocationMapID = "";
  //       }
  //     });
  // }
  // getlocationid(locationid: any) {
  //   this.fcLocationMapID = locationid;
  //   this.getAllSpeciality();
  // }

  // /// Speciality////
  // getAllSpeciality() {
  //   var data = {
  //     fcLocationMapID: this.fcLocationMapID
  //   };
  //   this.api
  //     .wsPostHeaderBackground(
  //       APIName.getAllSpecialityByLocationAndFacility,
  //       data
  //     )
  //     .then((resp: any) => {
  //       this.specialityArray = resp.data;
  //       if (this.specialityArray.length > 0) {
  //         this.specialityID = this.specialityArray[0].specialityID;
  //         this.getspecialityid(this.specialityID);
  //       } else {
  //         this.specialityID = "";
  //       }
  //     });
  // }

  // getspecialityid(speciality: any) {
  //   this.specialityID = speciality;
  //   this.getAllDoctors();
  // }

  /// get all doctors////
  getAllDoctors() {
    var data = {
      fcLocationMapID: this.fcLocationMapID
      // SpecialityID: this.specialityID
    };
    this.api
      .wsPostHeaderBackground(APIName.getAllDoctorByLocationAndFacility, data)
      .then((resp: any) => {
        console.log("FCLPROVIDER= ", resp.data.fclProviderMapID);
        this.doctorArray = resp.data;
        // this.add1 = this.addressArray.patAddressPojo;
        this.fcLocationDoctorID = this.doctorArray[0].fcLocationMapID;
        this.fclProviderMapID = this.doctorArray[0].fclProviderMapID;
        this.getdoctorid(this.fcLocationDoctorID);
      });
  }

  getdoctorid(doctorid: any) {
    this.fcLocationDoctorID = doctorid;
    this.visittype();
  }

  /// get visit type////
  visittype() {
    this.api
      .wsPostHeaderBackground(APIName.appointmentType, "")
      .then((resp: any) => {
        this.visittypeArray = resp.data;
        if (this.visittypeArray.length > 0) {
          this.visittypeId = this.visittypeArray[0].key;
          this.getvisittypeid(this.visittypeId);
        } else {
          this.visittypeId = "";
        }
      });
  }

  getvisittypeid(visit: any) {
    this.visittypeId = visit;
    this.feesType();
  }

  // fees
  feesType() {
    var data = {
      fclProviderMapID: this.fclProviderMapID
    };

    this.api.wsPostHeader(APIName.getfeesofdoctor, data).then((resp: any) => {
      console.log("FCLOCATIONID= ", resp.data);
      if (resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      } else {
        this.fees = resp.data.fees;
        this.oldAptFees = resp.data.oldAptFees;

        if (this.visittypeId == "New") {
          this.getFees(this.fees);
        } else if (this.visittypeId == "Followup") {
          this.getFees(this.oldAptFees);
        }
        console.log(this.fees);
      }
    });
  }

  getFees(fees: any) {
    this.fees = fees;
    this.promocodeList();
  }
  /// Apply Coupan Code ///

  promocodeList() {
    this.api
      .wsPostHeaderBackground(APIName.getAllCoupons, "")
      .then((resp: any) => {
        this.promocodeArray = resp.data;
        if (this.promocodeArray.length > 0) {
          // this.coupounID = this.promocodeArray[0].coupounID;
          this.coupounCode = this.promocodeArray[0].coupounCode;
          this.getapplypromocode(this.coupounCode);
        } else {
          this.coupounCode = "";
        }
      });
  }

  getapplypromocode(promo: any) {
    this.coupounCode = promo;
    this.feesamount();
  }

  /// Fees Amount ///

  feesamount() {
    var data = {
      coupounCode: this.coupounCode,
      patAppAmount: this.fees
    };
    this.api
      .wsPostHeaderBackground(APIName.applyCouponCode, data)
      .then((resp: any) => {
        this.feesAmount = resp.data;
        this.getfeesamount(this.feesAmount);
      });
  }

  getfeesamount(fees: any) {
    this.feesAmount = fees;
    this.visitreason();
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
  avlSchedule() {
    let date = new Date(this.patAppDate);
    // let datetopass = date.getTime();
    // var date1 = date.toISOString();

    var data = {
      date: date,
      doctorId: String(this.fclProviderMapID),
      facilityProviderMapID: String(this.fcLocationMapID)
    };
    this.api
      .wsPostHeaderBackground(APIName.getAppointmentSchedule, data)
      .then((resp: any) => {
        let data = resp.data;

        this.timestampArray = data;
        // this.patAppTimeFrom = this.timestampArray[0].timeIntervals;
        this.patAppTimeFromStatus = this.timestampArray[0].taken;
      });
  }

  getavailableTime(time: any, event: any) {
    this.patAppTimeFrom = time;

    console.log("event", event);
    if (event == true) {
      console.log("no");
      this.isDisabled = true;
    } else {
      console.log("yes");
      this.isDisabled = false;
    }
  }

  // getavlSchedule(doctorid: any) {
  //   this.fcLocationDoctorID = doctorid;
  //   this.visittype();
  // }

  ///available schedule////
  availableschedule = [
    {
      time: " Mon: 12:00 pm to 4:00 pm ",
      time1: " Wed: 12:00 pm to 4:00 pm "
    },
    {
      time: " Fri: 06:00 pm to 08:00 pm ",
      time1: "Sat: 06:00 pm to 08:00 pm"
    }
  ];

  callAddAppointmentApi() {
    // if (this.addressLine1.length == 0) {
    //   showToast("Please select Address", this.toastCtrl);
    //   return;
    // }
    // if (this.fcLocationMapID.length == 0) {
    //   showToast("Please select Location", this.toastCtrl);
    //   return;
    // }
    // if (this.fcLocationDoctorID.length == 0) {
    //   showToast("Please select Doctor", this.toastCtrl);
    //   return;
    // }
    // if (this.fclProviderMapID.length == 0) {
    //   showToast("Please select Doctor", this.toastCtrl);
    //   return;
    // }
    if (this.patAppDate.length == 0) {
      showToast("Please select Appointment date", this.toastCtrl);
      return;
    }
    if (this.patAppTimeFrom.length == 0) {
      showToast("Please select Appointment start time", this.toastCtrl);
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
    if (this.visitreasonId.length == 0) {
      showToast("Please select Reason to Visit", this.toastCtrl);
      return;
    }

    if (this.patAppDescription.length == 0) {
      showToast("Please add detail Description", this.toastCtrl);
      return;
    }

    let date = new Date(this.patAppDate);
    let datetopass = date.getTime();
    var date1 = date.getUTCDate();

    console.log("datebefore", "" + datetopass);

    let timefrom = new Date(this.patAppTimeFrom);
    let timefromtopass = timefrom.getTime();

    console.log("timebefrm", "" + timefromtopass);

    let timeto = new Date(this.patAppDate + " " + this.patAppTimeTo);
    let timetopass = timeto.getTime();

    console.log("timeto", "" + timetopass);

    if (this.checked == false) {
      this.makePayment();
    } else {
      let data = JSON.stringify({
        //         fclProviderMapID: "7436"
        // specialityMaster: null
        // patAppType: "New"
        // patAppReason: "Thyroid"
        // patAppDescription: "Sascas"
        // codpay: true
        // patAppDate: 1582709316000
        // patAppTimeFrom: 1582661400000
        // patAppStatus: "Pending"
        // patAppAmount: 300
        fclProviderMapID: { fclProviderMapID: this.fclProviderMapID },
        specialityMaster: null,
        patAppDate: datetopass,
        patAppTime: this.patAppTimeFrom,
        // patAppTimeTo: timetopass,
        patAppType: this.visittypeId,
        patAppReason: this.visitreasonId,
        patAppDescription: this.patAppDescription,
        patAppStatus: "Pending",
        // codpay: this.checked,
        patAppAmount: this.feesAmount
      });

      this.api
        .wsPostHeader(APIName.addOrEditAppointment, data)
        .then((resp: any) => {
          if (resp.status === 500) {
            showToast(resp.error.message, this.toastCtrl);
          } else {
            showToast("" + resp.message, this.toastCtrl);

            this.navCtrl.pop();
          }
        });
    }

    // this.makePayment();
    // this.makePaymentPlugin();
  }

  addValue(): void {
    this.checked = !this.checked;
    console.log("checked: " + this.checked); //it is working !!!
  }

  ///to convert date and time////
  changeDateToString(date: Date, format: string) {
    // this.changeStringToDate(this.selectedDate +' '+this.TimeFrom)
    var date1 = date.toISOString();
    // var date2 = this.changeStringToDate(date1,s)
    console.log("dateString=>", date1);
  }

  //date
  // changeStringToDate(dateString: string, format?: string) {
  //   if (format) {
  //     console.log(
  //       "StringToDate==>",
  //       this.changeDateFormat(new Date(dateString), format)
  //     );
  //     return this.changeDateFormat(new Date(dateString), format);
  //   } else {
  //     console.log("completeString=>>>>>>", dateString);
  //     console.log("StringToDate==>", new Date(dateString).toISOString());
  //     return new Date(dateString).toISOString();
  //   }
  // }
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

  //date to any format
  changeDateFormat(date: Date, formate?: string) {
    let latest_date = this.datepipe.transform(date, formate);
    console.log("ChangeDateFormat", latest_date);
    return latest_date;
  }

  // makePaymentPlugin() {
  //   var paytmParams = {};

  //   /* put checksum parameters in Object */
  //   paytmParams["MID"] = "PoBJbW65402394256903";
  //   paytmParams["ORDERID"] = this.orderID;
  //   checksum_lib.genchecksum(paytmParams, "!29FEIkWuEqB@GEG", function(
  //     err,
  //     checksum
  //   ) {
  //     console.log(checksum);
  //     var options = {
  //       ENVIRONMENT: "staging", // environment details. staging for test environment & production for live environment
  //       REQUEST_TYPE: "DEFAULT", // You would get this details from paytm after opening an account with them
  //       MID: "PoBJbW65402394256903", // You would get this details from paytm after opening an account with them
  //       ORDER_ID: this.orderID, // Unique ID for each transaction. This info is for you to track the transaction details
  //       CUST_ID: this.orderID, // Unique ID for your customer
  //       INDUSTRY_TYPE_ID: "Retail", // You would get this details from paytm after opening an account with them
  //       CHANNEL_ID: "WAP", // You would get this details from paytm after opening an account with them
  //       TXN_AMOUNT: this.fees, // Transaction amount that has to be collected
  //       WEBSITE: "PAYTM_WEBSITE", // You would get this details from paytm after opening an account with them
  //       CALLBACK_URL:
  //         "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=" +
  //         this.orderID, // Callback url
  //       // EMAIL: "abc@gmail.com", // Email of customer
  //       // MOBILE_NO: "9999999999", // Mobile no of customer
  //       CHECKSUMHASH: checksum
  //     };
  //     paytm.startPayment(options, this.successCallback, this.failureCallback);
  //   });
  // }
  makePayment() {
    console.log("make PAyment");
    var min = 0;
    var max = 9999;
    var ORDER_ID = Math.floor(Math.random() * (+max - +min)) + +min;
    var CUST_ID = Math.floor(Math.random() * (+max + -min)) + +min;
    this.orderID = ORDER_ID;
    this.custID = CUST_ID;
    this.txnAmount = this.feesAmount;

    // this.navCtrl.loadUrl(url, { openExternal:true });
    window.open(
      "http://client.attuneinfocom.com/paytm_payment_demo/pgRedirect.php?ORDER_ID=" +
        this.orderID +
        "&CUST_ID=" +
        this.custID +
        "&TXN_AMOUNT=" +
        this.txnAmount +
        "&redirect_url=ionic",
      "_self"
    );
  }
  successCallback(response) {
    if (response.STATUS == "TXN_SUCCESS") {
      var txn_id = response.TXNID;
      var paymentmode = response.PAYMENTMODE;
      // other details and function after payment transaction
      showToast("payment succes ", this.toastCtrl);
    } else {
      // error code will be available in RESPCODE
      // error list page https://docs.google.com/spreadsheets/d/1h63fSrAmEml3CYV-vBdHNErxjJjg8-YBSpNyZby6kkQ/edit#gid=2058248999
      showToast(
        "Transaction Failed for reason " + response.RESPMSG,
        this.toastCtrl
      );
      // showToast
    }
  }

  failureCallback(error) {
    // error code will be available in RESCODE
    // error list page https://docs.google.com/spreadsheets/d/1h63fSrAmEml3CYV-vBdHNErxjJjg8-YBSpNyZby6kkQ/edit#gid=2058248999
    showToast("Transaction Failed for reason " + error.RESPMSG, this.toastCtrl);
  }
}
