import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PharmadeliveredPage } from "../../pharmadelivered/pharmadelivered";
import { ApiProvider } from "../../../providers/api/api";
import { APIName } from "../../../providers/commonfunction/commonfunction";
import { TransactionhistoryPage } from "../../doctor/transactionhistory/transactionhistory";

/**
 * Generated class for the DashBoardForMedicalstorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-dash-board-for-medicalstore",
  templateUrl: "dash-board-for-medicalstore.html"
})
export class DashBoardForMedicalstorePage {
  pharmadeliveredlistCount: any = "";
  transactionHistorycount: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad DashBoardForMedicalstorePage");

    this.api.wsGet(APIName.getpharmadeliverdpharma, "").then((resp: any) => {
      this.pharmadeliveredlistCount = resp.data.totalNumber;
    });
    this.api
      .wsGet(APIName.getAllPharmaTransactionHistory, "")
      .then((resp: any) => {
        this.transactionHistorycount = resp.data.totalNumber;
      });
  }
  viewPharmaDeliveredList() {
    this.navCtrl.push(PharmadeliveredPage);
  }
  viewTransactionList() {
    this.navCtrl.push(TransactionhistoryPage);
  }
}
