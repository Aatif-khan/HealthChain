import {
  AlertController,
  LoadingController,
  ToastController,
  ActionSheetController,
  Loading
} from "ionic-angular";

export const username = "Username";
export const password = "Password";
export const networkAlert = "Network Alert";
export const commonAlert = "Common Alert";
export const selectedRole = "SelectedRole";
export const perProfile = "perProfile";
export const perCertificate = "perCertificate";
export const certificates = "certificates";

// export const BaseUrl =  'http://192.168.15.104:';
// export const BaseUrl =  'http://192.168.15.24:';
// export const BaseUrl = "http://13.232.235.252:";

// export const BaseUrl = "http://192.168.15.150:";
export const BaseUrl = "http://192.168.15.40:";
// export const BaseUrl = "http://192.168.15.149:";
// export const BaseUrl = "http://52.66.226.114:";
// export const BaseUrl = "http://app.easy.healthcare:";
// export const BaseUrl =  'http://203.88.147.222:';

export const APIName = {
  login: BaseUrl + "9090/auth/login",
  signup: BaseUrl + "9090/auth/userRegistration",
  forgotpassword: BaseUrl + "9090/auth/forgotPassword",
  getAllFacility: BaseUrl + "9091/common/getAllFacility",
  // getAllDoctorByLocationAndFacility:
  //   BaseUrl + "9091/common/getAllDoctorByLocationAndFacility",
  getAllReportByFacilityProvider:
    BaseUrl + "9091/common/getAllReportByFacilityProvider",
  getAllLocationByFacility: BaseUrl + "9091/common/getAllLocationByFacility",
  getAllSpecialityByLocationAndFacility:
    BaseUrl + "9091/common/getAllSpecialityByLocationAndFacility",
  getAllDoctorByLocationAndspeciality:
    BaseUrl + "9091/common/getAllDoctorByLocationAndspeciality",
  appointmentType: BaseUrl + "9091/common/appointmentType",
  appointmentReason: BaseUrl + "9091/common/appointmentReason",
  labappointmentReson: BaseUrl + "9091/common/labappointmentReson",
  // getAppointmentPatient: BaseUrl + '9091/patient/getAppointmentPatient',
  getAppointmentPatient:
    BaseUrl + "9091/patient/getAppointmentPatient?page=0&size=1000",
  addOrEditAppointment: BaseUrl + "9091/common/addOrEditAppointment",
  viewAndEditAppointmentPatient:
    BaseUrl + "9091/patient/viewAndEditAppointmentPatient",
  changePassword: BaseUrl + "9090/auth/changePassword",
  updateExtendedPatientProfile: BaseUrl + "9091/profile/extended",
  updateExtendedDoctorProfile: BaseUrl + "9091/profile/extended",
  getExtendedPatientProfile: BaseUrl + "9091/profile/getExtendedData",
  getExtendedDoctorProfile: BaseUrl + "9091/profile/getExtendedData",
  updatePersonalDoctorProfile: BaseUrl + "9091/profile/personal",
  updatePersonalPatientProfile: BaseUrl + "9091/profile/personal",
  getPersonalDoctorProfile: BaseUrl + "9091/profile/getPersonalData",
  getPersonalPatientProfile: BaseUrl + "9091/profile/getPersonalData",
  getLocations: BaseUrl + "9091/common/getAllLocation",
  getDemographicData: BaseUrl + "9091/profile/getDemographicData",
  updatePatientDemographicProfile: BaseUrl + "9091/profile/demographic",
  addfacilityandlocation: BaseUrl + "9091/common/addfacilityandlocation",
  getAllFacilityDoctor: BaseUrl + "9091/common/getAllFacilityDoctor",
  getAllFacilityByReport: BaseUrl + "9091/common/getAllFacilityByReport",
  postordermedicinelocation: BaseUrl + "9091/common/getAllPatientLocation",
  postgetfclocation: BaseUrl + "9092/doctor/getspeciality",
  getAllLocationByFacilityAndDoctor:
    BaseUrl + "9091/common/getAllLocationByFacilityAndDoctor",
  addOrEditDoctorVisit: BaseUrl + "9092/doctor/addOrEditDoctorVisit",
  // getDoctorVisitlist: BaseUrl + '9092/doctor/getAllDoctorVisit',
  getDoctorVisitlist:
    BaseUrl + "9092/doctor/getAllDoctorVisit?page=0&size=1000",

  // getAllDoctorVisitPatient: BaseUrl + '9091/patient/getAllDoctorVisitPatient',
  getAllDoctorVisitPatient:
    BaseUrl + "9091/patient/getAllDoctorVisitPatient?page=0&size=1000",
  viewAndEditDoctorVisitPatient:
    BaseUrl + "9091/patient/viewAndEditDoctorVisitPatient",
  getDocumentsPatientProfile: BaseUrl + "9091/profile/getDocuments",
  updateDocumentsPatientProfile: BaseUrl + "9091/profile/documents",
  getAllPatient: BaseUrl + "9091/common/getAllPatient",
  getAllDiagnosis: BaseUrl + "9091/common/getAllDiagnosis",
  getAllMedicine: BaseUrl + "9091/common/getAllMedicine",
  getAllLab1Report: BaseUrl + "9091/common/getAllLab1Report",
  getAllDoctor: BaseUrl + "9091/common/getAllDoctor",
  gender: BaseUrl + "9091/common/gender",
  workStatus: BaseUrl + "9091/common/workStatus",
  employmentStatus: BaseUrl + "9091/common/employmentStatus",
  maritalStatus: BaseUrl + "9091/common/maritalStatus",
  // getAllLaboratoryReports: BaseUrl + '9093/lab/getAllLabReport',
  getAllLaboratoryReports:
    BaseUrl + "9091/patient/getAllLabReport?page=0&size=1000",

  viewLaboratoryReport: BaseUrl + "9093/lab/getLabReportByLabUser",
  // laboratoryIncomingBookingRequest: BaseUrl + '9093/labProfile/getAllLab',
  laboratoryIncomingBookingRequest:
    BaseUrl + "9093/labProfile/getAllLab?page=0&size=1000",

  viewAndEditLaboratory: BaseUrl + "9093/labProfile/viewAndEditLab",
  // getAllLabReport: BaseUrl + '9091/patient/getAllLabReport',
  getAllLabReport: BaseUrl + "9091/patient/getAllLabReport",
  ViewLabReport: BaseUrl + "9091/patient/ViewLabReport",
  getLabProfileProfessionalData:
    BaseUrl + "9093/labProfile/getProfessionalData",
  // getAllLab: BaseUrl + '9093/labProfile/getAllLab',
  getAllLab: BaseUrl + "9091/patient/getAllLabReport?page=0&size=1000",

  // getAllLabPatient: BaseUrl + '9091/patient/getAllLabPatient',
  getAllLabPatient: BaseUrl + "9091/patient/getAllLabPatient?page=0&size=1000",
  // getAppointmentDoctor: BaseUrl + '9092/doctor/getAppointmentDoctor',
  getAppointmentDoctor:
    BaseUrl + "9092/doctor/getAppointmentDoctor?page=0&size=1000",
  viewAndEditAppointmentDoctor:
    BaseUrl + "9092/doctor/viewAndEditAppointmentDoctor",
  addOrEditLab: BaseUrl + "9091/common/addOrEditLab",
  labStatusChange: BaseUrl + "9091/common/labStatusChange",
  viewAndEditDoctorVisit: BaseUrl + "9092/doctor/viewAndEditDoctorVisit",
  getLaboratoryData: BaseUrl + "9093/labProfile/getLaboratoryData",
  addOrEditLabReportByLabUser:
    BaseUrl + "9093/laboratory/addOrEditLabReportByLabUser",
  addOrEditReportByLabUser:
    BaseUrl + "9093/laboratory/addOrEditReportByLabUser",
  getAllLab1ReportByLab: BaseUrl + "9091/common/getAllLab1ReportByLab",
  updateProfessionalLaboratoryProfile: BaseUrl + "9093/labProfile/professional",
  updateLaboratoryProfile: BaseUrl + "9093/labProfile/laboratory",
  appointmentStatusChange: BaseUrl + "9091/common/appointmentStatusChange",
  getAllFacilityByPerameter: BaseUrl + "9091/common/getAllFacilityByPerameter",
  viewAndEditLabPatient: BaseUrl + "9091/patient/viewAndEditLabPatient",
  getalllabreportbyparamter:
    BaseUrl + "9091/common/getAllLab1ReportByperameter",
  getallmedicinebyparameter: BaseUrl + "9091/common/getAllMedicineByperameter",
  // getAllLabReportWithoutBook: BaseUrl + '9093/laboratory/getAllLabReportWithoutBook',
  getAllLabReportWithoutBook:
    BaseUrl + "9093/laboratory/getAllLabReportWithoutBook?page=0&size=1000",

  LabViewLabReport: BaseUrl + "9093/laboratory/ViewLabReport",
  updatelabdemographicprofile: BaseUrl + "9093/labProfile/demographic",
  getlabdemographicdata: BaseUrl + "9093/labProfile/getDemographicData",
  getalldoctorbyparameter: BaseUrl + "9091/common/getAllDoctorByperameter",

  //fees
  getfeesofdoctor: BaseUrl + "9091/patient/getDoctorFees",
  getPharmaAppointments: BaseUrl + "9091/patient/getApptList?page=0&size=1000",

  getpharmadelivered: BaseUrl + "9091/patient/pharmadelivered?page=0&size=1000",
  getpharmaview: BaseUrl + "9091/patient/pharmalistview?page=0&size=1000",
  getpatientreports: BaseUrl + "9092/doctor/getPatientReport",
  downloadfilepationteport: BaseUrl + "9090/auth/download?fileName=",
  existspationreport: BaseUrl + "9090/auth/exits?fileName=",

  getAllMedicalStore: BaseUrl + "9091/patient/getAllMedicalStore",

  getMedByPharma: BaseUrl + "9091/common/getMedByPharmaID",
  getmedicineboughtlist: BaseUrl + "9091/patient/getmedicineboughtlist",
  getpharmadeliverdpharma:
    BaseUrl + "9094/medicalcenter/getPharmaDeliveries?page=0&size=1000",
  getmedicinesrequest:
    BaseUrl + "9094/medicalcenter/getApptList?page=0&size=1000",
  postmedicinesrequestlistview:
    BaseUrl + "9094/medicalcenter/medicineboughtview",
  getpharmalistview: BaseUrl + "9091/patient/pharmalistview",
  postmedicinerequestviewapproved:
    BaseUrl + "9091/common/pharmastatuschangeurl",
  postmedicinestracking:
    BaseUrl + "9091/common/pharmastatuschangeurlfortracking",
  getLabReportMaster:
    BaseUrl + "9093/laboratory/getLabReportMaster?page=0&size=1000",
  addReportFees: BaseUrl + "9093/laboratory/addReportFees",
  getLabReportByid: BaseUrl + "9093/laboratory/getLabReportByid",
  getlistmedicineinventory:
    BaseUrl + "9094/medicalcenter/listMedicineInventory?page=0&size=1000",
  getallmedicineinventory: BaseUrl + "9091/common/getAllMedicine",
  postaddmedicineinventory: BaseUrl + "9094/medicalcenter/addMedicineInventory",
  postaddnewmedicinename: BaseUrl + "9094/medicalcenter/addNewMedicine",
  viewemedicineinventory: BaseUrl + "9094/medicalcenter/viewMedicineInventory",
  addNewReport: BaseUrl + "9093/laboratory/addNewReport",
  postdocspecilality: BaseUrl + "9092/doctor/addEditDocSpclty",
  getPatientDemographicData: BaseUrl + "9091/profile/getPatientDemographicData",
  generateChecksum:
    "http://client.attuneinfocom.com/PaytmPaymentGateway/generate_checksum_ionic.php",
  getTransactionHistory: BaseUrl + "9092/doctor/getTransactionHistory",
  fcmbackend: BaseUrl + "9091/common/notification/fcm",
  fcmsend: BaseUrl + "9091/common/send",
  getAllLabTransaction:
    BaseUrl + "9093/labProfile/getAllLabTransaction?page=0&size=5",
  otpuser: BaseUrl + "9090/auth/otpuser",
  getAllCoupons: BaseUrl + "9091/common/getAllCoupons",
  applyCouponCode: BaseUrl + "9091/common/applyCouponCode",
  getReportByLab: BaseUrl + "9091/common/getReportByLab",
  applyLabCouponCode: BaseUrl + "9091/common/applyLabCouponCode",
  pharmaimgupload: BaseUrl + "9091/patient/saveimagepharma",
  getAllTimeZone: BaseUrl + "9091/common/getAllTimeZone",
  getDoctorsForRefference: BaseUrl + "9092/doctor/getDoctorsForRefference",
  getAllPatientLocation: BaseUrl + "9091/common/getAllPatientLocation",
  getallavailabaledoctor: BaseUrl + "9091/common/getallavailabaledoctor",
  getAllDoctorByLocationAndFacility:
    BaseUrl + "9091/common/getAllDoctorByLocationAndFacility",
  getAllPharmaTransactionHistory:
    BaseUrl + "9094/medicalcenter/getAllPharmaTransactionHistory",
  getAppointmentSchedule: BaseUrl + "9091/common/getAppointmentSchedule",
  getLatLong: BaseUrl + "9091/common/getLatLong"
};

