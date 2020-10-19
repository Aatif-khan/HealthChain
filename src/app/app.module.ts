import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { LoginPage } from "../pages/commonpages/login/login";
import { DashBoardForDoctorPage } from "../pages/doctor/dash-board-for-doctor/dash-board-for-doctor";
import { DashBoardForPatientPage } from "../pages/patient/dash-board-for-patient/dash-board-for-patient";
import { AddappointmentPage } from "../pages/patient/addappointment/addappointment";

import { PatientprofilePage } from "../pages/patient/patientprofile/patientprofile";
import { ScrollableTabs } from "../components/scrollable-tabs/scrollable-tabs";
import { PatientprofiledocumentsPage } from "../pages/patient/patientprofiledocuments/patientprofiledocuments";
import { ProfiledemographicPage } from "../pages/patient/profiledemographic/profiledemographic";
import { ChangepasswordPage } from "../pages/commonpages/changepassword/changepassword";
import { ForgotpasswordPage } from "../pages/commonpages/forgotpassword/forgotpassword";
import { PatientprofilepersonalPage } from "../pages/patient/patientprofilepersonal/patientprofilepersonal";
import { Camera } from "@ionic-native/camera";
import { PatientprofileextendedPage } from "../pages/patient/patientprofileextended/patientprofileextended";
import { DoctorprofilepersonalPage } from "../pages/doctor/doctorprofilepersonal/doctorprofilepersonal";
import { DoctorprofileextendedPage } from "../pages/doctor/doctorprofileextended/doctorprofileextended";
import { DoctorprofilePage } from "../pages/doctor/doctorprofile/doctorprofile";
import { DoctorprofileprofessionalinfoPage } from "../pages/doctor/doctorprofileprofessionalinfo/doctorprofileprofessionalinfo";
import { AppointmentlistPage } from "../pages/patient/appointmentlist/appointmentlist";
import { ViewappointmentPage } from "../pages/patient/viewappointment/viewappointment";
import { EditappointmentPage } from "../pages/patient/editappointment/editappointment";
import { DoctorvisitlistPage } from "../pages/doctor/doctorvisitlist/doctorvisitlist";
import { PatientdoctorvisitlistPage } from "../pages/patient/patientdoctorvisitlist/patientdoctorvisitlist";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ApiProvider } from "../providers/api/api";
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { PatientdoctorvisitlistviewPage } from "../pages/patient/patientdoctorvisitlistview/patientdoctorvisitlistview";
import { File } from "@ionic-native/file";
import { Transfer } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { DoctorAddOrEditVisitPage } from "../pages/doctor/doctor-add-or-edit-visit/doctor-add-or-edit-visit";

import { LabprofilePage } from "../pages/laboratory/labprofile/labprofile";
import { LabprofilelaboratoryPage } from "../pages/laboratory/labprofilelaboratory/labprofilelaboratory";
import { LabprofiledemographicPage } from "../pages/laboratory/labprofiledemographic/labprofiledemographic";
import { LabprofileprofessionalinfoPage } from "../pages/laboratory/labprofileprofessionalinfo/labprofileprofessionalinfo";

import { MedicalprofilePage } from "../pages/medicalstore/medicalprofile/medicalprofile";
import { MedicalprofilebasicdetailPage } from "../pages/medicalstore/medicalprofilebasicdetail/medicalprofilebasicdetail";
import { MedicalprofiledemographicPage } from "../pages/medicalstore/medicalprofiledemographic/medicalprofiledemographic";
import { MedicalprofileprofessionalPage } from "../pages/medicalstore/medicalprofileprofessional/medicalprofileprofessional";
import { MedicalchangepasswordPage } from "../pages/medicalstore/medicalchangepassword/medicalchangepassword";

