import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { APIName } from '../../../providers/commonfunction/commonfunction'
import { ApiProvider } from '../../../providers/api/api';
import { ValidationProvider } from '../../../providers/validation/validation';
import { FormBuilder, Validators} from '@angular/forms';
/**
 * Generated class for the PatientadmitformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patientadmitform',
  templateUrl: 'patientadmitform.html',
})
export class PatientadmitformPage {
  PatientAdmitForm:any=[];
  patientAdmitFormvalidation:any;
  doctors:any=[];
  Wards:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider,private formBuilder: FormBuilder) {
    this.patientAdmitFormvalidation = this.formBuilder.group({
      'patientName': ['', [Validators.required]],
      'admitDate': ['', [Validators.required]],
      'admitTime': ['', []],
      'admitTimeTo': ['', []],
      'doctorName': ['', []],
      'symptomsFound': ['', [Validators.required]],
      'treatmentProvided': ['', [Validators.required]],
      'diseaseName': ['', [Validators.required]],
      'medicine': ['', [Validators.required]],
      'reportTaken': ['', [Validators.required]],
      'warDetail': ['', [Validators.required]],
      'operationDetail': ['', [Validators.required]],
      'extraDetail': ['', []]

    });
    this.api.wsPostHeader(APIName.getAllDoctor,'').then((resp:any) => {
      if(resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      }
      else
      {
      let response:any=resp;
      this.doctors=response.data;
      this.PatientAdmitForm.doctorName= this.doctors[0].providerID;
      }
   });
   this.PatientAdmitForm.warDetail= "0";
//  this.api.wsPostHeader(APIName.getAllDoctor,'').then((resp:any) => {
//   let response:any=resp;
//   this.Wards=response.data;
//this.PatientAdmitForm.warDetail= this.Wards[0].providerID;
//  });
  }

  ionViewDidLoad() 
  {
    
  }
  Submit()
  {
    this.api.wsPostHeader('',this.PatientAdmitForm).then((resp:any) => {
      if(resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      }
      else
      {
       console.log('wsPostHeader : >>',resp);
      }
    });
  }
  Cancel()
  {

  }
}
