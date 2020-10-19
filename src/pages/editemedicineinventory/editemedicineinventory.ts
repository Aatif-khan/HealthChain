import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { APIName, showToast } from '../../providers/commonfunction/commonfunction';

/**
 * Generated class for the EditemedicineinventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editemedicineinventory',
  templateUrl: 'editemedicineinventory.html',
})
export class EditemedicineinventoryPage {

  medicinequintity:any;
  costpermedicine:any;
  MedicineRequired:any;
  medicineinventory: any = [];
  item: any=[];
  apptID:any="";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ApiProvider,public toastCtrl: ToastController,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.apptID = this.navParams.get("id");
    console.log('ionViewDidLoad EditemedicineinventoryPage');
    var data = this.apptID;
    this.api.wsPostHeader(APIName.viewemedicineinventory, data).then((resp: any) => {
      // this.medicineinventory = resp.data;
      this.MedicineRequired = resp.data.medicineName;
      this.medicinequintity = resp.data.medicineQuantity;
      this.costpermedicine = resp.data.costpermedicine;

      

    });
  }
  callupdatemedicineapi() {
    if (this.medicinequintity.length == 0) {
      showToast("Please select Medicine Quentety", this.toastCtrl);
      return;
    }
    if (this.costpermedicine.length == 0) {
      showToast("Please select Cost per Medicine", this.toastCtrl);
      return;
    }
    if (this.MedicineRequired.length == 0) {
      showToast("Please select Medicine Inventory ", this.toastCtrl);
      return;
    }
    let data = JSON.stringify({
      medicineQuantity: this.medicinequintity,
      costpermedicine: this.costpermedicine,
      medicineName: this.MedicineRequired,
      medicineId: this.apptID

     
    });

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
    }
}
