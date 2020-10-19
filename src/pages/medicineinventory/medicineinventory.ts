import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import {
  APIName,
  showToast
} from "../../providers/commonfunction/commonfunction";

/**
 * Generated class for the MedicineinventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-medicineinventory",
  templateUrl: "medicineinventory.html"
})
export class MedicineinventoryPage {
  medicinequintity: number;
  costpermedicine: number;
  batchno: String = "";
  expirydate: Date;
  MedicineRequired: any;
  medicineinventory: any = [];
  item: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MedicineinventoryPage");
    this.api
      .wsPostHeader(APIName.getallmedicineinventory, "")
      .then((resp: any) => {
        this.medicineinventory = resp.data;
        this.MedicineRequired = this.medicineinventory[0].drugCompoundName;
      });
    console.log("ionViewDidLoad MedicineinventoryPage");
    this.api
      .wsPostHeader(APIName.getallmedicineinventory, "")
      .then((resp: any) => {
        this.medicineinventory = resp.data;
        this.MedicineRequired = this.medicineinventory[0].drugCompoundName;
        this.MedicineRequired = this.medicineinventory[0].drugCompoundDiscription;
        this.MedicineRequired = this.medicineinventory[0].drugCompoundShortCode1;
        this.MedicineRequired = this.medicineinventory[0].drugCompoundShortCode2;
        this.MedicineRequired = this.medicineinventory[0].drugCompoundDiscountPrise;
        this.MedicineRequired = this.medicineinventory[0].drugCompoundCreatedDate;
      });
  }

  callAddAppointmentApi() {
    if (this.medicinequintity == 0) {
      showToast("Please select Medicine Quentety", this.toastCtrl);
      return;
    }
    if (this.costpermedicine == 0) {
      showToast("Please select Cost per Medicine", this.toastCtrl);
      return;
    }
    if (this.MedicineRequired.length == 0) {
      showToast("Please select Medicine Inventory ", this.toastCtrl);
      return;
    }

    let date = new Date(this.expirydate);
    let datetopass = date.getTime();

    let data = {
      medicineQuantity: Number(this.medicinequintity),
      costpermedicine: Number(this.costpermedicine),
      medicineName: this.MedicineRequired,
      batchno: this.batchno,
      expirydate: datetopass
    };

    this.api
      .wsPostHeader(APIName.postaddmedicineinventory, data)
      .then((resp: any) => {
        if (resp.status === 500) {
          showToast(resp.error.message, this.toastCtrl);
        } else {
          showToast("" + resp.message, this.toastCtrl);

          this.navCtrl.pop();
        }
      });
    // this.makePayment();

    // this.makePaymentPlugin();
  }

  addnewmedicine(data) {
    //console.log(data);
    let alert = this.alertCtrl.create({
      title: "Add New Medicine",

      inputs: [
        {
          name: "NewMedicineName",
          placeholder: "New Medicine Name"
        },
        {
          name: "NewMedicineMFR_MK",
          placeholder: "New Medicine MFR/MK"
        },
        {
          name: "NewMedicineMSN",
          placeholder: "New Medicine MSN"
        }
      ],

      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: "SAVE",
          handler: data1 => {
            console.log("Ok clicked");
            let data = JSON.stringify({
              drugCompoundName: data1.NewMedicineName,
              mfrmk: data1.NewMedicineMFR_MK,
              msn: data1.NewMedicineMSN
            });
            this.api
              .wsPostHeader(APIName.postaddnewmedicinename, data)
              .then((resp: any) => {
                if (resp.status === 500) {
                  showToast(resp.error.message, this.toastCtrl);
                } else {
                  showToast("" + resp.message, this.toastCtrl);

                  this.navCtrl.pop();
                }
              });
          }
        }
      ]
    });
    alert.present();
  }

  // changeStringToDate(dateString: string, format?: string) {
  //   if (format) {
  //     console.log(
  //       "StringToDate==>",
  //       this.changeDateFormat(new Date(dateString), format)
  //     );
  //     return this.changeDateFormat(new Date(dateString), format);
  //   } else {
  //     console.log("completeString=>>>>>>", dateString);
  //     console.log("StringToDate==>", new Date(dateString).toISOString());
  //     return new Date(dateString).toISOString();
  //   }
  // }

  // //date to any format
  // changeDateFormat(date: Date, formate?: string) {
  //   let latest_date = this.DatePipe.transform(date, formate);
  //   console.log("ChangeDateFormat", latest_date);
  //   return latest_date;
  // }
}