import { InsuranceprofilePage } from "../pages/insurance/insuranceprofile/insuranceprofile";
import { InsurancebasicdetailPage } from "../pages/insurance/insurancebasicdetail/insurancebasicdetail";
import { InsuranceprofiledemographicPage } from "../pages/insurance/insuranceprofiledemographic/insuranceprofiledemographic";
import { InsuranceprofileprofessionalPage } from "../pages/insurance/insuranceprofileprofessional/insuranceprofileprofessional";
import { InsurancechangepasswordPage } from "../pages/insurance/insurancechangepassword/insurancechangepassword";

import { HospitalprofilePage } from "../pages/hospital/hospitalprofile/hospitalprofile";
import { HospitalbasicdetailPage } from "../pages/hospital/hospitalbasicdetail/hospitalbasicdetail";
import { HospitalprofiledemographicPage } from "../pages/hospital/hospitalprofiledemographic/hospitalprofiledemographic";
import { HospitalprofileprofessionalPage } from "../pages/hospital/hospitalprofileprofessional/hospitalprofileprofessional";
import { HospitalchangepasswordPage } from "../pages/hospital/hospitalchangepassword/hospitalchangepassword";
import { PatientlabreportlistPage } from "../pages/patient/patientlabreportlist/patientlabreportlist";
import { PatientmedicineboughtlistPage } from "../pages/patient/patientmedicineboughtlist/patientmedicineboughtlist";
import { PatientinsurancelistPage } from "../pages/patient/patientinsurancelist/patientinsurancelist";
import { PatienthospitaladmitlistPage } from "../pages/patient/patienthospitaladmitlist/patienthospitaladmitlist";
import { PatientclaimedinsurancelistPage } from "../pages/patient/patientclaimedinsurancelist/patientclaimedinsurancelist";
import { PatientlabreportlistviewPage } from "../pages/patient/patientlabreportlistview/patientlabreportlistview";
import { PatientclaimedinsurancelistviewPage } from "../pages/patient/patientclaimedinsurancelistview/patientclaimedinsurancelistview";
import { PatientmedicineboughtlistviewPage } from "../pages/patient/patientmedicineboughtlistview/patientmedicineboughtlistview";
import { PatientinsurancelistviewPage } from "../pages/patient/patientinsurancelistview/patientinsurancelistview";
import { PatienthospitaladmitlistviewPage } from "../pages/patient/patienthospitaladmitlistview/patienthospitaladmitlistview";
import { LaboratorydashboardPage } from "../pages/laboratory/laboratorydashboard/laboratorydashboard";
import { LabincomingappoinmentPage } from "../pages/laboratory/labincomingappoinment/labincomingappoinment";
import { LabreportPage } from "../pages/laboratory/labreport/labreport";
import { DashBoardForHospitalPage } from "../pages/hospital/dash-board-for-hospital/dash-board-for-hospital";
import { HospitalclaimedinsuranceincomingapporvallistPage } from "../pages/hospital/hospitalclaimedinsuranceincomingapporvallist/hospitalclaimedinsuranceincomingapporvallist";
import { HospitalclaimedinsuranceincomingapporvallistviewPage } from "../pages/hospital/hospitalclaimedinsuranceincomingapporvallistview/hospitalclaimedinsuranceincomingapporvallistview";
import { HospitalpatientadmitlistPage } from "../pages/hospital/hospitalpatientadmitlist/hospitalpatientadmitlist";
import { DashBoardForInsurancePage } from "../pages/insurance/dash-board-for-insurance/dash-board-for-insurance";
import { InsuranceincomingclaimlistPage } from "../pages/insurance/insuranceincomingclaimlist/insuranceincomingclaimlist";
import { InsuranceincomingclaimlistviewPage } from "../pages/insurance/insuranceincomingclaimlistview/insuranceincomingclaimlistview";
import { InsuranceplanlistPage } from "../pages/insurance/insuranceplanlist/insuranceplanlist";
import { InsuranceplanlistdetailviewPage } from "../pages/insurance/insuranceplanlistdetailview/insuranceplanlistdetailview";
import { DashBoardForMedicalstorePage } from "../pages/medicalstore/dash-board-for-medicalstore/dash-board-for-medicalstore";
import { IncomingmedicinerequiredlistPage } from "../pages/medicalstore/incomingmedicinerequiredlist/incomingmedicinerequiredlist";
import { IncomingmedicinerequiredlistviewPage } from "../pages/medicalstore/incomingmedicinerequiredlistview/incomingmedicinerequiredlistview";
import { TrackingPage } from "../pages/medicalstore/tracking/tracking";
import { SignupPage } from "../pages/commonpages/signup/signup";
import { AddplanPage } from "../pages/insurance/addplan/addplan";
import { AddbooklabPage } from "../pages/patient/addbooklab/addbooklab";
import { PatientaddinsurancePage } from "../pages/patient/patientaddinsurance/patientaddinsurance";
import { FileChooser } from "@ionic-native/file-chooser";
import { Base64 } from "@ionic-native/base64";
import { DocumentPicker } from "@ionic-native/document-picker";
import { PatientadmitformPage } from "../pages/hospital/patientadmitform/patientadmitform";
import { ValidationProvider } from "../providers/validation/validation";
import { ControlMessagesComponent } from "../components/control-messages-components/control-messages-components";
import { PatienttrackingPage } from "../pages/patient/patienttracking/patienttracking";
import { LabaddreportPage } from "../pages/laboratory/labaddreport/labaddreport";
import { LabviewreportPage } from "../pages/laboratory/labviewreport/labviewreport";
import { PatientbooklablistPage } from "../pages/patient/patientbooklablist/patientbooklablist";
import { LabbookinglistPage } from "../pages/laboratory/labbookinglist/labbookinglist";
import { LaboratorviewappoinmentPage } from "../pages/laboratory/laboratorviewappoinment/laboratorviewappoinment";
import { DoctorvisitlistviewPage } from "../pages/doctor/doctorvisitlistview/doctorvisitlistview";
//import { DoctorvisitlistviewPageModule } from '../pages/doctor/doctorvisitlistview/doctorvisitlistview.module';
import { FileTransfer } from "@ionic-native/file-transfer";

