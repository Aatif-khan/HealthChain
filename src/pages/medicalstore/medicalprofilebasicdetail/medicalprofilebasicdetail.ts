import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { showToast, APIName } from '../../../providers/commonfunction/commonfunction';
import { ApiProvider } from '../../../providers/api/api';
/**
 * Generated class for the MedicalprofilebasicdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicalprofilebasicdetail',
  templateUrl: 'medicalprofilebasicdetail.html',
})
export class MedicalprofilebasicdetailPage {

  secondaryEmail: string

  emailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\",this.toastCtrl);)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  nameValidation = /[^a-zA-Z]/;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, public api: ApiProvider, public alertctrl: AlertController) {
  }

  public profileMedical: {
    medicalEmailLists: string[],
    medicalID: string, medicalName: string, medicalEmailPrimary: string
  } = {
      medicalEmailLists: [],
      medicalID: '',
      medicalName: '',
     medicalEmailPrimary: ''
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientprofileMedicalPage');
  //  this.getPersonalData()
  }

  submitDetails() {


    // if (this.profileMedical.username.length == 0) {
    //   showToast("Please Enter User name", this.toastCtrl);
    //   return
    // }
    // if (this.nameValidation.test(this.profileMedical.userName)) {
    //   showToast("Please Enter valid username", this.toastCtrl);
    //   return
    // }
    if (this.profileMedical.medicalName.length == 0) {
      showToast("Please Enter Pharmacyname", this.toastCtrl);
      return
    }
    else if (this.nameValidation.test(this.profileMedical.medicalName)) {
      showToast("Please Enter valid Pharmacyname", this.toastCtrl);
      return
    }
   
   else if (this.profileMedical.medicalEmailPrimary.length == 0) {
      showToast("Please Enter email", this.toastCtrl);
      return
    }
    else if (!this.emailValidation.test(this.profileMedical.medicalEmailPrimary)) {
      showToast("Please Enter valid Email Address", this.toastCtrl);
      return
    }
    //this.callWebserviceUpdatePersonalDetails()
  }

  getPersonalData() {
    this.api.wsPostHeader(APIName.getPersonalPatientProfile, '')
      .then((resp: any) => {
        if(resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        }
        else
        {
        console.log("getPersonalData >> ", resp)

        this.profileMedical.medicalID = resp.medicalID
        this.profileMedical.medicalName = resp.medicalName
        this.profileMedical.medicalEmailPrimary = resp.medicalEmailPrimary
        if (resp.medicalEmailLists[0] != null && resp.medicalEmailLists[0] != '[]') {
          this.profileMedical.medicalEmailLists = resp.medicalEmailLists
        }
      }
      });
  }

  callWebserviceUpdatePersonalDetails() {
    this.api.wsPostHeader(APIName.updatePersonalPatientProfile, this.profileMedical)
      .then((resp: any) => {
        if(resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        }
        else
        {
        showToast(resp.message, this.toastCtrl)
        }
      });
  }

  addtoList() {
    if (!this.emailValidation.test(this.secondaryEmail)) {
      showToast("Please Enter valid Email Address", this.toastCtrl);
      return
    }
    this.profileMedical.medicalEmailLists.push(this.secondaryEmail)
    this.secondaryEmail = ""
  }

  deleteelement(list: any) {
    let alert = this.alertctrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure, you want to delete this email?',
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
            let index = this.profileMedical.medicalEmailLists.indexOf(list);

            if (index > -1) {
              this.profileMedical.medicalEmailLists.splice(index, 1);
            }
            console.log('Item deleted');
          }
        }
      ]
    });
    alert.present();

  }

}
