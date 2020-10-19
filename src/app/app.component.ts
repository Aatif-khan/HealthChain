import { Component, ViewChild } from "@angular/core";
import {
  Nav,
  Platform,
  Events,
  NavController,
  ToastController,
  AlertController
} from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { PatientprofilePage } from "../pages/patient/patientprofile/patientprofile";
import { DoctorprofilePage } from "../pages/doctor/doctorprofile/doctorprofile";
import { AppointmentlistPage } from "../pages/patient/appointmentlist/appointmentlist";
import { DashBoardForDoctorPage } from "../pages/doctor/dash-board-for-doctor/dash-board-for-doctor";
import { DashBoardForPatientPage } from "../pages/patient/dash-board-for-patient/dash-board-for-patient";
import {
  selectedRole,
  username,
  perProfile,
  showToast,
  APIName
} from "../providers/commonfunction/commonfunction";
import { LoginPage } from "../pages/commonpages/login/login";
import { DoctorvisitlistPage } from "../pages/doctor/doctorvisitlist/doctorvisitlist";
import { PatientdoctorvisitlistPage } from "../pages/patient/patientdoctorvisitlist/patientdoctorvisitlist";
import { DoctorAddOrEditVisitPage } from "../pages//doctor/doctor-add-or-edit-visit/doctor-add-or-edit-visit";
import { PatientlabreportlistPage } from "../pages/patient/patientlabreportlist/patientlabreportlist";
import { PatienthospitaladmitlistPage } from "../pages/patient/patienthospitaladmitlist/patienthospitaladmitlist";
import { PatientinsurancelistPage } from "../pages/patient/patientinsurancelist/patientinsurancelist";
import { PatientclaimedinsurancelistPage } from "../pages/patient/patientclaimedinsurancelist/patientclaimedinsurancelist";
import { PatientmedicineboughtlistPage } from "../pages/patient/patientmedicineboughtlist/patientmedicineboughtlist";
import { LaboratorydashboardPage } from "../pages/laboratory/laboratorydashboard/laboratorydashboard";
import { LabreportPage } from "../pages/laboratory/labreport/labreport";
import { LabprofilePage } from "../pages/laboratory/labprofile/labprofile";
import { DashBoardForHospitalPage } from "../pages/hospital/dash-board-for-hospital/dash-board-for-hospital";
import { HospitalpatientadmitlistPage } from "../pages/hospital/hospitalpatientadmitlist/hospitalpatientadmitlist";
import { HospitalclaimedinsuranceincomingapporvallistPage } from "../pages/hospital/hospitalclaimedinsuranceincomingapporvallist/hospitalclaimedinsuranceincomingapporvallist";
import { DashBoardForInsurancePage } from "../pages/insurance/dash-board-for-insurance/dash-board-for-insurance";
import { InsuranceincomingclaimlistPage } from "../pages/insurance/insuranceincomingclaimlist/insuranceincomingclaimlist";
import { InsuranceplanlistPage } from "../pages/insurance/insuranceplanlist/insuranceplanlist";
import { DashBoardForMedicalstorePage } from "../pages/medicalstore/dash-board-for-medicalstore/dash-board-for-medicalstore";
import { IncomingmedicinerequiredlistPage } from "../pages/medicalstore/incomingmedicinerequiredlist/incomingmedicinerequiredlist";
import { TrackingPage } from "../pages/medicalstore/tracking/tracking";
import { PatientaddinsurancePage } from "../pages/patient/patientaddinsurance/patientaddinsurance";
import { LabaddreportPage } from "../pages/laboratory/labaddreport/labaddreport";
import { PatientadmitformPage } from "../pages/hospital/patientadmitform/patientadmitform";
import { PatienttrackingPage } from "../pages/patient/patienttracking/patienttracking";
import { AddbooklabPage } from "../pages/patient/addbooklab/addbooklab";
import { AddplanPage } from "../pages/insurance/addplan/addplan";
import { DoctorprofileextendedPage } from "../pages/doctor/doctorprofileextended/doctorprofileextended";
import { PatientprofileextendedPage } from "../pages/patient/patientprofileextended/patientprofileextended";
import { PatientbooklablistPage } from "../pages/patient/patientbooklablist/patientbooklablist";
import { LabincomingappoinmentPage } from "../pages/laboratory/labincomingappoinment/labincomingappoinment";
import { LabbookinglistPage } from "../pages/laboratory/labbookinglist/labbookinglist";
//import { Network } from '@ionic-native/network';
import { ForgotpasswordPage } from "../pages/commonpages/forgotpassword/forgotpassword";
import { PharmadeliveredPage } from "../pages/pharmadelivered/pharmadelivered";
import { AddPharmaAppointmentPage } from "../pages/patient/addpharmaappointment/addpharmaappointment";
import { PharmaAppointmentlistPage } from "../pages/patient/pharmaappointmentlist/pharmaappointmentlist";
import { PatientreportsPage } from "../pages/patientreports/patientreports";
import { ReportfeeslistPage } from "../pages/laboratory/reportfeeslist/reportfeeslist";
import { ListmedicineinventoryPage } from "../pages/listmedicineinventory/listmedicineinventory";
import { FCM } from "@ionic-native/fcm";
import { tokenKey } from "@angular/core/src/view";
import { ApiProvider } from "../providers/api/api";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { MapdemoPage } from "../pages/mapdemo/mapdemo";
import { AddresstopinmapPage } from "../pages/addresstopinmap/addresstopinmap";
import { VideoPage } from "../pages/video/video";
import { AddpinlocationPage } from "../pages/addpinlocation/addpinlocation";
import { PatientOrderDetailsPage } from "../pages/patient-order-details/patient-order-details";
// import { INotificationData } from "../../plugins/cordova-plugin-fcm-with-dependecy-updated/src/FCMPlugin.d";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string; component: any; icon: string }>;

  username: string;
  currantuser: string;
  profile: string;
  perProfile: string;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public fcm: FCM,
    public localNotifications: LocalNotifications,
    public api: ApiProvider,
    public events: Events //public network:Network
  ) {
    platform.ready().then(() => {
      //back button handle
      //Registration of push in Android and Windows Phone
      var lastTimeBackPress = 0;
      var timePeriodToExit = 2000;

      //login logout session manage by viral
      // this.username = localStorage.getItem(username);
      // this.currantuser =localStorage.getItem(this.currantuser);
      // console.log("print user name" +this.username);

      //   if(this.username!=null)
      //   {
      //     console.log("username not null");
      //     // this.nav.push(DashBoardForDoctorPage);
      //     this.nav.setRoot(DashBoardForDoctorPage);
      //     this.SetNavPages();

      //   }
      //   else{
      //     console.log("username null");
      //     // this.nav.push(LoginPage);
      //     this.nav.setRoot(LoginPage);
      //   }
      platform.registerBackButtonAction(() => {
        // get current active page
        let view = this.nav.getActive();
        if (view.component.name == "LoginPage") {
          //Double check to exit app
          //     if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
          //       this.platform.exitApp(); //Exit from app
          //     } else {
          //       let toast = this.toastCtrl.create({
          //         message: "Press back again to exit App",
          //         duration: 3000,
          //         position: "top"
          //       });
          //       toast.present();
          //       lastTimeBackPress = new Date().getTime();
          //     }
          //   } else {
          //     // go to previous page
          //     this.nav.pop({});
          //   }

          this.showAlert();
        } else {
          this.nav.pop();
        }
      });
    });
    this.initializeApp();

    events.subscribe("user:created", time => {
      this.username = localStorage.getItem(username);
      this.perProfile = localStorage.getItem(perProfile);
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log("Welcome", "at", time);
      this.SetNavPages();
      this.fcm.getToken().then(tokenN => {
        console.log("Get Token" + tokenN);
        alert("alertToken : " + tokenN);

        let body = {
          userID: localStorage.getItem("fcmid"),
          fcmtoken: tokenN
        };

        this.api.wsPostHeader(APIName.fcmbackend, body).then(resp => {
          console.log("Respomse : " + resp);
          const myObjStr = JSON.stringify(resp);
          console.log("response:" + myObjStr);
          // showToast("response : " + resp, this.toastCtrl);
        });
      });

      this.fcm.onNotification().subscribe(resp => {
        // showToast("on notification call " + resp, this.toastCtrl);
        console.log("on notification call : ");

        console.log("Respomse : " + resp);
        const myObjStr = JSON.stringify(resp);
        console.log("response:" + myObjStr);
        alert("on notification" + myObjStr);

        this.localNotifications.schedule({
          // id: 1,
          title: resp.title,
          text: resp.body
        });
        //this.singlenotification();
        // if (resp.wasTapped) {
        //   showToast("Received in background", this.toastCtrl);
        //   console.log("Received in background");
        // } else {
        //   showToast("Received in foreground", this.toastCtrl);
        //   console.log("Received in foreground");
        // }
      });

      this.fcm.onTokenRefresh().subscribe(tokenN => {
        console.log("Refresh Token" + tokenN);
        alert("alertToken : " + tokenN);

        let body = {
          userID: localStorage.getItem("fcmid"),
          fcmtoken: tokenN
        };

        this.api.wsPostHeader(APIName.fcmbackend, body).then(resp => {
          console.log("Respomse : " + resp);
          const myObjStr = JSON.stringify(resp);
          console.log("response:" + myObjStr);
          // showToast("response : " + resp, this.toastCtrl);
        });
      });
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Profile", component: PatientprofilePage, icon: "" },
      { title: "List Appointment", component: AppointmentlistPage, icon: "" }
    ];
  }

  singlenotification() {
    console.log("singlenotification call...");
    this.localNotifications.schedule({
      id: 1,
      text: "Single ILocalNotification",
      icon: "http://codesolution.co.in/assets/images/code/codeicon.png"
    });
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: "Exit?",
      message: "Do you want to exit the app?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            alert = null;
          }
        },
        {
          text: "Exit",
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }
  initializeApp() {
    this.statusBar.styleDefault();
    this.splashScreen.hide();

    // this.username = localStorage.getItem(username);
    // console.log("print user name" +this.username);

    //   if(this.username!=null)
    //   {
    //     console.log("username not null");
    //     // this.nav.push(DashBoardForDoctorPage);
    //     this.nav.setRoot(DashBoardForDoctorPage);

    //   }
    //   else{
    //     console.log("username null");
    //     // this.nav.push(LoginPage);
    //     this.nav.setRoot(LoginPage);
    //   }
    // });
  }
  SetNavPages() {
    console.log(
      "selectedRole in app.component = " + localStorage.getItem(selectedRole)
    );
    if (localStorage.getItem(selectedRole) == "Doctor") {
      this.pages = [
        {
          title: "Profile",
          component: DoctorprofilePage,
          icon: "assets/images/profile-ic.png"
        },
        {
          title: "Dashboard",
          component: DashBoardForDoctorPage,
          icon: "assets/images/dashboard.png"
        },
        {
          title: "Appointments",
          component: AppointmentlistPage,
          icon: "assets/images/doctor-apmnt.png"
        },
        {
          title: "Patient Visit",
          component: DoctorvisitlistPage,
          icon: "assets/images/patient visit.png"
        },
        {
          title: "Patient Report",
          component: PatientreportsPage,
          icon: "assets/images/patient visit.png"
        }
        //{ title: "Add Doctor Visit", component: DoctorAddOrEditVisitPage }
      ];
    } else if (localStorage.getItem(selectedRole) == "Laboratory") {
      // laboratory
      this.pages = [
        {
          title: "Lab Profile",
          component: LabprofilePage,
          icon: "assets/images/profile-ic.png"
        },
        {
          title: "Dashboard",
          component: LaboratorydashboardPage,
          icon: "assets/images/dashboard.png"
        },
        // {
        //   title: "video",
        //   component: VideoPage,
        //   icon: "assets/images/dashboard.png"
        // },
        {
          title: "Patient Report",
          component: LabreportPage,
          icon: "assets/images/patient-report.png"
        },
        {
          title: "Patient Appointments",
          component: LabincomingappoinmentPage,
          icon: "assets/images/patient-appointment.png"
        },
        {
          title: "Report Fees",
          component: ReportfeeslistPage,
          icon: "assets/images/patient-appointment.png"
        }
        // { title: "Patient Report", component: LabreportPage },
        // { title: "Patient Appointments", component: LabincomingappoinmentPage },
        // { title: "Lab Add Report", component: LabaddreportPage },
        // { title: "Lab Profile", component: LabprofilePage },
      ];
      // { title: 'Lab Booking List', component: LabbookinglistPage }];
    } else if (localStorage.getItem(selectedRole) == "Patient") {
      this.pages = [
        {
          title: "Profile",
          component: PatientprofilePage,
          icon: "assets/images/profile-ic.png"
        },
        {
          title: "Dashboard",
          component: DashBoardForPatientPage,
          icon: "assets/images/dashboard.png"
        },
        {
          title: "Dr. Appointment",
          component: AppointmentlistPage,
          icon: "assets/images/doctor-apmnt.png"
        },
        {
          title: "My Dr. Visit",
          component: PatientdoctorvisitlistPage,
          icon: "assets/images/doctor-visit.png"
        },
        {
          title: "Lab Appointment",
          component: PatientbooklablistPage,
          icon: "assets/images/lab-apmnt.png"
        },
        {
          title: "My Lab Report",
          component: PatientlabreportlistPage,
          icon: "assets/images/lab-report.png"
        },
        {
          title: "Order Medicine",
          component: AddPharmaAppointmentPage,
          icon: "assets/images/doctor-apmnt.png"
        },
        // {
        //   title: "Order Details",
        //   component: PatientOrderDetailsPage,
        //   icon: "assets/images/doctor-apmnt.png"
        // },

        {
          title: "My Order",
          component: PharmaAppointmentlistPage,
          icon: "assets/images/pharma-apmnt.png"
        }
        // {
        //   title: "Address Pin Location",
        //   component: AddpinlocationPage,
        //   icon: "assets/images/pharma-apmnt.png"
        // },
        // {
        //   title: "Pharma Delivered",
        //   component: PharmadeliveredPage,
        //   icon: "assets/images/pharma-delvry.png"
        // }

        // {
        //   title: "Map",
        //   component: MapdemoPage,
        //   icon: "assets/images/profile-ic.png"
        // },

        // {
        //   title: "AddresstoPinMap",
        //   component: AddresstopinmapPage,
        //   icon: "assets/images/profile-ic.png"
        // },
        // { title: 'Add Book Lab', component: AddbooklabPage }
      ];
      // { title: 'Hostpital Admit List', component: PatienthospitaladmitlistPage },
      // { title: 'Add Insurance', component: PatientaddinsurancePage },
      // { title: 'Insurance List', component: PatientinsurancelistPage },
      // { title: 'Claimed Insurance List', component: PatientclaimedinsurancelistPage },
      // { title: 'Medicine Bought List', component: PatientmedicineboughtlistPage },
      // { title: 'Tracking View', component: PatienttrackingPage }

      // hospital
      /*
          { title: 'Hospital Dashboard', component: DashBoardForHospitalPage },
          { title: 'Patient Admit List', component: HospitalpatientadmitlistPage },
          { title: 'Claimed Insurance List', component: HospitalclaimedinsuranceincomingapporvallistPage },
          { title: 'PatientAdmitForm', component: PatientadmitformPage },
          
          // insurance
          { title: 'Insurance Dashboard', component: DashBoardForInsurancePage },
          { title: 'Incoming Claim List', component: InsuranceincomingclaimlistPage },
          { title: 'Insurance Plan List', component: InsuranceplanlistPage },
          { title: 'Add Plan', component: AddplanPage },
          
          //medical store
          { title: 'Medical Store Dashboard', component: DashBoardForMedicalstorePage },
          { title: 'Incoming Medicine', component: IncomingmedicinerequiredlistPage },
          { title: 'Tracking', component: TrackingPage },
          */

      // Git Update

      // ];
      // } else {
    } else if (localStorage.getItem(selectedRole) == "MedicalCenter") {
      this.pages = [
        {
          title: "Dashboard",
          component: DashBoardForMedicalstorePage,
          icon: "assets/images/dashboard.png"
        },
        {
          title: "Medicine Request",
          component: IncomingmedicinerequiredlistPage,
          icon: "assets/images/pharma-apmnt.png"
        },
        // { title: "Tracking", component: TrackingPage },
        {
          title: "Pharma Deliverd",
          component: PharmadeliveredPage,
          icon: "assets/images/pharma-delvry.png"
        },
        {
          title: "List Medicine Inventory",
          component: ListmedicineinventoryPage,
          icon: "assets/images/pharma-apmnt.png"
        }
        // { title: 'Add Book Lab', component: AddbooklabPage }
      ];
    }
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    localStorage.clear();
    this.nav.push(LoginPage);
    this.nav.setRoot(LoginPage);
  }
}