import { RebookappointmentPage } from "../pages/patient/rebookappointment/rebookappointment";

import { ViewpatientbooklabPage } from "../pages/patient/viewpatientbooklab/viewpatientbooklab";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { PharmadeliveredPage } from "../pages/pharmadelivered/pharmadelivered";
import { AddPharmaAppointmentPage } from "../pages/patient/addpharmaappointment/addpharmaappointment";
import { PharmaAppointmentlistPage } from "../pages/patient/pharmaappointmentlist/pharmaappointmentlist";
import { PharmaviewPage } from "../pages/pharmaview/pharmaview";
import { PatientreportsPage } from "../pages/patientreports/patientreports";
import { PipesModule } from "../pipes/pipes.module";
import { MedicinesrequestviewPage } from "../pages/medicinesrequestview/medicinesrequestview";
import { EditPharmaAppointmentPage } from "../pages/patient/editpharmaappointment/editpharmaappointment";
import { DeliverablesPage } from "../pages/deliverables/deliverables";
// import { delimiter } from "path";
import { ReportfeeslistPage } from "../pages/laboratory/reportfeeslist/reportfeeslist";
import { AddreportfeesPage } from "../pages/laboratory/addreportfees/addreportfees";
import { EditreportfeesPage } from "../pages/laboratory/editreportfees/editreportfees";
import { ListmedicineinventoryPage } from "../pages/listmedicineinventory/listmedicineinventory";
import { MedicineinventoryPage } from "../pages/medicineinventory/medicineinventory";
import { EditemedicineinventoryPage } from "../pages/editemedicineinventory/editemedicineinventory";
import { AddnewreportPage } from "../pages/laboratory/addnewreport/addnewreport";
import { AddreportPage } from "../pages/addreport/addreport";
import { Network } from "@ionic-native/network";
import { Crop } from "@ionic-native/crop/ngx";
import { FCM } from "@ionic-native/fcm";
import { TransactionhistoryPage } from "../pages/doctor/transactionhistory/transactionhistory";
import { LabtransactionhistoryPage } from "../pages/laboratory/labtransactionhistory/labtransactionhistory";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { DoctorprofiledocumentPage } from "../pages/doctor/doctorprofiledocument/doctorprofiledocument";
import { GooglePlus } from "@ionic-native/google-plus";
import { GoogleMaps } from "@ionic-native/google-maps";
import { Geolocation } from "@ionic-native/geolocation";
import { AngularFireModule } from "angularfire2";
import firebase from "firebase";
import { from } from "rxjs/observable/from";
import { map } from "rxjs/operator/map";
import { MapdemoPage } from "../pages/mapdemo/mapdemo";
import { AddresstopinmapPage } from "../pages/addresstopinmap/addresstopinmap";
import { PhotoViewer } from "@ionic-native/photo-viewer";
// import { ImagePicker } from "@ionic-native/image-picker";

