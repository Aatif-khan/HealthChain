import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController
} from "ionic-angular";
import { ApiProvider } from "../../../providers/api/api";
import {
  APIName,
  showToast
} from "../../../providers/commonfunction/commonfunction";

// import { GoogleMaps,GoogleMap} from"@ionic-native/google-maps";
import { map } from "rxjs/operator/map";
import {
  GoogleMaps,
  GoogleMap,
  CameraPosition,
  LatLng,
  GoogleMapsEvent,
  Marker,
  MarkerOptions
} from "@ionic-native/google-maps";
import { Geolocation } from "@ionic-native/geolocation";
import { DashBoardForDoctorPage } from "../dash-board-for-doctor/dash-board-for-doctor";
import { LocalNotifications } from "@ionic-native/local-notifications";

/**
 * Generated class for the DoctorprofiledemographicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-doctorprofiledemographic",
  templateUrl: "doctorprofiledemographic.html"
})
export class DoctorprofiledemographicPage {
  @ViewChild("map") mapElement: ElementRef;
  map: GoogleMap;

  mobileNumberValidation = /^[0-9]{10}$/;

  public timeZoneArray: any[] = [];

  public selectedTimeZone;

  secondaryPhone: string;

  public states = [
    {
      title: "States",
      id: 1
    },
    {
      title: "Gujarat",
      id: 2
    }
  ];
  selectedState = this.states[0];

  public countries = [
    {
      title: "Country",
      id: 1
    },
    {
      title: "India",
      id: 2
    },
    {
      title: "Greece",
      id: 3
    },
    {
      title: "Tonga",
      id: 4
    }
  ];
  selectedCountry = this.countries[0];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private _googleMaps: GoogleMaps,
    private _geoLoc: Geolocation
  ) {}

  public loadAddressObject: {
    // facilityname:string,
    // facilitytype:string,
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    area: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    milestone1: string;
    milestone2: string;
    timeZoneMaster: {
      utcTimeZoneId: number;
      countryCode: string;
      countryName: string;
      timezoneAbbreviation: string;
      timezoneName: string;
      utcOffset: string;
    };
  } = {
    // facilityname:"",
    // facilitytype:"",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    area: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    milestone1: "",
    milestone2: "",
    timeZoneMaster: {
      utcTimeZoneId: 10,
      countryCode: "IN",
      countryName: "INDIA",
      timezoneAbbreviation: "IST",
      timezoneName: "Indian Standard Time",
      utcOffset: "+5:30"
    }
  };

  public timeSlotObject: {
    timeSlotId: number;
    weekDay: string;
    minPerPatient: string;
    start: string;
    end: string;
  } = {
    timeSlotId: 0,
    weekDay: "",
    minPerPatient: "",
    start: "",
    end: ""
  };
  public addressObject: {
    // facilityname:string,
    // facilitytype:string,
    locationID: null;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    utcTimeZoneId: number;
    fcLocationName: string;
    facilityCenterID: number;
    timeSlotArrays: any[];

    timeZoneMaster: {
      utcTimeZoneId: number;
    };
    timeSlot: any[];
  } = {
    // facilityname:"",
    // facilitytype:"",
    locationID: null,
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    utcTimeZoneId: 0,
    fcLocationName: "Juhapura",
    facilityCenterID: 0,
    timeSlotArrays: [this.timeSlotObject],

    timeZoneMaster: {
      utcTimeZoneId: 0
    },
    timeSlot: [this.timeSlotObject]
  };
  cancel() {
    this.navCtrl.parent.parent.push(DashBoardForDoctorPage);
  }

  public demographicProfile: {
    // addressLine1: string, addressLine2: string, addressLine3: string,
    // zipcode: string, state: string, country: string,

    perMobilePrimary: string;
    perMobileList: string[];
    locationMaster: any[];
    facilityCenterMaster: {
      facilityCenterID: string;
      facilityCenterName: string;
      facilityCenterType: string;
    };
    plmLocationStatus: string;
    personID: string;
  } = {
    personID: "",
    locationMaster: [],
    facilityCenterMaster: {
      facilityCenterID: "",
      facilityCenterName: "",
      facilityCenterType: ""
    },
    perMobileList: [],
    perMobilePrimary: "",
    plmLocationStatus: ""
    // addressLine1: '',
    // addressLine2: '',
    // addressLine3: '',
    // zipcode: '',
    // state: '',
    // country: ''
  };

  public addressData: {
    // addressLine1: string, addressLine2: string, addressLine3: string,
    // zipcode: string, state: string, country: string,
    perMobilePrimary: string;
    perMobileList: string[];
    locationMasterdata: any[];
    facilityCenterMaster: {
      facilityCenterID: string;
      facilityCenterName: string;
      facilityCenterType: string;
    };
    plmLocationStatus: string;
    personID: string;
  } = {
    personID: "",
    locationMasterdata: [],
    facilityCenterMaster: {
      facilityCenterID: "",
      facilityCenterName: "",
      facilityCenterType: ""
    },
    perMobileList: [],
    perMobilePrimary: "",
    plmLocationStatus: ""
    // addressLine1: '',
    // addressLine2: '',
    // addressLine3: '',
    // zipcode: '',
    // state: '',
    // country: ''
  };

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfiledemographicPage");
    this.getAllTimeZone();
    this.getDemographicData();

    // this.initMpa();
  }

  /**
   * get list of cities
   */
  getAllTimeZone() {
    this.api.wsPostHeader(APIName.getAllTimeZone, "").then((resp: any) => {
      if (resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      } else {
        this.timeZoneArray = resp.data;
        this.selectedTimeZone = this.timeZoneArray[0].utcTimeZoneId;
        this.showTimeZone(this.selectedTimeZone);
        console.log(
          "location array 0 item",
          this.timeZoneArray[0].utcTimeZoneId
        );
      }
    });
  }

  showTimeZone(TimeZoneID: any) {
    console.log("locationid >> " + TimeZoneID);
    this.selectedTimeZone = TimeZoneID;
  }

  getDemographicData() {
    // var data1 = {
    //   // addressLine1: this.addressObject.addressLine1,
    //   // addressLine2: this.addressObject.addressLine2,
    //   // addressLine3: this.addressObject.addressLine3,
    //   // timeZoneMaster: this.addressObject.timeZoneMaster,
    //   // city: this.addressObject.city,
    //   // state: this.addressObject.state,
    //   // zip: this.addressObject.zip,
    //   // country: this.addressObject.country

    //   addressLine1: "",
    //   addressLine2: "",
    //   addressLine3: "",
    //   city: "",
    //   state: "",
    //   zip: "",
    //   country: "",
    //   timeZoneMaster: {
    //     utcTimeZoneId: 10,
    //     countryCode: "IN",
    //     countryName: "INDIA",
    //     timezoneAbbreviation: "IST",
    //     timezoneName: "Indian Standard Time",
    //     utcOffset: "+5:30"
    //   },
    //   timeSlot: {
    //     timeSlotId: "",
    //     weekDay: "",
    //     minPerPatient: "",
    //     start: "",
    //     end: ""
    //   }
    // };
    this.api
      .wsPostHeaderBackground(APIName.getDemographicData, "")
      .then((resp: any) => {
        console.log("response" + resp);
        console.log("locationMaster >> ", resp.data.locationMaster.length);
        if (resp.data.locationMaster.length > 0) {
          this.demographicProfile.locationMaster = resp.data.locationMaster;
        }

        this.demographicProfile.facilityCenterMaster =
          resp.data.facilityCenterMaster;

        if (resp.data.perMobileList.length > 0) {
          for (let i = 0; i < resp.data.perMobileList.length; i++) {
            this.demographicProfile.perMobileList.push(
              resp.data.perMobileList[i].value
            );
          }
        }

        for (let address of resp.data.locationMaster) {
          this.loadAddressObject.addressLine1 = address.addressLine1;
          this.loadAddressObject.addressLine2 = address.addressLine2;
          this.loadAddressObject.addressLine3 = address.addressLine3;
          this.loadAddressObject.city = address.city;
          console.log("city: " + address.city);

          this.loadAddressObject.timeZoneMaster =
            address.timeZoneMaster.countryName;

          console.log("timeZoneMaster: " + address.timeZoneMaster.countryName);

          this.loadAddressObject.state = address.state;
          this.loadAddressObject.zip = address.zip;
          this.loadAddressObject.country = address.country;
        }
        // this.addressObject.addressLine1 =resp.data.locationMaster[0].addressLine1;

        this.demographicProfile.personID = resp.data.personID;
        this.demographicProfile.plmLocationStatus = resp.data.plmLocationStatus;

        this.demographicProfile.perMobilePrimary = resp.data.perMobilePrimary;
      });
  }

  addAddress() {
    console.log("addAddress >> ", JSON.stringify(this.addressObject));
    if (this.addressObject.addressLine1.length == 0) {
      showToast("Please enter valid addressline 1", this.toastCtrl);
    } else if (this.addressObject.addressLine2.length == 0) {
      showToast("Please enter valid addressline 2", this.toastCtrl);
    } else if (this.addressObject.addressLine3.length == 0) {
      showToast("Please enter valid addressline 3", this.toastCtrl);
    } else if (this.addressObject.zip.length == 0) {
      showToast("Please enter valid zip", this.toastCtrl);
    } else if (this.addressObject.city.length == 0) {
      showToast("Please enter valid city", this.toastCtrl);
    } else if (this.addressObject.state.length == 0) {
      showToast("Please enter valid state", this.toastCtrl);
    } else if (this.addressObject.country.length == 0) {
      showToast("Please enter valid country", this.toastCtrl);
    } else {
      console.log(this.addressObject);
      console.log(this.timeSlotObject);

      // this.addressObject.timeSlot.push(this.timeSlotObject);
      this.demographicProfile.locationMaster.push(this.addressObject);
      // this.updatePatientDemographicProfile();

      this.timeSlotObject = {
        timeSlotId: 0,
        weekDay: "",
        minPerPatient: "",
        start: "",
        end: ""
      };

      this.addressObject = {
        // facilityname:"",
        // facilitytype:"",
        locationID: null,
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        utcTimeZoneId: 0,
        fcLocationName: "Juhapura",
        facilityCenterID: 0,
        timeSlotArrays: [this.timeSlotObject],

        timeZoneMaster: {
          utcTimeZoneId: 0
        },
        timeSlot: [this.timeSlotObject]
      };
    }
  }

  submitDetails() {
    console.log("submitDetails >> ", JSON.stringify(this.demographicProfile));

    if (this.demographicProfile.perMobilePrimary.length == 0) {
      showToast("Please enter valid phone number", this.toastCtrl);
    } else {
      this.updatePatientDemographicProfile();
    }
  }

  addtoList() {
    if (!this.mobileNumberValidation.test(this.secondaryPhone)) {
      showToast("Please Enter valid phone number", this.toastCtrl);
      return;
    }
    this.demographicProfile.perMobileList.push(this.secondaryPhone);
    this.secondaryPhone = "";
  }

  deleteelement(list: any) {
    let alert = this.alertCtrl.create({
      title: "Confirm Delete",
      message: "Are you sure, you want to delete this phone number?",
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
            let index = this.demographicProfile.perMobileList.indexOf(list);

            if (index > -1) {
              this.demographicProfile.perMobileList.splice(index, 1);
            }
            console.log("Item deleted");
          }
        }
      ]
    });
    alert.present();
  }

  deleteAddress(list: any) {
    let alert = this.alertCtrl.create({
      title: "Confirm Delete",
      message: "Are you sure, you want to delete this address?",
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
            let index = this.demographicProfile.locationMaster.indexOf(list);

            if (index > -1) {
              this.demographicProfile.locationMaster.splice(index, 1);
            }
            console.log("Item deleted");
          }
        }
      ]
    });
    alert.present();
  }

  updatePatientDemographicProfile() {
    console.log("DAta==========", this.demographicProfile);

    this.addressData.locationMasterdata = this.demographicProfile.locationMaster;
    this.addressData.perMobileList = this.demographicProfile.perMobileList;
    this.addressData.perMobilePrimary = this.demographicProfile.perMobilePrimary;
    this.addressData.personID = this.demographicProfile.personID;
    this.addressData.plmLocationStatus = this.demographicProfile.plmLocationStatus;
    this.addressData.facilityCenterMaster.facilityCenterID = this.demographicProfile.facilityCenterMaster.facilityCenterID;
    this.addressData.facilityCenterMaster.facilityCenterName = this.demographicProfile.facilityCenterMaster.facilityCenterName;
    this.addressData.facilityCenterMaster.facilityCenterType = this.demographicProfile.facilityCenterMaster.facilityCenterType;
    var data = {};
    this.api
      .wsPostHeader(APIName.addfacilityandlocation, this.addressData)
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          // this.demographicProfile = resp.data;
          showToast(resp.message, this.toastCtrl);
        }
      });
  }
  //viral code map intigration

  // ngAfterViewInit()
  // {
  //   let loc:LatLng;

  //  this.initMap();

  //  this.map.one(GoogleMapsEvent.MAP_READY).then(() =>
  //    {

  //    this.geoLocation().then( res => {
  //    console.log(res.coords.latitude);
  //    console.log(res.coords.longitude);

  //    loc = new LatLng(res.coords.latitude,res.coords.longitude);
  //    this.moveCamera(loc);
  //    this.createMrker(loc,"Me").then((marker:Marker) => {
  //      marker.showInfoWindow();
  //    }).catch( err =>{
  //      console.log(err);
  //    });

  //   }).catch(err =>{
  //     console.log(err);
  //   });
  //    });

  // }

  initMap() {
    let element = this.mapElement.nativeElement;
    this.map = GoogleMaps.create("map_canvas");
  }
  geoLocation() {
    return this._geoLoc.getCurrentPosition();
  }

  moveCamera(loc: LatLng) {
    let options: CameraPosition<any> = {
      target: loc,
      zoom: 15,
      tilt: 10
    };
    this.map.moveCamera(options);
  }

  createMrker(loc: LatLng, title: string) {
    let markerOptions: MarkerOptions = {
      position: loc,
      title: title
    };

    return this.map.addMarker(markerOptions);
  }
}
