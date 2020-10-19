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
 * Generated class for the EditappointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-editappointment",
  templateUrl: "editappointment.html"
})
export class EditappointmentPage {
  public facilitiesArray: any[] = [];
  public locationArray: any[] = [];
  public specialityArray: any[] = [];
  public doctorArray: any[] = [];
  public visittypeArray: any[] = [];
  public visitreasonArray: any[] = [];

  public facilityCenterID = "";
  public fcLocationMapID = "";
  public fclProviderMapID = "";
  public specialityID = "";
  public visittypeId = "";
  public visitreasonId = "";

  public viewgetappointmentArray: any = {};

  public selectedfacilityCenterID;
  public selectedfcLocationMapID;
  public selectedspecialityID;
  public selectedfclProviderMapID;
  public selectedvisittypeId;
  public selectedvisitreasonId;
  public selectedpatAppDate;
  public selectedpatAppTimeFrom;
  public selectedpatAppTimeTo;
  public selectedpatAppDescription;

  patAppointmentID: any = [];
  constructor(
    public datepipe: DatePipe,
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public toastCtrl: ToastController
  ) {
    this.patAppointmentID = this.navParams.get("patAppointmentID");
    this.getviewgetappointment();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddappointmentPage");
  }

  getallFacilities() {
    this.api.wsPostHeader(APIName.getAllFacility, "").then((resp: any) => {
      if (resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      } else {
        console.log("facilityCall====>", resp);
        this.facilitiesArray = resp.data;
        if (this.facilityCenterID.length) {
        } else {
          this.facilityCenterID = this.selectedfacilityCenterID;
        }
        this.getFacilityid(this.selectedfacilityCenterID);
      }
    });
  }
  getFacilityid(facilityid: any) {
    this.facilityCenterID = facilityid;
    this.getAllLocations();
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
        console.log("location====>", resp);
        // if (this.fcLocationMapID.length)
        // {
        //  console.log('ChangableididlsjkID-===>',this.fcLocationMapID);
        // }else{
        //  this.fcLocationMapID =  this.selectedfcLocationMapID;

        // }
        // console.log('locationID===>',this.fcLocationMapID);

        // this.fcLocationMapID =  this.selectedfcLocationMapID;
        this.getlocationid(this.selectedfcLocationMapID);
      });
  }
  getlocationid(locationid: any) {
    console.log("calleeeddddd===>", this.fcLocationMapID);
    this.fcLocationMapID = locationid;
    this.getAllSpeciality();
  }
  /// Speciality////
  getAllSpeciality() {
    var data = {
      fcLocationMapID: this.fcLocationMapID
    };
    this.api
      .wsPostHeaderBackground(
        APIName.getAllSpecialityByLocationAndFacility,
        data
      )
      .then((resp: any) => {
        this.specialityArray = resp.data;
        console.log("specilaity====>", resp);
        this.specialityID = this.selectedspecialityID;
        this.getspecialityid(this.selectedspecialityID);
      });
  }
  getspecialityid(speciality: any) {
    this.specialityID = speciality;
    this.getAllDoctors();
  }

  /// get all doctors////
  getAllDoctors() {
    var data = {
      FcLocationMapID: this.fcLocationMapID,
      SpecialityID: this.specialityID
    };
    this.api
      .wsPostHeaderBackground(APIName.getAllDoctorByLocationAndspeciality, data)
      .then((resp: any) => {
        this.doctorArray = resp.data;
        // this.fclProviderMapID =  this.doctorArray[0].fclProviderMapID;
        this.fclProviderMapID = this.selectedfclProviderMapID;
        this.getdoctorid(this.selectedfclProviderMapID);
        this.visittype();
      });
  }
  getdoctorid(doctorid: any) {
    this.fclProviderMapID = doctorid;
  }

  /// get visit type////
  visittype() {
    this.api
      .wsPostHeaderBackground(APIName.appointmentType, "")
      .then((resp: any) => {
        this.visittypeArray = resp.data;
        this.visittypeId = this.selectedvisittypeId;
        this.getvisittypeid(this.selectedvisittypeId);
        this.visitreason();
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
        this.visitreasonId = this.selectedvisitreasonId;
        // this.getvisitreasonid(this.selectedvisitreasonId);
        // this.visitreasonId = this.visitreasonArray[0].key;
      });
  }
  getvisitreasonid(visit: any) {
    this.visitreasonId = visit;
  }

  /// view and get appointment api////
  getviewgetappointment() {
    var data1 = {
      patAppointmentID: this.patAppointmentID
      // patAppointmentID: 107
    };

    this.api
      .wsPostHeader(APIName.viewAndEditAppointmentPatient, data1)
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          //  console.log("RESPONNSE:--- "+JSON.stringify(resp));
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
          this.selectedspecialityID = resp.data.specialityID;
          this.selectedfclProviderMapID = resp.data.fclProviderMapID;
          this.selectedvisittypeId = resp.data.patAppType;
          this.selectedvisitreasonId = resp.data.patAppReason;

          let timediffFrom: number = resp.data.patAppTimeFrom - 19800000;
          let timediffTo: number = resp.data.patAppTimeTo - 19800000;

          this.selectedpatAppDate = this.changeStringToDate(
            new Date(resp.data.patAppDate).toISOString()
          );
          console.log("datettttttttttttttttttt", this.selectedpatAppDate);

          this.selectedpatAppTimeFrom = this.changeStringToDate(
            new Date(timediffFrom).toISOString()
          );
          console.log("datettttttttttttttttttt", this.selectedpatAppDate);

          this.selectedpatAppTimeTo = this.changeStringToDate(
            new Date(timediffTo).toISOString()
          );
          console.log("datettttttttttttttttttt", this.selectedpatAppTimeTo);

          // this.selectedpatAppTimeFrom =resp.data.patAppDate?this.changeStringToDate(resp.data.patAppDate+" "+resp.data.patAppTimeFrom):"";
          // this.selectedpatAppTimeTo =resp.data.patAppDate?this.changeStringToDate(resp.data.patAppDate+" "+resp.data.patAppTimeTo):"";
          this.selectedpatAppDescription = resp.data.patAppDescription;
        }
      });
  }

  formatDate(date) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
  }

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

  callEditAppointmentApi() {
    if (this.facilityCenterID.length == 0) {
      showToast("Please select facility", this.toastCtrl);
      return;
    }
    if (this.fcLocationMapID.length == 0) {
      showToast("Please select Location", this.toastCtrl);
      return;
    }
    if (this.specialityID.length == 0) {
      showToast("Please select Speciality", this.toastCtrl);
      return;
    }
    if (this.fclProviderMapID.length == 0) {
      showToast("Please select Doctor", this.toastCtrl);
      return;
    }
    if (this.selectedpatAppDate.length == 0) {
      showToast("Please select Appointment date", this.toastCtrl);
      return;
    }
    if (this.selectedpatAppTimeFrom.length == 0) {
      showToast("Please select Appointment start time", this.toastCtrl);
      return;
    }
    if (this.selectedpatAppTimeTo.length == 0) {
      showToast("Please select Appointment end time", this.toastCtrl);
      return;
    }
    if (this.visittypeId.length == 0) {
      showToast("Please select type Of Visit", this.toastCtrl);
      return;
    }
    if (this.visitreasonId.length == 0) {
      showToast("Please select Reason to Visit", this.toastCtrl);
      return;
    }

    if (this.selectedpatAppDescription.length == 0) {
      showToast("Please add detail Description", this.toastCtrl);
      return;
    }

    let date = new Date(this.selectedpatAppDate);
    let datetopass = date.getTime();
    console.log("datebefore", "" + datetopass);

    let timefrom = new Date(this.selectedpatAppTimeFrom);
    let timefromtopass = timefrom.getTime();

    console.log("timebefrm", "" + timefromtopass);

    let timeto = new Date(this.selectedpatAppTimeTo);
    let timetopass = timeto.getTime();

    console.log("timeto", "" + timetopass);

    let data = JSON.stringify({
      patAppointmentID: this.patAppointmentID,
      fclProviderMapID: { fclProviderMapID: this.fclProviderMapID },
      specialityMaster: { specialityID: this.specialityID },
      patAppDate: datetopass,
      patAppTimeFrom: timefromtopass,
      patAppTimeTo: timetopass,
      // patAppTimeFrom: '08:00 am',
      // patAppTimeTo: '08:15 pm',
      patAppType: this.visittypeId,
      patAppReason: this.visitreasonId,
      patAppDescription: this.selectedpatAppDescription,
      patAppStatus: "Pending"
    });
    console.log("ADDDdata::----" + data);
    this.api
      .wsPostHeader(APIName.addOrEditAppointment, data)
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          showToast("Appointment book updated successfully", this.toastCtrl);

          this.navCtrl.pop();
        }
      });
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
}
