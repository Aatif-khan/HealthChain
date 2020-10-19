import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import {
  NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult
} from "@ionic-native/native-geocoder";

/*
  Generated class for the GeocoderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeocoderProvider {
  constructor(public http: HttpClient, private _GEOCODE: NativeGeocoder) {
    console.log("Hello GeocoderProvider Provider");
  }

  reverseGeocode(lat: number, lng: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._GEOCODE
        .reverseGeocode(lat, lng)
        .then((result: NativeGeocoderReverseResult[]) => {
          let str: string = `The reverseGeocode address is ${result[0].street} in ${result[0].countryCode}`;
          resolve(str);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  forwardGeocode(keyword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._GEOCODE
        .forwardGeocode(keyword)
        .then((coordinates: NativeGeocoderForwardResult[]) => {
          // let str : string[];
          // str[0]   = coordinates[0].latitude;
          // str[1] =coordinates[0].longitude;

          console.log("test");

          // let str : string   = `${coordinates[0].latitude},${coordinates[0].longitude}`;
          resolve(coordinates);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
