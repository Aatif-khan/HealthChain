import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ApiProvider } from '../../../providers/api/api';
import { APIName } from '../../../providers/commonfunction/commonfunction';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, public api: ApiProvider, public menuController: MenuController) {
  }
  account: { userEmail: string } = {
    userEmail: ''
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
    this.menuController.swipeEnable(false)
  }

  sendemail() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.account.userEmail.length == 0) {
      this.showError("Please Enter Email Address")
      return
    }
    else if (!re.test(this.account.userEmail)) {
      this.showError("Please Enter valid Email Address")
      return
    }

    this.api.http.post(APIName.forgotpassword, this.account).subscribe((resp: any) => {
      console.log("status", resp.status);
      let alert = this.toastCtrl.create({
        message: resp.message,
        duration: 3000,
        position: "bottom"
      });
      alert.present()
      console.log("status", resp.message);
      console.log("status", resp.data);
      this.navCtrl.push(LoginPage)
    });
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  showError(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
