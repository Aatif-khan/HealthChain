import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  Events,
  MenuController,
  LoadingController
} from "ionic-angular";
import { AlertController } from "ionic-angular";

import { SignupPage } from "../signup/signup";
import { ForgotpasswordPage } from "../forgotpassword/forgotpassword";

import { ApiProvider } from "../../../providers/api/api";
import {
  showToast,
  username,
  password,
  selectedRole,
  APIName,
  perProfile
} from "../../../providers/commonfunction/commonfunction";
import { ActionSheetController } from "ionic-angular";
import { DashBoardForDoctorPage } from "../../doctor/dash-board-for-doctor/dash-board-for-doctor";
import { DashBoardForPatientPage } from "../../patient/dash-board-for-patient/dash-board-for-patient";
import { LaboratorydashboardPage } from "../../laboratory/laboratorydashboard/laboratorydashboard";
import { AddappointmentPage } from "../../patient/addappointment/addappointment";
import { PharmadeliveredPage } from "../../pharmadelivered/pharmadelivered";
import { DashBoardForMedicalstorePage } from "../../medicalstore/dash-board-for-medicalstore/dash-board-for-medicalstore";
import { Network } from "@ionic-native/network";
import { FCM } from "@ionic-native/fcm";

import { GooglePlus } from "@ionic-native/google-plus";
import { AngularFireModule } from "angularfire2";
import firebase  from "firebase";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  users: any;
  // public selectedRole:string;
  public objectdata: any = [];
  public account: {
    username: string;
    password: string;
    perProfile: string;
    deviceToken: string;
    deviceID: string;
    deviceType: string;
  } = {
    username: "",
    password: "",
    perProfile: "",
    deviceToken: "12345678902",
    deviceID: "12345678902",
    deviceType: "IOS"
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public events: Events,
    public menuController: MenuController,
    private network: Network,
    public fcm: FCM,
    public googleplus:GooglePlus,
    
  ) {
    // this.navCtrl.push(AddappointmentPage);
  }

  googlelogin()
  {
    console.log("google response");
 
    this.googleplus.login({
      "webClientId":"401030294796-e0u3es1vc1fofj3ra03rhms7g722av1k.apps.googleusercontent.com",
      "offline":true
    }).then(res=>{

     
      console.log("google response" + JSON.stringify(res));
      // alert("google response" +res);

      // firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      // .then(suc=>{
      //   alert("LOGIN SUCCESS");
      // })
      // .catch(NS=>{
      //   alert("NOT LOGIN SUCCESS");
      // })
    })
  }
  presentActionSheet(responseDataForButton: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Login as",
      buttons: this.createButtons(responseDataForButton)
    });

    actionSheet.present();
  }

  createButtons(possibleButtons: any) {
    let buttons = [];
    for (var index in possibleButtons) {
      let button = {
        text: possibleButtons[index],
        handler: () => {
          // localStorage.setItem(selectedRole, 'Doctor');
          localStorage.setItem(selectedRole, buttons[index].text);
          // console.log( 'selectedRole = ' + localStorage.getItem(selectedRole))
          console.log(
            "selectedRole in login = " + localStorage.getItem(selectedRole)
          );
          // selectedRole = possibleButtons[index].text
          if (localStorage.getItem(selectedRole) == "Doctor") {
            this.navCtrl.setRoot(DashBoardForDoctorPage);
          } else {
            this.navCtrl.setRoot(DashBoardForPatientPage);
          }
          this.events.publish("user:created", Date.now());
          return true;
        }
      };
      buttons.push(button);
    }
    return buttons;
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: "Login Failed",
      subTitle: "User not found",
      buttons: ["OK"]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
    this.menuController.swipeEnable(false);
  }
  openNav() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    // this.account.username = "arpit";
    // this.account.password = "arpit";
    if (this.account.username.length == 0) {
      showToast("Please Enter User name", this.toastCtrl);
      return;
    } else if (this.account.password.length == 0) {
      showToast("Please Enter Password", this.toastCtrl);
      return;
    }
    localStorage.setItem(username, this.account.username);
    localStorage.setItem(password, this.account.password);

    let body = {
      deviceToken: Math.random(),
      deviceID: Math.random(),
      deviceType: "Android"
    };

    this.api.wsPostHeader(APIName.login, body).then(resp => {
      console.log("Respomse : " + resp);
      const myObjStr = JSON.stringify(resp);
      console.log("response:" + myObjStr);

      //  console.log("response:"+resp.status);

      if (!resp) {
        console.log("call this");
        showToast("Please Enter Right Password or Username", this.toastCtrl);
      } else if (resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      } else {
        console.log("wsPostHeader :hellooooo >>", typeof resp);
        this.objectdata = resp;
        if (
          typeof resp != "undefined" &&
          this.objectdata.data.data.length == 1
        ) {
          console.log("selectedRole===>", this.objectdata.data.data[0]);

          localStorage.setItem(perProfile, this.objectdata.data.perProfile);

          localStorage.setItem(selectedRole, this.objectdata.data.data[0]);

          // localStorage.setItem(username, this.objectdata.data.name);

          localStorage.setItem("fcmid", this.objectdata.data.id);
          if (localStorage.getItem(selectedRole) == "Doctor") {
            this.menuController.swipeEnable(true);
            this.navCtrl.setRoot(DashBoardForDoctorPage);
          } else if (localStorage.getItem(selectedRole) == "Laboratory") {
            this.menuController.swipeEnable(true);
            this.navCtrl.setRoot(LaboratorydashboardPage);
          } else if (localStorage.getItem(selectedRole) == "MedicalCenter") {
            this.menuController.swipeEnable(true);
            this.navCtrl.setRoot(DashBoardForMedicalstorePage);
          } else {
            this.menuController.swipeEnable(true);
            this.navCtrl.setRoot(DashBoardForPatientPage);
          }
          this.events.publish("user:created", Date.now());
        } else if (
          typeof resp != "undefined" &&
          this.objectdata.data.data.length > 1
        ) {
          this.presentActionSheet(this.objectdata.data.data);
        } else {
          showToast(
            "No Role assign to you , Please contact admin",
            this.toastCtrl
          );
        }
      }
    });
  }

  gotosignup() {
    this.navCtrl.push(SignupPage);
  }
  gotoforgotpassword() {
    this.navCtrl.push(ForgotpasswordPage);
  }
}
