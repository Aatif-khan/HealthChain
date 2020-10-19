import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { APIName, showToast } from '../../../providers/commonfunction/commonfunction';

/**
 * Generated class for the LabprofiledemographicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-labprofiledemographic',
  templateUrl: 'labprofiledemographic.html',
})
export class LabprofiledemographicPage {

 
  mobileNumberValidation = /^[0-9]{10}$/;


  public locationArray: any[] = [];
  public Facility: any[] = [];
  public Locations: any[] = [];

  public selectedLocation;

  secondaryPhone: string

  public states = [
    {
      title: 'States',
      id: 1
    },
    {
      title: 'Gujarat',
      id: 2
    }];
  selectedState = this.states[0];

  public countries = [
    {
      title: 'Country',
      id: 1
    },
    {
      title: 'India',
      id: 2
    },
    {
      title: 'Greece',
      id: 3
    },
    {
      title: 'Tonga',
      id: 4
    }];
  selectedCountry = this.countries[0];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ApiProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  public addressObject: {
    locationID: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
   // area: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    phone:string,
    milestone1: string,
    milestone2: string,
    timeZoneMaster: {
      utcTimeZoneId: number,
      countryCode: string,
      countryName: string,
      timezoneAbbreviation: string,
      timezoneName: string,
      utcOffset: string
    }
  } = {
      locationID: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
     // area: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone:"",
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

    }

    public demographicProfile: {
      personID: string, facilityCenterMaster:any,
      perMobilePrimary: string, perMobileList: string[], locationMaster: any[]
    } = {
        personID: '',
        facilityCenterMaster:'',
        locationMaster: [],
        perMobileList: [],
        perMobilePrimary: '',
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabprofiledemographicPage');
  //  this.getAllLocations()
  this.getDemographicData()
  this.WsGetAllFacilities()
  }

  /**
   * get list of cities
   */
  getAllLocations() {

    this.api.wsPostHeader(APIName.getAllLocationByFacility, "").then((resp: any) => {
      if(resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      }
      else
      {
      this.locationArray = resp;
      this.selectedLocation = this.locationArray[0].locationID;
      console.log("location array 0 item", this.locationArray[0].locationID)
      }
    });
  }

  getDemographicData() {

    this.api.wsPostHeader(APIName.getDemographicData, "").then((resp: any) => {
      if(resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      }
      else
      {

    //  this.locationArray = resp;
    //  this.selectedLocation = this.locationArray[0].locationID;
     // console.log("location array 0 item", this.locationArray[0].locationID)
     console.log("getdemographic data>>>>>>>>>",resp.data)
     console.log("getdemographic perMobileList data>>>>>>>>>",resp.data.perMobileList)
     console.log("getdemographic locationMasterdata data>>>>>>>>>",resp.data.locationMaster)
     this.demographicProfile.personID = resp.data.personID
     this.demographicProfile.perMobilePrimary = resp.data.perMobilePrimary
     this.demographicProfile.perMobileList = resp.data.perMobileList
     this.demographicProfile.locationMaster = resp.data.locationMaster
     console.log("mobile list first element is>>>>",resp.data.perMobileList[0])
      if (resp.data.perMobileList[0] != null) {
        this.demographicProfile.perMobileList = resp.data.perMobileList
      }
    }
    });
  }
  WsGetAllFacilities()
  {
      this.api.wsPostHeaderBackground(APIName.getAllFacility,{}).then((resp) => {
        if(resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        }
        else
        {
        let TempForFacility:any = resp
      this.Facility = TempForFacility.data
    //  this.DoctorVisit.Facility = this.Facilities[0];
      console.log(this.Facility);
      console.log('ionViewDidLoad DoctorAddOrEditVisitPage');
        }
  });
  
  }
  onSelectChange(selectedValue: any) {
    console.log('Selected'+ selectedValue);
    this.demographicProfile.facilityCenterMaster={'facilityCenterID':selectedValue}
    this.WsGetAllLocation(selectedValue)
  }
  WsGetAllLocation(strSelectedValue : any)
  {
    var data= {
      facilityCenterID:strSelectedValue
    }
   
     
      this.api.wsPostHeader(APIName.getAllLocationByFacility,data).then((resp) => {
        if(resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        }
        else
        {
      let Temparray:any = resp;
      this.Locations = Temparray.data;
     // this.DoctorVisit.Location = this.Locations[0];
        }
    });
  }

  updateLabDemographicProfile() {
    this.api.wsPostHeader(APIName.updatelabdemographicprofile, this.demographicProfile).then((resp: any) => {
     
      if(resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      }
      else
      {
         // this.demographicProfile = resp.data;
      showToast(resp.message,this.toastCtrl)
     // console.log("demographicProfile", resp)
      }
    });
  }

  showlocation(location: any) {
    console.log("locationid >> " + location)
    this.addressObject.locationID = location
   // this.selectedLocation = location
  }

  addAddress() {
    console.log("addAddress >> ", this.addressObject)

    this.demographicProfile.locationMaster.push(this.addressObject)

    this.addressObject = {
      locationID: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      //area: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone:"",
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

    }
  }
  submitDetails() {
    if(this.demographicProfile.facilityCenterMaster=="") {
    showToast("Please Select facility",this.toastCtrl)
    return
    }
    // console.log("submitDetails >>----> ", JSON.stringify(this.demographicProfile))
    this.updateLabDemographicProfile()
    // this.api.wsPostHeader(APIName.demographic, this.demographicProfile)
    // .then((resp: any) => {
    // showToast(resp.message, this.toastCtrl)
    // });
    }
  // submitDetails() {
  //   console.log("submitDetails >>----> ", JSON.stringify(this.demographicProfile))
  //   this.updateLabDemographicProfile()
  //   // this.api.wsPostHeader(APIName.demographic, this.demographicProfile)
  //   //   .then((resp: any) => {
  //   //     showToast(resp.message, this.toastCtrl)
  //   //   });
  // }


  addtoList() {
    if (!this.mobileNumberValidation.test(this.secondaryPhone)) {
      showToast("Please Enter valid phone number", this.toastCtrl);
      return
    }
    this.demographicProfile.perMobileList.push(this.secondaryPhone)
    this.secondaryPhone = ''
  }

  deleteelement(list: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure, you want to delete this phone number?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            let index = this.demographicProfile.perMobileList.indexOf(list);

            if (index > -1) {
              this.demographicProfile.perMobileList.splice(index, 1);
            }
            console.log('Item deleted');
          }
        }
      ]
    });
    alert.present();

  }

}
