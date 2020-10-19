import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { GeocoderProvider } from '../../providers/geocoder/geocoder';
import { ControlMessagesComponent } from '../../components/control-messages-components/control-messages-components';
/**
 * Generated class for the AddpinlocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpinlocation',
  templateUrl: 'addpinlocation.html',
})
export class AddpinlocationPage {

   public form: FormGroup;
   public geoForm: FormGroup;
   public geocoded : boolean;
   public results : string;
   public filter: string      = 'Search by Coordinates';
   public displayForward : boolean     = true;
   public displayReverse : boolean     = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _GEOCODE   : GeocoderProvider,
              private _FB       : FormBuilder,
              private _PLATFORM : Platform) {

                this.form       = _FB.group({
                  'keyword'        : ['', Validators.required]
               });
               this.geoForm    = _FB.group({
                'latitude'        : ['', Validators.required],
                'longitude'       : ['', Validators.required]
             });
  }

  filterForm()
  {
     if(this.displayForward)
     {
        this.filter      		 = 'Search by keyword';
        this.displayReverse     = true;
        this.displayForward     = false;
     }
     else
     {
        this.filter             = 'Search by Co-ordinates';
        this.displayReverse     = false;
        this.displayForward     = true;
     }
  }

  performReverseGeocoding(val)
  {
     this._PLATFORM.ready()
     .then((data : any) =>
     {
        let latitude     : any = parseFloat(this.geoForm.controls["latitude"].value),
            longitude    : any = parseFloat(this.geoForm.controls["longitude"].value);

        this._GEOCODE.reverseGeocode(latitude, longitude)
        .then((data : any) =>
        {
           this.geocoded      = true;
           this.results       = data;

        })
        .catch((error : any)=>
        {
           this.geocoded      = true;
           this.results       = error.message;
        });
     });
  }

  performForwardGeocoding(val)
   {
      this._PLATFORM.ready()
      .then((data : any) =>
      {
         let keyword : string = this.form.controls["keyword"].value;
         this._GEOCODE.forwardGeocode(keyword)
         .then((data : any) =>
         {
            this.geocoded      = true;
            this.results       = data;
            

         })
         .catch((error : any)=>
         {
            this.geocoded      = true;
            this.results       = error.message;
         });
      });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpinlocationPage');
  }

}
