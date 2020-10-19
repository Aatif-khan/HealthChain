import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { Base64 } from '@ionic-native/base64';
import { FileChooser } from '@ionic-native/file-chooser';
import { showToast } from '../../../providers/commonfunction/commonfunction';
import { DocumentPicker } from '@ionic-native/document-picker';

/**
 * Generated class for the PatientaddinsurancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patientaddinsurance',
  templateUrl: 'patientaddinsurance.html',
})
export class PatientaddinsurancePage {

  public filename;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private fileChooser: FileChooser,
    public filePath: FilePath,
    public platform: Platform,
    public base: Base64,
    public docPicker:DocumentPicker) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientaddinsurancePage');
    this.insurance.status = this.statusoptions[0].statusname
  }

  public insurance: {
    planname: string, companyname: string, coverage: string, years: string,
    status: string, additionaldetail: string
  } = {
      planname: '',
      companyname: '',
      coverage: '',
      years: '',
      status: '',
      additionaldetail: ''
    }

  statusoptions = [{
    statusname: "Claimed"
  },
  {
    statusname: "Rejected"
  },
  {
    statusname: "Taken"
  }]

  addinsurance() {

    if (this.insurance.planname.length == 0) {
      showToast('Please Enter Plan Name', this.toastCtrl)
      return
    }
    else if (this.insurance.companyname.length == 0) {
      showToast('Please Enter Company Name', this.toastCtrl)
      return
    }
    else if (this.insurance.coverage.length == 0) {
      showToast('Please Enter Covergae', this.toastCtrl)
      return
    }
    else if (this.insurance.years.length == 0) {
      showToast('Please Enter years', this.toastCtrl)
      return
    }
    else if (this.insurance.status.length == 0) {
      showToast('Please select status', this.toastCtrl)
      return
    }
    else if (this.insurance.additionaldetail.length == 0) {
      showToast('Please add additional details', this.toastCtrl)
      return
    }
    else if (this.filename == null) {
      showToast('Please choose file', this.toastCtrl)
      return
    }
    console.log("data is " + this.insurance.planname);
    console.log("data is " + this.insurance.companyname);
    console.log("data is " + this.insurance.coverage);
    console.log("data is " + this.insurance.years);
    console.log("data is " + this.insurance.status);
    console.log("data is " + this.insurance.additionaldetail);
  }
  choosedocument() {
    if (this.platform.is('ios')) {
      console.log('this is ios');
      alert('this is ios');

      this.docPicker.getFile('all')
        .then(uri => {
          console.log('uri of file is===>', uri)
          this.convertToBase64(uri)
        })
        .catch(e => console.log(e));
    } else {
      this.fileChooser.open().then((uri) => {

        this.filePath.resolveNativePath(uri)
          .then((filePath) => {
            //   alert(filePath)

            let currentName = filePath.substring(filePath.lastIndexOf('/') + 1);
            console.log("current name========= " + currentName)
            this.filename = currentName
            this.convertToBase64(filePath)
          }, (err) => {
            console.log(err);
          })
      }, (err) => {
        console.log(err);
      });
    }
  }
  convertToBase64(filePath) {
    let path: string = filePath;
    console.log('File Path in CovertToBase64 is>>>>>', path);
    this.base.encodeFile(filePath).then((base64File: string) => {
      console.log(base64File);
    }, (err) => {
      console.log(err);
    });
  }
}
