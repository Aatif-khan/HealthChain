import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import {
  showToast,
  APIName
} from "../../../providers/commonfunction/commonfunction";
import { ApiProvider } from "../../../providers/api/api";

/**
 * Generated class for the AddnewreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-addnewreport",
  templateUrl: "addnewreport.html"
})
export class AddnewreportPage {
  public reporttypeId = "";
  public category: any = "";
  public reportname: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddnewreportPage");
  }

  callAddNewReport() {
    if (this.reporttypeId.length == 0) {
      showToast("Please select facility", this.toastCtrl);
      return;
    }
    if (this.category.length == 0) {
      showToast("Please select Location", this.toastCtrl);
      return;
    }
    if (this.reportname.length == 0) {
      showToast("Please select Speciality", this.toastCtrl);
      return;
    }

    let data = JSON.stringify({
      labReportType: this.reporttypeId.trim(),
      lrl1Category: this.category,
      lrl1Name: this.reportname
    });

    this.api.wsPostHeader(APIName.addNewReport, data).then((resp: any) => {
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
}
