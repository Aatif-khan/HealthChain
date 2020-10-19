import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController,
  Platform
} from "ionic-angular";
import { ApiProvider } from "../../../providers/api/api";
import {
  APIName,
  showToast
} from "../../../providers/commonfunction/commonfunction";
import { DashBoardForPatientPage } from "../dash-board-for-patient/dash-board-for-patient";

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
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GeocoderProvider } from "../../../providers/geocoder/geocoder";

/**
 * Generated class for the ProfiledemographicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profiledemographic",
  templateUrl: "profiledemographic.html"
})
export class ProfiledemographicPage {
  @ViewChild("map") mapElement: ElementRef;
  map: GoogleMap;

  mobileNumberValidation = /^[0-9]{10}$/;

  public timeZoneArray: any[] = [];

  public selectedTimeZone;

  public form: FormGroup;
  public geoForm: FormGroup;
  public geocoded: boolean;
  public results: string;
  public filter: string = "Search by Coordinates";
  public displayForward: boolean = true;
  public displayReverse: boolean = false;
  public fulladdress: any;
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
    private _geoLoc: Geolocation,
    private _PLATFORM: Platform,
    private _FB: FormBuilder,
    public _GEOCODE: GeocoderProvider
  ) {
    this.form = _FB.group({
      keyword: ["", Validators.required]
    });
    this.geoForm = _FB.group({
      latitude: ["", Validators.required],
      longitude: ["", Validators.required]
    });
  }

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
      utcTimeZoneId: 10
    }
  };

  public addressObject: {
    // facilityname:string,
    // facilitytype:string,
    locationID: number;
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
    timeSlot: null;
    utcTimeZoneId: null;
    timeZoneMaster: {
      utcTimeZoneId: number;
    };
  } = {
    // facilityname:"",
    // facilitytype:"",
    locationID: 0,
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
    utcTimeZoneId: null,
    timeSlot: null,
    timeZoneMaster: {
      utcTimeZoneId: 10
    }
  };
  cancel() {
    this.navCtrl.parent.parent.push(DashBoardForPatientPage);
  }

  public demographicProfile: {
    // addressLine1: string, addressLine2: string, addressLine3: string,
    // zipcode: string, state: string, country: string,
    perMobilePrimary: string;
    perMobileList: string[];
    locationMaster: any[];
    plmLocationStatus: string;
    personID: string;
  } = {
    personID: "",
    locationMaster: [],
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
    var data1 = {
      // addressLine1: this.addressObject.addressLine1,
      // addressLine2: this.addressObject.addressLine2,
      // addressLine3: this.addressObject.addressLine3,
      // timeZoneMaster: this.addressObject.timeZoneMaster,
      // city: this.addressObject.city,
      // state: this.addressObject.state,
      // zip: this.addressObject.zip,
      // country: this.addressObject.country

      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      timeZoneMaster: {
        utcTimeZoneId: 10
      }
    };
    this.api
      .wsPostHeaderBackground(APIName.getPatientDemographicData, data1)
      .then((resp: any) => {
        console.log("response" + resp);
        console.log("locationMaster >> ", resp.data.locationMaster.length);
        if (resp.data.locationMaster.length > 0) {
          this.demographicProfile.locationMaster = resp.data.locationMaster;
        }

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
          this.fulladdress =
            address.addressLine1.toString() +
            "," +
            address.addressLine2.toString() +
            "," +
            address.addressLine3.toString() +
            "," +
            address.city.toString() +
            address.timeZoneMaster.countryName.toString() +
            address.state.toString() +
            address.zip.toString() +
            address.country.toString();
          this.performForwardGeocoding(this.fulladdress);
          //console.log("test getPatientDemographicData inside+++++++"+this.performForwardGeocoding(this.loadAddressObject.addressLine3));
        }
        // this.addressObject.addressLine1 =resp.data.locationMaster[0].addressLine1;

        this.demographicProfile.personID = resp.data.personID;
        this.demographicProfile.plmLocationStatus = resp.data.plmLocationStatus;
        this.demographicProfile.perMobilePrimary = resp.data.perMobilePrimary;
        // this.performForwardGeocoding(this.loadAddressObject.city);
        // console.log("test getPatientDemographicData+++++++"+this.performForwardGeocoding(this.loadAddressObject.addressLine3));
      });
  }

  // showlocation(locationID: any) {
  //   console.log("locationid >> " + locationID);
  //   this.selectedTimeZone = locationID;
  // }

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
      this.demographicProfile.locationMaster.push(this.addressObject);

      this.addressObject = {
        locationID: 0,
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        area: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        milestone1: null,
        milestone2: null,
        utcTimeZoneId: null,
        timeSlot: null,
        timeZoneMaster: {
          utcTimeZoneId: 10
        }
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
    this.api
      .wsPostHeader(
        APIName.updatePatientDemographicProfile,
        this.demographicProfile
      )
      .then((resp: any) => {
        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          // this.demographicProfile = resp.data;
          showToast(resp.message, this.toastCtrl);
        }
      });
  }
  // viral code map intigration

  ngAfterViewInit() {
    let loc: LatLng;

    this.initMap();

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.geoLocation()
        .then(res => {
          console.log(res.coords.latitude);
          console.log(res.coords.longitude);

          loc = new LatLng(res.coords.latitude, res.coords.longitude);
          this.moveCamera(loc);
          this.createMrker(loc, "Me")
            .then((marker: Marker) => {
              marker.showInfoWindow();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

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

  performForwardGeocoding(val) {
    //this._PLATFORM.ready()
    //.then((data : any) =>
    //{
    let keyword: string = this.form.controls["keyword"].value;
    this._GEOCODE.forwardGeocode(val).then((data: any) => {
      this.geocoded = true;

      console.log("test : " + data);
      let str: string = `${data[0].latitude},${data[0].longitude}`;
      // console.log("test : "+data[0]);
      this.results = str;
      console.log(" forwardGeocode result++++++++++" + this.results);

      let lat = data[0].latitude;
      let long = data[0].longitude;

      let loc = new LatLng(lat, long);

      this.moveCamera(loc);
      this.createMrker(loc, this.fulladdress)
        .then((marker: Marker) => {
          marker.showInfoWindow();
          //}).catch( err =>{
          //console.log(err);
          //  });
          // console.log(" forwardGeocode result+++lat+++++++"+this.results[0]);
          // console.log(" forwardGeocode result+++++long+++++"+this.results[1]);
        })
        .catch((error: any) => {
          this.geocoded = true;
          this.results = error.message;
        });
    });
  }

  performReverseGeocoding(val) {
    this._PLATFORM.ready().then((data: any) => {
      let latitude: any = parseFloat(this.geoForm.controls["latitude"].value),
        longitude: any = parseFloat(this.geoForm.controls["longitude"].value);

      this._GEOCODE
        .reverseGeocode(latitude, longitude)
        .then((data: any) => {
          this.geocoded = true;
          this.results = data;
          console.log(" reverseGeocode result++++++++++" + this.results);
        })
        .catch((error: any) => {
          this.geocoded = true;
          this.results = error.message;
        });
    });
  }
  filterForm() {
    if (this.displayForward) {
      this.filter = "Search by keyword";
      this.displayReverse = true;
      this.displayForward = false;
    } else {
      this.filter = "Search by Co-ordinates";
      this.displayReverse = false;
      this.displayForward = true;
    }
  }
}
