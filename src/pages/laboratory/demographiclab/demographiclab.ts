import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { APIName } from '../../../providers/commonfunction/commonfunction';

/**
 * Generated class for the DemographiclabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-demographiclab',
  templateUrl: 'demographiclab.html',
})


export class DemographiclabPage {
  public locationArray: any[] = [];

  public selectedLocation;

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
  }

  public demographicProfile: {
    addressLine1: string, addressLine2: string, addressLine3: string,
    zipcode: string, state: string, country: string, phone: string
  } = {
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
}