/*
export const APIName
= { 
  login: 'http://203.88.147.222:9090/auth/login',
  signup: 'http://203.88.147.222:9090/auth/userRegistration',
  forgotpassword: 'http://203.88.147.222:9090/auth/forgotPassword',
  getAllFacility: "http://203.88.147.222:9091/common/getAllFacility",
  getAllDoctorByLocationAndFacility: 'http://203.88.147.222:9091/common/getAllDoctorByLocationAndFacility',
  getAllReportByFacilityProvider: 'http://203.88.147.222:9091/common/getAllReportByFacilityProvider',
  getAllLocationByFacility: 'http://203.88.147.222:9091/common/getAllLocationByFacility',
  getAllSpecialityByLocationAndFacility: 'http://203.88.147.222:9091/common/getAllSpecialityByLocationAndFacility',
  getAllDoctorByLocationAndspeciality: 'http://203.88.147.222:9091/common/getAllDoctorByLocationAndspeciality',
  appointmentType: 'http://203.88.147.222:9091/common/appointmentType',
  appointmentReason: 'http://203.88.147.222:9091/common/appointmentReason',
  labappointmentReson: 'http://203.88.147.222:9091/common/labappointmentReson',
  // getAppointmentPatient: 'http://203.88.147.222:9091/patient/getAppointmentPatient',
  getAppointmentPatient: 'http://203.88.147.222:9091/patient/getAppointmentPatient?page=0&size=1000',
  addOrEditAppointment: 'http://203.88.147.222:9091/common/addOrEditAppointment',
  viewAndEditAppointmentPatient: 'http://203.88.147.222:9091/patient/viewAndEditAppointmentPatient',
  changePassword: 'http://203.88.147.222:9090/auth/changePassword',
  updateExtendedPatientProfile: 'http://203.88.147.222:9091/profile/extended',
  updateExtendedDoctorProfile: 'http://203.88.147.222:9091/profile/extended',
  getExtendedPatientProfile: 'http://203.88.147.222:9091/profile/getExtendedData',
  getExtendedDoctorProfile: 'http://203.88.147.222:9091/profile/getExtendedData',
  updatePersonalDoctorProfile: 'http://203.88.147.222:9091/profile/personal',
  updatePersonalPatientProfile: 'http://203.88.147.222:9091/profile/personal',
  getPersonalDoctorProfile: 'http://203.88.147.222:9091/profile/getPersonalData',
  getPersonalPatientProfile: 'http://203.88.147.222:9091/profile/getPersonalData',
  getLocations: 'http://203.88.147.222:9091/common/getAllLocation',
  getDemographicData:  'http://203.88.147.222:9091/profile/getDemographicData',
  updatePatientDemographicProfile:  'http://203.88.147.222:9091/profile/demographic',
  getAllFacilityDoctor: 'http://203.88.147.222:9091/common/getAllFacilityDoctor',
  getAllFacilityByReport: 'http://203.88.147.222:9091/common/getAllFacilityByReport',
  getAllLocationByFacilityAndDoctor: 'http://203.88.147.222:9091/common/getAllLocationByFacilityAndDoctor',
  addOrEditDoctorVisit: 'http://203.88.147.222:9092/doctor/addOrEditDoctorVisit',
  // getDoctorVisitlist: 'http://203.88.147.222:9092/doctor/getAllDoctorVisit',
  getDoctorVisitlist: 'http://203.88.147.222:9092/doctor/getAllDoctorVisit?page=0&size=1000',

  // getAllDoctorVisitPatient: 'http://203.88.147.222:9091/patient/getAllDoctorVisitPatient',
  getAllDoctorVisitPatient:'http://203.88.147.222:9091/patient/getAllDoctorVisitPatient?page=0&size=1000',
  viewAndEditDoctorVisitPatient: 'http://203.88.147.222:9091/patient/viewAndEditDoctorVisitPatient',
  getDocumentsPatientProfile: 'http://203.88.147.222:9091/profile/getDocuments',
  updateDocumentsPatientProfile: 'http://203.88.147.222:9091/profile/documents',
  getAllPatient: 'http://203.88.147.222:9091/common/getAllPatient',
  getAllDiagnosis: 'http://203.88.147.222:9091/common/getAllDiagnosis',
  getAllMedicine: 'http://203.88.147.222:9091/common/getAllMedicine',
  getAllLab1Report: 'http://203.88.147.222:9091/common/getAllLab1Report',
  getAllDoctor: 'http://203.88.147.222:9091/common/getAllDoctor',
  gender: 'http://203.88.147.222:9091/common/gender',
  workStatus: 'http://203.88.147.222:9091/common/workStatus',
  employmentStatus: 'http://203.88.147.222:9091/common/employmentStatus',
  maritalStatus: 'http://203.88.147.222:9091/common/maritalStatus',
  // getAllLaboratoryReports: 'http://203.88.147.222:9093/lab/getAllLabReport',
  getAllLaboratoryReports:'http://203.88.147.222:9091/patient/getAllLabReport?page=0&size=1000',

  viewLaboratoryReport: 'http://203.88.147.222:9093/lab/getLabReportByLabUser',
  // laboratoryIncomingBookingRequest: 'http://203.88.147.222:9093/labProfile/getAllLab',
  laboratoryIncomingBookingRequest: 'http://203.88.147.222:9093/labProfile/getAllLab?page=0&size=1000',

  viewAndEditLaboratory: 'http://203.88.147.222:9093/labProfile/viewAndEditLab',
  // getAllLabReport: 'http://203.88.147.222:9091/patient/getAllLabReport',
  getAllLabReport:'http://203.88.147.222:9091/patient/getAllLabReport?page=0&size=1000',
  ViewLabReport: 'http://203.88.147.222:9091/patient/ViewLabReport',
  getLabProfileProfessionalData: 'http://203.88.147.222:9093/labProfile/getProfessionalData',
  // getAllLab: 'http://203.88.147.222:9093/labProfile/getAllLab',
  getAllLab:'http://203.88.147.222:9091/patient/getAllLabReport?page=0&size=1000',

  // getAllLabPatient: 'http://203.88.147.222:9091/patient/getAllLabPatient',
  getAllLabPatient: 'http://203.88.147.222:9091/patient/getAllLabPatient?page=0&size=1000',
  // getAppointmentDoctor: 'http://203.88.147.222:9092/doctor/getAppointmentDoctor',
  getAppointmentDoctor: 'http://203.88.147.222:9092/doctor/getAppointmentDoctor?page=0&size=1000',
  viewAndEditAppointmentDoctor: "http://203.88.147.222:9092/doctor/viewAndEditAppointmentDoctor",
  addOrEditLab: 'http://203.88.147.222:9091/common/addOrEditLab',
  labStatusChange: " http://203.88.147.222:9091/common/labStatusChange",
  viewAndEditDoctorVisit: "http://203.88.147.222:9092/doctor/viewAndEditDoctorVisit",
  getLaboratoryData: 'http://203.88.147.222:9093/labProfile/getLaboratoryData',
  addOrEditLabReportByLabUser: "http://203.88.147.222:9093/laboratory/addOrEditLabReportByLabUser",
  addOrEditReportByLabUser: "http://203.88.147.222:9093/laboratory/addOrEditReportByLabUser",
  getAllLab1ReportByLab: "http://203.88.147.222:9091/common/getAllLab1ReportByLab",
  updateProfessionalLaboratoryProfile: 'http://203.88.147.222:9093/labProfile/professional',
  updateLaboratoryProfile: 'http://203.88.147.222:9093/labProfile/laboratory',
  appointmentStatusChange: "http://203.88.147.222:9091/common/appointmentStatusChange",
  getAllFacilityByPerameter: 'http://203.88.147.222:9091/common/getAllFacilityByPerameter',
  viewAndEditLabPatient:'http://203.88.147.222:9091/patient/viewAndEditLabPatient',
  getalllabreportbyparamter:' http://203.88.147.222:9091/common/getAllLab1ReportByperameter',
  getallmedicinebyparameter: 'http://203.88.147.222:9091/common/getAllMedicineByperameter',
  // getAllLabReportWithoutBook: 'http://203.88.147.222:9093/laboratory/getAllLabReportWithoutBook',
   getAllLabReportWithoutBook: 'http://203.88.147.222:9093/laboratory/getAllLabReportWithoutBook?page=0&size=1000',
   
  LabViewLabReport: 'http://203.88.147.222:9093/laboratory/ViewLabReport',
  updatelabdemographicprofile: 'http://203.88.147.222:9093/labProfile/demographic',
  getlabdemographicdata: ' http://203.88.147.222:9093/labProfile/getDemographicData',
  getalldoctorbyparameter: 'http://203.88.147.222:9091/common/getAllDoctorByperameter',

}
*/

