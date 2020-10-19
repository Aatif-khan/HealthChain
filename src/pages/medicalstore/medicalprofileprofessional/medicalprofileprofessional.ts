import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { APIName, showToast } from '../../../providers/commonfunction/commonfunction';

/**
 * Generated class for the MedicalprofileprofessionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicalprofileprofessional',
  templateUrl: 'medicalprofileprofessional.html',
})
export class MedicalprofileprofessionalPage {
  mobileNumberValidation = /^[0-9]{10}$/;


  public selectedLocation;

  associatedPharmacy: string
  associatedHospital: string

  associatedDoctor: string

 

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ApiProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  public professionalProfile: {
    associatedPharmacyList: string[],    associatedHospitalList: string[],  associatedDoctorList: string[]

    } = {
      associatedPharmacyList: [],
      associatedHospitalList: [],
      associatedDoctorList: [],
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiledemographicPage');
  }

  

  submitDetails() {

  }

  addtoListPharmacy() {
  
    this.professionalProfile.associatedPharmacyList.push(this.associatedPharmacy)
    this.associatedPharmacy = ''
  }

  deleteelementPharmacy(list: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure, you want to delete this Pharmacy?',
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
            let index = this.professionalProfile.associatedPharmacyList.indexOf(list);

            if (index > -1) {
              this.professionalProfile.associatedPharmacyList.splice(index, 1);
            }
            console.log('Item deleted');
          }
        }
      ]
    });
    alert.present();

  

  }



  addtoListHospital() {
  
    this.professionalProfile.associatedHospitalList.push(this.associatedHospital)
    this.associatedHospital = ''
  }

  deleteelementHospital(list: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure, you want to delete this Hospital?',
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
            let index = this.professionalProfile.associatedHospitalList.indexOf(list);

            if (index > -1) {
              this.professionalProfile.associatedHospitalList.splice(index, 1);
            }
            console.log('Item deleted');
          }
        }
      ]
    });
    alert.present();

  }

  addtoListDoctor() {
  
    this.professionalProfile.associatedDoctorList.push(this.associatedDoctor)
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
            let index = this.professionalProfile.associatedDoctorList.indexOf(list);

            if (index > -1) {
              this.professionalProfile.associatedDoctorList.splice(index, 1);
            }
            console.log('Item deleted');
          }
        }
      ]
    });
    alert.present();

  }

}
