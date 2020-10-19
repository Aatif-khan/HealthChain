import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { APIName, showToast } from '../../../providers/commonfunction/commonfunction';

/**
 * Generated class for the MedicalprofiledemographicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicalprofiledemographic',
  templateUrl: 'medicalprofiledemographic.html',
})
export class MedicalprofiledemographicPage {
  mobileNumberValidation = /^[0-9]{10}$/;


  public locationArray: any[] = [];

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

  public demographicProfile: {
    perMobileList: string[],
    addressLine1: string, addressLine2: string, addressLine3: string,
    zipcode: string, state: string, country: string, phone: string
  } = {
      perMobileList: [],
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      zipcode: '',
      state: '',
      country: '',
      phone: ''
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiledemographicPage');
    this.getAllLocations()
  }

  /**
   * get list of cities
   */
  getAllLocations() {

    this.api.wsPostHeader(APIName.getLocations, "").then((resp: any) => {
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
      this.locationArray = resp;
      this.selectedLocation = this.locationArray[0].locationID;
      console.log("location array 0 item", this.locationArray[0].locationID)
      if (resp.perMobileList[0] != null) {
        this.demographicProfile.perMobileList = resp.perMobileList
      }
    }
    });
  }

  updatePatientDemographicProfile() {
    this.api.wsPostHeader(APIName.updatePatientDemographicProfile, this.demographicProfile).then((resp: any) => {
      if(resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      }
      else
      {
        this.demographicProfile = resp;
      console.log("demographicProfile", resp)
      }
    });
  }

  showlocation(locationID: any) {
    console.log("locationid >> " + locationID)
    this.selectedLocation = locationID
  }

  addAddress() {

  }

  submitDetails() {

  }

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
