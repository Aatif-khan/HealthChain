import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { showToast, APIName } from '../../../providers/commonfunction/commonfunction';

/**
 * Generated class for the LabprofileprofessionalinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-labprofileprofessionalinfo',
  templateUrl: 'labprofileprofessionalinfo.html',
})
export class LabprofileprofessionalinfoPage {

  mobileNumberValidation = /^[0-9]{10}$/;
  isShow: boolean = false;
  public selectedLocation;

  associatedReport: string;
  associatedMedicine: string;
  associatedDoctor: string;

  AllLabData: any = [];
  TempDisease: any = [];
  dataRes: any = [];
  AllDoctor: any = [];
  AllMedicine:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ApiProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {

  }

  public professionalProfile: {
    fclProviderMap: any,
    labReportsLevel1: any, drugCompoundMaster: string[], doctor: string[]

  } = {
      fclProviderMap: '',
      labReportsLevel1: [],
      drugCompoundMaster: [],
      doctor: [],
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabprofileprofessionalinfoPage');
    this.getProfessionalData()
    //  this.getAllLab()
  }

  getProfessionalData() {
    this.api.wsPostHeader(APIName.getLabProfileProfessionalData, '')
      .then((res: any) => {
        if(res.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        }
        else
        {
        this.professionalProfile.fclProviderMap = res.data.fclProviderMap;
        console.log("fclProviderMap is id ", res.data.fclProviderMap);
        console.log("location name is", res.data.locationName);
        console.log("Professional data is", res.data);
        console.log("Professional labReportLevel1ID is", res.data.labReportLevel1ID);
        this.professionalProfile.labReportsLevel1 = res.data.labReportLevel1ID;
        this.professionalProfile.doctor = res.data.doctor;
        }
      });
  }

  filterassociatedreport(searchTerm) {
    var empty: any[];

    var data = {
      lrl1Name: this.associatedReport
    }
    this.api.wsPostHeaderBackground(APIName.getalllabreportbyparamter, data)
      .then((resp: any) => {
        this.AllLabData = resp.data
        if (this.associatedReport == "") {
          return this.AllLabData = empty;
        }
      })
  }

  filterassociateddoctor(searchTerm) {
    var empty: any[];

    var data = {
      DoctorName: this.associatedDoctor
    }
    this.api.wsPostHeaderBackground(APIName.getalldoctorbyparameter, data)
      .then((resp: any) => {
        this.AllDoctor = resp.data
        if (this.associatedDoctor == "") {
          return this.AllDoctor = empty;
        }
      })
  }

  filterassociatedmedicine(searchTerm) {
    var empty: any[];

    var data = {
      drugCompoundName: this.associatedMedicine
    }
    this.api.wsPostHeaderBackground(APIName.getallmedicinebyparameter, data)
      .then((resp: any) => {
        this.AllMedicine = resp.data
        if (this.associatedMedicine == "") {
          return this.AllMedicine = empty;
        }
      })
  }

  getReportId(id: any) {
    console.log("id is>>>>>>", id.labReportLevel1ID)
    console.log(this.professionalProfile.labReportsLevel1)
      // alert(this.containsObject(id.labReportLevel1ID, this.professionalProfile.labReportsLevel1))
    if (this.containsObject(id.labReportLevel1ID, this.professionalProfile.labReportsLevel1)) {

      showToast("Your report is already present in the list", this.toastCtrl)
    } else {
      this.professionalProfile.labReportsLevel1.push(id)
    }
  }

  getDoctorId(d: any) {
    //  console.log("doctor object is like>>>>>>",d)
    if (this.containsObjectDoctor(d.fclProviderMapID, this.professionalProfile.doctor)) {

      showToast("Your report is already present in the list", this.toastCtrl)
    } else {
      this.professionalProfile.doctor.push(d)
    }
  }

  getMedicineId(d: any) {
    //  console.log("doctor object is like>>>>>>",d)
    if (this.containsObjectMedicine(d.drugCompoundID, this.professionalProfile.drugCompoundMaster)) {

      showToast("Your report is already present in the list", this.toastCtrl)
    } else {
      this.professionalProfile.drugCompoundMaster.push(d)
    }
  }
  
  containsObjectMedicine(obj, list) {
    var i;
    var result = list.map(a => a.drugCompoundID);
    for (i = 0; i < result.length; i++) {
      // console.log("a is" + result[i])
      // console.log("obj is" + obj)
      if (result[i] == obj) {
        return true;
      } else {

      }
    }
    return false;
  }

  containsObjectDoctor(obj, list) {
    var i;
    var result = list.map(a => a.fclProviderMapID);
    for (i = 0; i < result.length; i++) {
      // console.log("a is" + result[i])
      // console.log("obj is" + obj)
      if (result[i] == obj) {
        return true;
      } else {

      }
    }
    return false;
  }

  containsObject(obj, list) {
    var i;
    var result = list.map(a => a.labReportLevel1ID);
    for (i = 0; i < result.length; i++) {
      // console.log("a is" + result[i])
      // console.log("obj is" + obj)
      if (result[i] == obj) {
        return true;
      } else {
      }
    }
    return false;
  }

  submitDetails() {

    //  console.log("SUBMITT::---- " + JSON.stringify(this.professionalProfile));
    this.api.wsPostHeader(APIName.updateProfessionalLaboratoryProfile, this.professionalProfile)
      .then((res: any) => {
        if(res.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        }
        else
        {
        showToast(res.message, this.toastCtrl)
        console.log("Details of Lab Professional data is submitted", res.message)
        }
      })
  }

  deleteElementReport(list: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure, you want to delete this report?',
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
            let index = this.professionalProfile.labReportsLevel1.indexOf(list);

            if (index > -1) {
              this.professionalProfile.labReportsLevel1.splice(index, 1);
            }
            console.log('Item deleted');
          }
        }
      ]
    });
    alert.present();
  }

  deleteElementDoctor(list: any) {
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
            let index = this.professionalProfile.doctor.indexOf(list);

            if (index > -1) {
              this.professionalProfile.doctor.splice(index, 1);
            }
            console.log('Item deleted');
          }
        }
      ]
    });
    alert.present();

  }

  /* addtoListMedicine() {
    if (this.associatedMedicine == '' || this.associatedMedicine == null) {
      showToast("Please enter valid medicine", this.toastCtrl)
      return;
    }
    this.professionalProfile.associatedMedicineList.push(this.associatedMedicine)
    this.associatedMedicine = ''
  }

  deleteElementMedicine(list: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure, you want to delete this medicine?',
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
            let index = this.professionalProfile.associatedMedicineList.indexOf(list);

            if (index > -1) {
              this.professionalProfile.associatedMedicineList.splice(index, 1);
            }
            console.log('Item deleted');
          }
        }
      ]
    });
    alert.present();

  }

  addtoListDoctor() {
    if (this.associatedDoctor == '' || this.associatedDoctor == null) {
      showToast("Please enter valid doctor", this.toastCtrl)
      return;
    }
    this.professionalProfile.associatedDoctorList.push(this.associatedDoctor)
    this.associatedDoctor = ''
  }

   */

  /* getAllLab() {
   this.api.wsPostHeaderBackground(APIName.getAllLab, '').then((resp: any) => {


     for (var item1 in resp.data) {

       for (var subitem in resp.data[item1]) {

         if (subitem == "data") {

           //   console.log("all data===>",JSON.stringify(resp.data[item1][subitem]));
           for (var bro in resp.data[item1][subitem]) {
             //    console.log("hellollsdlkfjsld===>", JSON.stringify(resp.data[item1][subitem][bro]));
             var obj = resp.data[item1][subitem][bro];
             //    console.log('greate akkikkkk====>', obj);
             this.dataRes.push(resp.data[item1][subitem][bro]);

           }

         }

       }
     }
     //  console.log("final data===>", JSON.stringify(this.removeDuplicates(this.dataRes, 'labReportLevel1ID')));
     this.dataRes = this.removeDuplicates(this.dataRes, 'labReportLevel1ID');

   });
 }

 removeDuplicates(myArr, prop) {
   return myArr.filter((obj, pos, arr) => {
     return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
   });
 } */

  /* filterlist(searchTerm) {

    this.AllLabData = this.dataRes;
    let tempdata = this.AllLabData;

    var empty: any[];
    this.AllLabData = tempdata.filter((tempdata) => {
      if (this.associatedReport.trim() == "") {
        return empty;
      }
      return (tempdata.lrl1Name.toLowerCase().indexOf(this.associatedReport.trim().toLowerCase()) > -1);
    })

  } */
  /*  omit_special_char(event) {
     var k;
     k = event.charCode; 
     console.log("k is",k) //         k = event.keyCode;  (Both can be used)
     return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 32 || k == 8);
   } */
}