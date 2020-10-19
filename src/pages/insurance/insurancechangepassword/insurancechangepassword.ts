import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { ApiProvider } from '../../../providers/api/api';
import { showToast, APIName } from '../../../providers/commonfunction/commonfunction';
/**
 * Generated class for the InsurancechangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insurancechangepassword',
  templateUrl: 'insurancechangepassword.html',
})
export class InsurancechangepasswordPage {

  currentPwd: any;
  newPwd: any;
  confirmPwd: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  changePasswordBtn() {
    if (this.currentPwd == "" || this.currentPwd == undefined) {
      showToast("Please enter current password", this.toastCtrl);
    } else if (this.currentPwd.length < 6) {
      showToast("Current passwords must be at least 6 characters long", this.toastCtrl);
    } else if (this.newPwd == "" || this.newPwd == undefined) {
      showToast("Please enter new password", this.toastCtrl);
    } else if (this.newPwd.length < 6) {
      showToast("New passwords must be at least 6 characters long", this.toastCtrl);
    } else if (this.newPwd == this.currentPwd) {
      showToast("Current password and New password should not be match", this.toastCtrl);
    } else if (this.confirmPwd == "" || this.confirmPwd == undefined) {
      showToast("Please enter confirm password", this.toastCtrl);
    } else if (this.confirmPwd.length < 6) {
      showToast("Confirm passwords must be at least 6 characters long", this.toastCtrl);
    } else if (this.newPwd != this.confirmPwd) {
      showToast("New password and Confirm password does not match", this.toastCtrl);
    }
    else {
      let param = {
        "oldPassword": this.currentPwd,
        "userPassword": this.newPwd,
      }
      this.callChangePasswordService(param)
    }

  }
  callChangePasswordService(param: any) {
    this.api.wsPostHeader(APIName.changePassword, param)
      .then((resp: any) => {
        if(resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        }
        else
        {
        showToast(resp.message, this.toastCtrl)
        }
      })
  }

}
