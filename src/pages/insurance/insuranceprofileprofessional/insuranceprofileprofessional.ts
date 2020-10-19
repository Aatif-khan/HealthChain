import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { APIName, showToast } from '../../../providers/commonfunction/commonfunction';

/**
 * Generated class for the InsuranceprofileprofessionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insuranceprofileprofessional',
  templateUrl: 'insuranceprofileprofessional.html',
})
export class InsuranceprofileprofessionalPage {

  public selectedLocation;

  associatedDepartment: string =""
  associatedLaboratory: string =""
  associatedDoctor: string =""
  associatedMedical: string =""
  associatedDisease: string =""


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ApiProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  public insuranceProfile: {
    associatedDepartmentList: string[],
    associatedLaboratoryList: string[],
    associatedDoctorList: string[],
    associatedMedicalList: string[],
    associatedDiseaseList: string[]
  } = {
      associatedDepartmentList: [],
      associatedLaboratoryList: [],
      associatedDoctorList: [],
      associatedMedicalList: [],
      associatedDiseaseList: [],
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiledemographicPage');
  }



  submitDetails() {

  }

  addtoListDepartment() {

    if(this.associatedDepartment.length==0){

      showToast("Please enter Department name",this.toastCtrl)
      return
    }

    this.insuranceProfile.associatedDepartmentList.push(this.associatedDepartment)
    this.associatedDepartment = ''
  }

  deleteelementDepartment(list: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure, you want to delete this Department?',
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
            let index = this.insuranceProfile.associatedDepartmentList.indexOf(list);

            if (index > -1) {
              this.insuranceProfile.associatedDepartmentList.splice(index, 1);
            }
            console.log('Item deleted');
          }
        }
      ]
    });
    alert.present();
   }



  addtoListLaboratory() {
    if(this.associatedLaboratory.length==0){

      showToast("Please enter Laboratory name",this.toastCtrl)
      return
    }
    this.insuranceProfile.associatedLaboratoryList.push(this.associatedLaboratory)
    this.associatedLaboratory = ''
  }

  deleteelementLaboratory(list: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure, you want to delete this Laboratory?',
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
            let index = this.insuranceProfile.associatedLaboratoryList.indexOf(list);

            if (index > -1) {
              this.insuranceProfile.associatedLaboratoryList.splice(index, 1);
            }
            console.log('Item deleted');
          }
        }
      ]
    });
    alert.present();
   }



  addtoListDisease() {
    if(this.associatedDisease.length==0){

      showToast("Please enter Disease name",this.toastCtrl)
      return
    }
    this.insuranceProfile.associatedDiseaseList.push(this.associatedDisease)
    this.associatedDisease = ''
  }

  deleteelementDisease(list: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure, you want to delete this Disease?',
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
            let index = this.insuranceProfile.associatedDiseaseList.indexOf(list);

            if (index > -1) {
              this.insuranceProfile.associatedDiseaseList.splice(index, 1);
            }
            console.log('Item deleted');
          }
        }
      ]
    });
    alert.present();

  }

  addtoListMedical() {
    if(this.associatedMedical.length==0){

      showToast("Please enter Medical name",this.toastCtrl)
      return
    }
    this.insuranceProfile.associatedMedicalList.push(this.associatedMedical)
    this.associatedMedical = ''
  }

  deleteelementMedical(list: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure, you want to delete this Medical?',
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
            let index = this.insuranceProfile.associatedMedicalList.indexOf(list);

            if (index > -1) {
              this.insuranceProfile.associatedMedicalList.splice(index, 1);
            }
            console.log('Item deleted');
          }
        }
      ]
    });
    alert.present();

  }



  addtoListDoctor() {
    if(this.associatedDoctor.length==0){

      showToast("Please enter Doctor name",this.toastCtrl)
      return
    }
    this.insuranceProfile.associatedDoctorList.push(this.associatedDoctor)
    this.associatedDoctor = ''
  }

  deleteelementDoctor(list: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure, you want to delete this Doctor?',
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
            let index = this.insuranceProfile.associatedDoctorList.indexOf(list);

            if (index > -1) {
              this.insuranceProfile.associatedDoctorList.splice(index, 1);
            }
            console.log('Item deleted');
          }
        }
      ]
    });
    alert.present();

  }

}
