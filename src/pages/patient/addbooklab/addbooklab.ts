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
/**
 * Generated class for the AddbooklabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-addbooklab",
  templateUrl: "addbooklab.html"
})
export class AddbooklabPage {
  public addressArray: any[] = [];
  public locationArray: any[] = [];
  public visittypeArray: any[] = [];
  public labassistantArray: any[] = [];
  public suggestedreportArray: any[] = [];
  public visittypereasonarray: any[] = [];
  public labAvailableArray: any[] = [];
  public promocodeArray: any[] = [];
  public labReportsLevel1: any[] = [];
  public labReportsLevelData: any[] = [];

  public labReportLevel1ID = "";
  public fclProviderMapID = "";
  public facilityCenterID = "";
  public fcLocationMapID = "";
  public visittypeId = "";
  public visittypereasonId = "";
  public patAppDate = "";
  public patAppTimeFrom = "";
  public patAppTimeTo = "";
  public patAppDescription = "";
  public patVisitNoteID = "";
  public patLabAppAmount = "";
  public patLabAppointmentID = "";
  public addressLine1 = "";
  public coupounCode = "";
  public feesAmount = "";
  public cost = "";
  public navobj: any = [];
  public flag: number;
  public ischeckboxhomeactive: boolean = false;
  public checked: boolean = false;
  public titleheader = "";
  public orderID = 0;
  public custID = 0;
  public txnAmount = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public datepipe: DatePipe,
    public toastCtrl: ToastController
  ) {
    //

    console.log("this.flag :- " + this.navParams.get("flagType"));
    if (this.navParams.get("flagType") == 0) {
      this.flag = 0;
      this.navobj = this.navParams.get("obj");
      this.labReportsLevel1 = this.navobj.labReportsLevel1;
      this.patVisitNoteID = this.navParams.get("patvisitnoteid");
      console.log("helloooo=>", this.labReportsLevel1);
      for (let key in this.labReportsLevel1) {
        for (let subitem in this.labReportsLevel1[key]) {
          if (subitem == "labReportLevel1ID") {
            this.labReportsLevelData.push({
              [subitem]: this.labReportsLevel1[key][subitem]
            });
          }
        }
      }
      console.log("finalllabreportkey===>", this.labReportsLevelData);
      this.titleheader = "Add Book Lab";
    } else if (this.navParams.get("flagType") == 1) {
      this.flag = 1;
      //Edit from patientbooklablist
      this.navobj = this.navParams.get("obj");
      this.patLabAppointmentID = this.navobj.patLabAppointmentID;
      this.labReportsLevel1 = this.navobj.data;
      this.patVisitNoteID = this.navobj.patVisitNoteID;
      this.patAppDescription = this.navobj.patLabDetail;
      this.ischeckboxhomeactive = this.navobj.athome;
      this.patAppDate = this.changeStringToDate(
        new Date(this.navobj.patLabAppDate).toISOString()
      );
      this.patAppTimeFrom = this.changeStringToDate(
        new Date(this.navobj.patLabAppTimeFrom).toISOString()
      );
      this.patAppTimeTo = this.changeStringToDate(
        new Date(this.navobj.patLabAppTimeTo).toISOString()
      );
      console.log("helloooo=>", this.labReportsLevel1);
      for (let key in this.labReportsLevel1) {
        for (let subitem in this.labReportsLevel1[key]) {
          if (subitem == "labReportLevel1ID") {
            this.labReportsLevelData.push({
              [subitem]: this.labReportsLevel1[key][subitem]
            });
          }
        }
      }
      console.log("finalllabreportkey===>", this.labReportsLevelData);
      // this.patAppDate =
      this.titleheader = "Edit Book Lab";
    } else if (this.navParams.get("flagType") == 2) {
      this.flag = 2;
      this.titleheader = "Add Book Lab";
    } else if (this.navParams.get("flagType") == 3) {
      this.flag = 3;
      //Edit from patientbooklablist
      this.navobj = this.navParams.get("obj");
      this.labReportsLevel1 = this.navobj.data;
      this.patVisitNoteID = this.navobj.patVisitNoteID;
      this.patAppDescription = this.navobj.patLabDetail;
      this.ischeckboxhomeactive = this.navobj.athome;
      this.patAppDate = this.changeStringToDate(
        new Date(this.navobj.patLabAppDate).toISOString()
      );
      this.patAppTimeFrom = this.changeStringToDate(
        new Date(this.navobj.patLabAppTimeFrom).toISOString()
      );
      this.patAppTimeTo = this.changeStringToDate(
        new Date(this.navobj.patLabAppTimeTo).toISOString()
      );
      console.log("helloooo=>", this.labReportsLevel1);
      for (let key in this.labReportsLevel1) {
        for (let subitem in this.labReportsLevel1[key]) {
          if (subitem == "labReportLevel1ID") {
            this.labReportsLevelData.push({
              [subitem]: this.labReportsLevel1[key][subitem]
            });
          }
        }
      }
      console.log("finalllabreportkey===>", this.labReportsLevelData);
      // this.patAppDate =
      this.titleheader = "Re book Book Lab";
    }

    // this.visittype();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddbooklabPage");
    this.getallAddress();
    this.visittype();
    this.labvisittypereason();
  }

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
    this.getallAvailableLab();
    console.log("addressID", "" + this.addressLine1);
  }


/////Available lab/////

getallAvailableLab() {
  var data1 = {
    addressLine1: this.addressLine1
  };
  this.api
    .wsPostHeader(APIName.getLatLong, data1)
    .then((resp: any) => {
      if (resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      } else {
        this.labAvailableArray = resp.data;
        // this.add1 = this.addressArray.patAddressPojo;
        this.fcLocationMapID = this.labAvailableArray[0].fcLocationMapID;
        // this.facilityProviderMapId = this.labAvailableArray[0].facilityProviderMapId;
        this.getAvailableLab(this.fcLocationMapID);
      }
    });
}
getAvailableLab(facilityid: any) {
  this.fcLocationMapID = facilityid;
  this.getAllLabAssistant();
  console.log("availableID", "" + this.fcLocationMapID);
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
        }

        this.getlocationid(this.fcLocationMapID);
        // this.fcLocationMapID = this.locationArray[0].fcLocationMapID;
      });
  }
  getlocationid(locationid: any) {
    this.fcLocationMapID = locationid;
    if (this.fcLocationMapID != "") {
      this.getAllLabAssistant();
    }
  }

  getAllLabAssistant() {
    var data = {
      fcLocationMapID: this.fcLocationMapID
    };
    this.api
      .wsPostHeaderBackground(APIName.getAllDoctorByLocationAndFacility, data)
      .then((resp: any) => {
        console.log(
          "getAllDoctorByLocationAndFacilityResp=========>",
          resp.data
        );
        this.labassistantArray = resp.data;
        this.fclProviderMapID = this.labassistantArray[0].fclProviderMapID;
        this.getlabassistantmapid(this.fclProviderMapID);
      });
  }
  getlabassistantmapid(locationid: any) {
    this.fclProviderMapID = locationid;
    this.getAllReportFacilityProvider();
  }

  getAllReportFacilityProvider() {
    if (this.flag == 2) {
      var data = {
        fclProviderMapID: this.fclProviderMapID
      };
      console.log("getAllReportByFacilityProvider======>", data);
      this.api
        .wsPostHeaderBackground(APIName.getReportByLab, data)
        .then((resp: any) => {
          this.labReportsLevel1 = resp.data.labReportMasterPojo;

          var dict = this.labReportsLevel1[0];
          this.labReportLevel1ID = this.labReportsLevel1[0].labReportLevel1ID;
          this.cost = this.labReportsLevel1[0].costperreport;
          this.getreportid(this.labReportLevel1ID);
          // this.fcLocationMapID = this.locationArray[0].fcLocationMapID;
        });
    } else {
      console.log("getallreportcalleed");
      this.labReportLevel1ID = this.labReportsLevel1[0].labReportLevel1ID;
      this.getreportid(this.labReportLevel1ID);
    }
  }
  getreportid(reportid: any) {
    this.labReportLevel1ID = reportid;

    this.visittype();
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
      patLabAppAmount: this.cost
    };
    this.api
      .wsPostHeaderBackground(APIName.applyLabCouponCode, data)
      .then((resp: any) => {
        this.feesAmount = resp.data;
        this.getfeesamount(this.feesAmount);
      });
  }

  getfeesamount(fees: any) {
    this.feesAmount = fees;
    // this.visitreason();
  }

  /// get visit type////
  visittype() {
    this.api
      .wsPostHeaderBackground(APIName.appointmentType, "")
      .then((resp: any) => {
        this.visittypeArray = resp.data;
        this.visittypeId = this.visittypeArray[0].key;
      });
  }
  getvisittypeid(visitid: any) {
    this.visittypeId = visitid;
    this.labvisittypereason();
  }

  /// get visit type////
  labvisittypereason() {
    this.api
      .wsPostHeaderBackground(APIName.labappointmentReson, "")
      .then((resp: any) => {
        this.visittypereasonarray = resp.data;
        this.visittypereasonId = this.visittypereasonarray[0].key;
      });
  }
  getlabvisittypereasonid(visitreasonid: any) {
    this.visittypereasonId = visitreasonid;
  }

  clickOnCheckBox() {
    // this.ischeckboxhomeactive = !this.ischeckboxhomeactive
    console.log(" state:" + this.ischeckboxhomeactive);
  }

  callAddBookLabApi() {
    if (this.facilityCenterID.length == 0) {
      showToast("Please select facility", this.toastCtrl);
      return;
    }
    if (this.fcLocationMapID.length == 0) {
      showToast("Please select Location", this.toastCtrl);
      return;
    }
    if (this.fclProviderMapID.length == 0) {
      showToast("Please select lab assistant", this.toastCtrl);
      return;
    }
    if (this.patAppDate.length == 0) {
      showToast("Please select Appointment date", this.toastCtrl);
      return;
    }
    if (this.patAppTimeFrom.length == 0) {
      showToast("Please select Appointment start time", this.toastCtrl);
      return;
    }
    if (this.patAppTimeTo.length == 0) {
      showToast("Please select Appointment end time", this.toastCtrl);
      return;
    }
    if (this.labReportLevel1ID.length == 0) {
      showToast("Please select suggested report", this.toastCtrl);
      return;
    }
    if (this.visittypeId.length == 0) {
      showToast("Please select type Of Visit", this.toastCtrl);
      return;
    }
    if (this.visittypereasonId.length == 0) {
      showToast("Please select type Of Visit Reason", this.toastCtrl);
      return;
    }
    if (this.patAppDescription.length == 0) {
      showToast("Please add detail Description", this.toastCtrl);
      return;
    }

    if (this.checked == false) {
      this.makePayment();
    } else {
      let data;
      if (this.flag == 2) {
        data = JSON.stringify({
          fclProviderMapID: { fclProviderMapID: this.fclProviderMapID },
          patLabAppDate: new Date().getTime(),
          patLabAppTimeFrom: this.changeDateToMiliseconds(
            this.patAppDate + " " + this.patAppTimeFrom
          ),
          patLabAppTimeTo: this.changeDateToMiliseconds(
            this.patAppDate + " " + this.patAppTimeTo
          ),
          patAppType: this.visittypeId,
          patientLabAppointmentReason: this.visittypereasonId,
          patLabDetail: this.patAppDescription,
          patAppStatus: "Pending",
          labReportsLevel1: this.labReportsLevelData,
          athome: this.ischeckboxhomeactive
        });
      } else if (this.flag == 1) {
        data = JSON.stringify({
          patLabAppointmentID: this.patLabAppointmentID,
          fclProviderMapID: { fclProviderMapID: this.fclProviderMapID },
          patLabAppDate: new Date().getTime(),
          patLabAppTimeFrom: this.changeDateToMiliseconds(
            this.patAppDate + " " + this.patAppTimeFrom
          ),
          patLabAppTimeTo: this.changeDateToMiliseconds(
            this.patAppDate + " " + this.patAppTimeTo
          ),
          patAppType: this.visittypeId,
          patientLabAppointmentReason: this.visittypereasonId,
          patLabDetail: this.patAppDescription,
          patAppStatus: "Pending",
          labReportsLevel1: this.labReportsLevelData,
          athome: this.ischeckboxhomeactive
        });
      } else if (this.flag == 3) {
        data = JSON.stringify({
          fclProviderMapID: { fclProviderMapID: this.fclProviderMapID },
          patLabAppDate: new Date().getTime(),
          patLabAppTimeFrom: this.changeDateToMiliseconds(
            this.patAppDate + " " + this.patAppTimeFrom
          ),
          patLabAppTimeTo: this.changeDateToMiliseconds(
            this.patAppDate + " " + this.patAppTimeTo
          ),
          patAppType: this.visittypeId,
          patientLabAppointmentReason: this.visittypereasonId,
          patLabDetail: this.patAppDescription,
          patAppStatus: "Pending",
          labReportsLevel1: this.labReportsLevelData,
          athome: this.ischeckboxhomeactive
        });
      } else {
        data = JSON.stringify({
          fclProviderMapID: { fclProviderMapID: this.fclProviderMapID },
          patLabAppDate: new Date().getTime(),
          patLabAppTimeFrom: this.changeDateToMiliseconds(
            this.patAppDate + " " + this.patAppTimeFrom
          ),
          patLabAppTimeTo: this.changeDateToMiliseconds(
            this.patAppDate + " " + this.patAppTimeTo
          ),
          patAppType: this.visittypeId,
          patientLabAppointmentReason: this.visittypereasonId,
          patLabDetail: this.patAppDescription,
          patAppStatus: "Pending",
          patVisitNote: {
            patVisitNoteID: this.patVisitNoteID
          },
          labReportsLevel1: this.labReportsLevelData,
          athome: this.ischeckboxhomeactive
        });
      }

      console.log("data====>", JSON.stringify(data));
      this.api.wsPostHeader(APIName.addOrEditLab, data).then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          showToast(resp.message, this.toastCtrl);
          this.navCtrl.pop();
        }
      });
    }
    this.makePayment();
  }

  addValue(): void {
    this.checked = !this.checked;
    console.log("checked: " + this.checked); //it is working !!!
  }

  ///to convert date and time////

  changeDateToString(
    date: Date,
    format: string //string
  ) {
    // this.changeStringToDate(this.selectedDate +' '+this.TimeFrom)
    var date1 = date.toISOString();
    // var date2 = this.changeStringToDate(date1,s)
    console.log("dateString=>", date1);
  }
  changeStringToDate(
    dateString: string,
    format?: string //date
  ) {
    if (format) {
      console.log(
        "StringToDate==>",
        this.changeDateFormat(new Date(dateString), format)
      );
      return this.changeDateFormat(new Date(dateString), format);
    } else {
      console.log("completeString=>>>>>>", dateString);
      // console.log('StringToDate==>', new Date(dateString).toISOString());
      return new Date(dateString).toISOString();
      // return new Date(dateString).getTime();
    }
  }
  changeDateToMiliseconds(dateString: string) {
    console.log("MillisecondString=>>>>>>", dateString);
    return new Date(dateString).getTime();
  }
  changeDateFormat(
    date: Date,
    formate?: string //date to any format
  ) {
    let latest_date = this.datepipe.transform(date, formate);
    console.log("ChangeDateFormat", latest_date);
    return latest_date;
  }

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
        "&redirect_url=patientBookLabList",
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
