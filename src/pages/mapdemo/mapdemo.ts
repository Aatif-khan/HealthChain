import { Component, ViewChild, ElementRef, AfterViewInit, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMaps,GoogleMap,CameraPosition,LatLng,GoogleMapsEvent,
  Marker,MarkerOptions
 } from"@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { GeocoderProvider } from '../../providers/geocoder/geocoder';
import { ControlMessagesComponent } from '../../components/control-messages-components/control-messages-components';

/**
 * Generated class for the MapdemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapdemo',
  templateUrl: 'mapdemo.html',
})
export class MapdemoPage {

   @ViewChild("map") mapElement:ElementRef;
   map:GoogleMap;

   public form: FormGroup;
   public geoForm: FormGroup;
   public geocoded : boolean;
   public results : string;
   public filter: string      = 'Search by Coordinates';
   public displayForward : boolean     = true;
   public displayReverse : boolean     = false;
   
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _googleMaps:GoogleMaps,
              private _geoLoc: Geolocation,
              public _GEOCODE   : GeocoderProvider,
              private _FB       : FormBuilder,
              private _PLATFORM : Platform) 
              {

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
           console.log(" reverseGeocode result++++++++++"+this.results);

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
           
            console.log("test : "+data);
            let str : string   = `${data[0].latitude},${data[0].longitude}`
            // console.log("test : "+data[0]);
            this.results       = str;
            console.log(" forwardGeocode result++++++++++"+this.results);

            let lat = data[0].latitude;
            let long = data[0].longitude;

            let loc = new LatLng(lat,long);
    
    this.moveCamera(loc);
    this.createMrker(loc,"testMe").then((marker:Marker) => {
      marker.showInfoWindow();
    }).catch( err =>{
      console.log(err);
    });
            // console.log(" forwardGeocode result+++lat+++++++"+this.results[0]);
            // console.log(" forwardGeocode result+++++long+++++"+this.results[1]);

         })
         .catch((error : any)=>
         {
            this.geocoded      = true;
            this.results       = error.message;
         });
      });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapdemoPage');
  }
 ngAfterViewInit()
 {
   let loc:LatLng;

  this.initMap();
 
  this.map.one(GoogleMapsEvent.MAP_READY).then(() =>
    {
   
    this.geoLocation().then( res => {
    console.log(res.coords.latitude);
    console.log(res.coords.longitude);

    loc = new LatLng(res.coords.latitude,res.coords.longitude);
    
    this.moveCamera(loc);
    this.createMrker(loc,"Me").then((marker:Marker) => {
      marker.showInfoWindow();
    }).catch( err =>{
      console.log(err);
    });

   }).catch(err =>{
     console.log(err);
   });
    });

 }


 initMap()
 {
   let element=this.mapElement.nativeElement;
   this.map=GoogleMaps.create("map_canvas");
   
 }
 geoLocation()
 {
   return this._geoLoc.getCurrentPosition();
  
 }

 moveCamera(loc:LatLng)
 {
    let options: CameraPosition<any> ={
      target:loc,
      zoom:15,
      tilt:10
    }
     this.map.moveCamera(options)
 }

 createMrker(loc:LatLng,title:string)
 {
   let markerOptions:MarkerOptions ={

    position:loc,
    title:title,

   };

   return this.map.addMarker(markerOptions);

 }


}