let loader;

export function showToast(msg, toastCtrl: ToastController) {
  let toast = toastCtrl.create({
    message: msg,
    duration: 3000,
    position: "top"
  });
  toast.present();
}
export function showAlert(
  msg: string,
  alertCtrl: AlertController,
  commonStr?: string,
  noOfButton = 1
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    switch (noOfButton) {
      case 1:
        {
          // const confirm = alertCtrl.create({
          //   title: commonStr,
          //   subTitle: msg,
          //   buttons: [
          //     {
          //       text: 'OK'
          //     }
          //   ]
          // }).present();
        }

        break;
      case 2:
        {
          // const confirm = alertCtrl.create({
          //   title: commonStr,
          //   subTitle: msg,
          //   buttons: [
          //     {
          //       text: 'NO',
          //       role: 'cancel',
          //       handler:_=> resolve(false)
          //     },
          //     {
          //       text: 'YES',
          //       handler:_=> resolve(true)
          //     }
          //   ]
          // }).present();
        }

        break;
      default:
        console.log("IF");
    }
  });
}

// export function showAlert(msg:string,alertCtrl:AlertController,commonStr?:string,noOfButton=1):Promise<boolean>
// {
//           return new Promise((resolve, reject) =>{

//              alertCtrl.create({
//                 title: commonStr,
//                 subTitle: msg
//               }).present();
//               console.log("IN Promisew");
//   });

// }
export function showProgressbar(loaderCtrl: LoadingController) {
  if (!loader) {
    loader = loaderCtrl.create({
      content: "Please wait..."
    });
    loader.present();
  }
}

export function hideProgressbar(loaderCtrl: LoadingController) {
  if (loader) {
    loader.dismiss();
    loader = null;
  }
}

export function showActionSheetPhoto(
  actionSheetCtrl: ActionSheetController
): Promise<number> {
  return new Promise((resolve, reject) => {
    let actionSheet = actionSheetCtrl.create({
      title: "Choose photo options",
      buttons: [
        {
          text: "From Camera",
          handler: () => {
            console.log("From Camera clicked");
            resolve(1);
          }
        },
        {
          text: "From Gallery",
          handler: () => {
            console.log("From Gallery clicked");
            resolve(0);
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });

    actionSheet.present();
  });
}
