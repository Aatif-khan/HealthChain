import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";
import { ToastController } from "ionic-angular";
import { ApiProvider } from "../../../providers/api/api";
import {
  APIName,
  showToast
} from "../../../providers/commonfunction/commonfunction";
import { LoginPage } from "../login/login";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  public ordertype: any = "Home";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public api: ApiProvider,
    public menuController: MenuController
  ) {}

  account: {
    userName: string;
    userPassword: string;
    confirmPassword: string;
    roleId: string;
    perFname: string;
    perLname: string;
    userEmail: string;
    perContactNumber: string;
    deviceToken: string;
    deviceID: string;
    deviceType: string;
    unique_ID: string;
    otp: string;
  } = {
    userName: "",
    userPassword: "",
    confirmPassword: "",
    roleId: "",
    perFname: "",
    perLname: "",
    userEmail: "",
    perContactNumber: "",
    otp: "",
    unique_ID: "",
    deviceToken: "12345678902",
    deviceID: "12345678902",
    deviceType: "Android"
  };
  ionViewDidLoad() {
    console.log("ionViewDidLoad SigninPage");
    this.menuController.swipeEnable(false);
  }
  doSignup() {
    var emailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\",this.toastCtrl);)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.account.userName.length == 0) {
      showToast("Please Enter User name", this.toastCtrl);
      return;
    } else if (this.account.userPassword.length == 0) {
      showToast("Please Enter Password", this.toastCtrl);
      return;
    } else if (this.account.confirmPassword.length == 0) {
      showToast("Please Confirm your Password", this.toastCtrl);
      return;
    } else if (this.account.roleId.length == 0) {
      showToast("Please Select UserType", this.toastCtrl);
      return;
    } else if (this.account.confirmPassword != this.account.userPassword) {
      showToast("Password does not match", this.toastCtrl);
      return;
    } else if (this.account.perFname.length == 0) {
      showToast("Please Enter First Name", this.toastCtrl);
      return;
    } else if (this.account.perLname.length == 0) {
      showToast("Please Enter Last Name", this.toastCtrl);
      return;
    } else if (this.account.userEmail.length == 0) {
      showToast("Please Enter Email Address", this.toastCtrl);
      return;
    } else if (!emailValidation.test(this.account.userEmail)) {
      showToast("Please Enter valid Email Address", this.toastCtrl);
      return;
    } else if (this.account.perContactNumber.length == 0) {
      showToast("Please Enter Phone Number", this.toastCtrl);
      return;
    } else if (this.account.otp.length == 0) {
      showToast("Please Enter correct otp", this.toastCtrl);
      return;
    }

    this.callWebserviceSignup();
    // this.api.wsPostHeader(APIName.signup, this.account).then(resp => {
    //   console.log("Respomse : " + resp);
    //   const myObjStr = JSON.stringify(resp);
    //   console.log("response:" + myObjStr);

    //   console.log("response:" + resp.status);
    //   if (resp.status === "Success") {
    //     showToast("User Ragistation Is Succesfull", this.toastCtrl);
    //     console.log("sucess" + resp.message);
    //     //this.navCtrl.push(LoginPage);
    //   }

    //   //  else if(resp.status=="Error")
    //   //  {
    //   //    console.log("error message call");
    //   //    console.log(resp.message);
    //   //      showToast( resp.message, this.toastCtrl)
    //   //   }
    //   else {
    //     console.log(resp.message);
    //   }
    // });
  }

  getOtp() {
    console.log("Get otp method called");

    let data1 = JSON.stringify({
      perContactNumber: this.account.perContactNumber
    });

    this.api.wsPostHeader(APIName.otpuser, data1).then((resp: any) => {
      console.log("Phone Number" + this.account.perContactNumber);
      if (resp.status === 500) {
        console.log(resp.error.message);
        // console.log("responseeeee:   " + resp);

        showToast(resp.error.message, this.toastCtrl);
      } else {
        // showToast("" + resp.message, this.toastCtrl);
        console.log("otp message" + resp.message);
        // this.transactionHistorycount = resp.data.totalNumber;
        // this.navCtrl.pop();
      }
    });
  }

  callWebserviceSignup() {
    console.log("method called");
    // Attempt to login in through our User service
    this.api.http.post(APIName.signup, this.account).subscribe((resp: any) => {
      // console.log("service:::::::;;")
      // console.log("kukadiya" +resp);
      if (resp.status == "Success") {
        showToast("User Ragistation Is Succesfull", this.toastCtrl);
        //  console.log("sucess"+resp.message)
        //this.navCtrl.push(LoginPage);
      } else {
        //  console.log("response:"+resp.message);
        showToast(resp.message, this.toastCtrl);
      }

      // this.navCtrl.pop();
    });
  }

  doLogin() {
    this.navCtrl.pop();
  }
}