import { LabprofiledocumentPage } from "../pages/laboratory/labprofiledocument/labprofiledocument";
import { MedicalstoreprofiledocumentPage } from "../pages/medicalstore/medicalstoreprofiledocument/medicalstoreprofiledocument";
import { VideoPlayer } from "@ionic-native/video-player";
import { VideoPage } from "../pages/video/video";
import { ImagePicker } from "@ionic-native/image-picker";
import { Select2Module } from "ng2-select2";
import { AddpinlocationPage } from "../pages/addpinlocation/addpinlocation";
import { GeocoderProvider } from "../providers/geocoder/geocoder";
import { HttpModule } from "@angular/http";
import { NativeGeocoder } from "@ionic-native/native-geocoder";
import { PatientOrderDetailsPage } from "../pages/patient-order-details/patient-order-details";
import { DoctorprofiledemographicPage } from "../pages/doctor/doctorprofiledemographic/doctorprofiledemographic";

export const firebaseConfig = {
  apiKey: "AIzaSyAkxMqQW32yABSn5JlwC0DTggNPfbvcnVA",
  authDomain: "myfirstpro-bb873.firebaseapp.com",
  databaseURL: "https://myfirstpro-bb873.firebaseio.com",
  projectId: "myfirstpro-bb873",
  storageBucket: "myfirstpro-bb873.appspot.com",
  messagingSenderId: "401030294796",
  appId: "1:401030294796:web:8f08cdbfd69888e3146d29",
  measurementId: "G-V5VXXFL2BZ"
};
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    LabprofiledocumentPage,
    MedicalstoreprofiledocumentPage,
    TransactionhistoryPage,
    LabtransactionhistoryPage,
    SignupPage,
    DashBoardForDoctorPage,
    DashBoardForPatientPage,
    AddappointmentPage,
    DoctorprofiledemographicPage,
    PatientprofilePage,
    PatientprofilepersonalPage,
    ProfiledemographicPage,
    PatientprofileextendedPage,
    PatientprofiledocumentsPage,
    DoctorprofiledocumentPage,
    ChangepasswordPage,
    DoctorprofilePage,
    DoctorprofilepersonalPage,
    DoctorprofileextendedPage,
    DoctorprofileprofessionalinfoPage,
    ScrollableTabs,
    AppointmentlistPage,
    PharmaAppointmentlistPage,
    ViewappointmentPage,
    EditappointmentPage,
    DoctorvisitlistPage,
    PatientdoctorvisitlistPage,
    PatientdoctorvisitlistviewPage,
    ForgotpasswordPage,
    PatientprofilePage,
    PatientprofilepersonalPage,
    ProfiledemographicPage,
    PatientprofileextendedPage,
    PatientprofiledocumentsPage,
    PatientOrderDetailsPage,
    DoctorprofiledocumentPage,
    DoctorAddOrEditVisitPage,
    LabprofilePage,
    LabprofilelaboratoryPage,
    LabprofiledemographicPage,
    LabprofileprofessionalinfoPage,
    MedicalprofilePage,
    MedicalprofilebasicdetailPage,
    MedicalprofiledemographicPage,
    MedicalprofileprofessionalPage,
    MedicalchangepasswordPage,
    InsuranceprofilePage,
    InsurancebasicdetailPage,
    InsuranceprofiledemographicPage,
    InsuranceprofileprofessionalPage,
    InsurancechangepasswordPage,
    HospitalprofilePage,
    HospitalbasicdetailPage,
    HospitalprofiledemographicPage,
    HospitalprofileprofessionalPage,
    HospitalchangepasswordPage,
    PatientlabreportlistPage,
    PatientmedicineboughtlistPage,
    PatientinsurancelistPage,
    PatienthospitaladmitlistPage,
    PatientclaimedinsurancelistPage,
    PatientlabreportlistviewPage,
    PatientclaimedinsurancelistviewPage,
    PatientmedicineboughtlistviewPage,
    PatientinsurancelistviewPage,
    PatienthospitaladmitlistviewPage,
    LaboratorydashboardPage,
    LabincomingappoinmentPage,
    LabreportPage,
    DashBoardForHospitalPage,
    HospitalclaimedinsuranceincomingapporvallistPage,
    HospitalclaimedinsuranceincomingapporvallistviewPage,
    HospitalpatientadmitlistPage,
    DashBoardForInsurancePage,
    InsuranceincomingclaimlistPage,
    InsuranceincomingclaimlistviewPage,
    InsuranceplanlistPage,
    InsuranceplanlistdetailviewPage,
    DashBoardForMedicalstorePage,
    IncomingmedicinerequiredlistPage,
    IncomingmedicinerequiredlistviewPage,
    TrackingPage,
    AddplanPage,
    AddbooklabPage,
    PatientaddinsurancePage,
    PatientadmitformPage,
    ControlMessagesComponent,
    PatienttrackingPage,
    LabaddreportPage,
    LabviewreportPage,
    MedicalstoreprofiledocumentPage,
    PatientbooklablistPage,
    LabbookinglistPage,
    LaboratorviewappoinmentPage,
    LabviewreportPage,
    DoctorvisitlistviewPage,
    RebookappointmentPage,
    ViewpatientbooklabPage,
    PharmadeliveredPage,
    AddPharmaAppointmentPage,
    PharmaviewPage,
    AddPharmaAppointmentPage,
    PatientreportsPage,
    MedicinesrequestviewPage,
    EditPharmaAppointmentPage,
    PatientreportsPage,
    DeliverablesPage,
    ReportfeeslistPage,
    AddreportfeesPage,
    EditreportfeesPage,
    AddnewreportPage,
    ListmedicineinventoryPage,
    MedicineinventoryPage,
    EditemedicineinventoryPage,
    AddreportPage,
    MapdemoPage,
    AddresstopinmapPage,
    VideoPage,
    AddpinlocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    PipesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    Select2Module,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    LabprofiledocumentPage,
    DashBoardForDoctorPage,
    DashBoardForPatientPage,
    AddappointmentPage,
    PatientprofilePage,
    PatientprofilepersonalPage,
    ProfiledemographicPage,
    PatientprofileextendedPage,
    PatientprofiledocumentsPage,
    DoctorprofiledocumentPage,
    ChangepasswordPage,
    DoctorprofilePage,
    DoctorprofilepersonalPage,
    DoctorprofileextendedPage,
    DoctorprofileprofessionalinfoPage,
    AppointmentlistPage,
    PharmaAppointmentlistPage,
    ViewappointmentPage,
    EditappointmentPage,
    DoctorvisitlistPage,
    PatientdoctorvisitlistPage,
    PatientdoctorvisitlistviewPage,
    TransactionhistoryPage,
    ForgotpasswordPage,
    DoctorAddOrEditVisitPage,
    LabprofilePage,
    LabprofilelaboratoryPage,
    LabprofiledemographicPage,
    LabprofileprofessionalinfoPage,
    MedicalprofilePage,
    MedicalprofilebasicdetailPage,
    MedicalprofiledemographicPage,
    MedicalprofileprofessionalPage,
    MedicalchangepasswordPage,
    InsuranceprofilePage,
    InsurancebasicdetailPage,
    InsuranceprofiledemographicPage,
    InsuranceprofileprofessionalPage,
    InsurancechangepasswordPage,
    HospitalprofilePage,
    HospitalbasicdetailPage,
    HospitalprofiledemographicPage,
    HospitalprofileprofessionalPage,
    HospitalchangepasswordPage,
    PatientlabreportlistPage,
    PatientmedicineboughtlistPage,
    PatientinsurancelistPage,
    PatienthospitaladmitlistPage,
    PatientclaimedinsurancelistPage,
    PatientlabreportlistviewPage,
    PatientclaimedinsurancelistviewPage,
    PatientmedicineboughtlistviewPage,
    PatientinsurancelistviewPage,
    PatienthospitaladmitlistviewPage,
    PatientOrderDetailsPage,
    LaboratorydashboardPage,
    LabincomingappoinmentPage,
    LabreportPage,
    DashBoardForHospitalPage,
    DoctorprofiledemographicPage,
    HospitalclaimedinsuranceincomingapporvallistPage,
    HospitalclaimedinsuranceincomingapporvallistviewPage,
    HospitalpatientadmitlistPage,
    DashBoardForInsurancePage,
    InsuranceincomingclaimlistPage,
    InsuranceincomingclaimlistviewPage,
    InsuranceplanlistPage,
    InsuranceplanlistdetailviewPage,
    DashBoardForMedicalstorePage,
    IncomingmedicinerequiredlistPage,
    IncomingmedicinerequiredlistviewPage,
    TrackingPage,
    AddplanPage,
    AddbooklabPage,
    PatientaddinsurancePage,
    PatientadmitformPage,
    PatienttrackingPage,
    LabaddreportPage,
    PatientbooklablistPage,
    LabbookinglistPage,
    LaboratorviewappoinmentPage,
    LabviewreportPage,
    DoctorvisitlistviewPage,
    RebookappointmentPage,
    ViewpatientbooklabPage,
    PharmadeliveredPage,
    AddPharmaAppointmentPage,
    PharmaviewPage,
    AddPharmaAppointmentPage,
    PatientreportsPage,
    MedicinesrequestviewPage,
    EditPharmaAppointmentPage,
    PatientreportsPage,
    DeliverablesPage,
    ReportfeeslistPage,
    AddreportfeesPage,
    EditreportfeesPage,
    ListmedicineinventoryPage,
    MedicineinventoryPage,
    EditemedicineinventoryPage,
    AddnewreportPage,
    AddreportPage,
    TransactionhistoryPage,
    LabtransactionhistoryPage,
    MapdemoPage,
    AddresstopinmapPage,
    VideoPage,
    AddpinlocationPage
  ],
  providers: [
    StatusBar,
    Network,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider,
    DatePipe,
    PhotoViewer,
    Camera,
    // Transfer,
    FilePath,
    FileChooser,
    Base64,
    ImagePicker,
    DocumentPicker,
    ValidationProvider,
    FileTransfer,
    InAppBrowser,
    File,
    Crop,
    FCM,
    LocalNotifications,
    GooglePlus,
    GoogleMaps,
    Geolocation,
    ImagePicker,
    VideoPlayer,
    GeocoderProvider,
    NativeGeocoder
  ]
})
export class AppModule {}
