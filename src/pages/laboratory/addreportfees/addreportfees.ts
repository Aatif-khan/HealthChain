import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import {
  APIName,
  showToast
} from "../../../providers/commonfunction/commonfunction";
import { ApiProvider } from "../../../providers/api/api";
import { AddnewreportPage } from "../addnewreport/addnewreport";
/**
 * Generated class for the AddreportfeesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-addreportfees",
  templateUrl: "addreportfees.html"
})
export class AddreportfeesPage {
  public AllReportList: any = [];

  public labReportLevel1ID: any = "";
  public Cost: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddreportfeesPage");

    this.WsGetAllLab1ReportByLab();
  }

  callAddAppointmentApi() {
    if (this.labReportLevel1ID.length == 0) {
      showToast("Please select Report", this.toastCtrl);
      return;
    }
    if (this.Cost.length == 0) {
      showToast("Please select Cost", this.toastCtrl);
      return;
    }

    let data = JSON.stringify({
      labReportLevel1ID: this.labReportLevel1ID,
      costperreport: this.Cost
    });

    this.api.wsPostHeader(APIName.addReportFees, data).then((resp: any) => {
      if (resp.status === 500) {
        showToast(resp.error.message, this.toastCtrl);
      } else {
        showToast("" + resp.message, this.toastCtrl);

        this.navCtrl.pop();
      }
    });
  }

  WsGetAllLab1ReportByLab() {
    this.api
      .wsPostHeaderBackground(APIName.getAllLab1ReportByLab, {})
      .then(resp => {
        // let Temparray: any = resp;
        // this.AllReportList = Temparray.data;
        // console.log("this.AllReportList" + JSON.stringify(this.AllReportList));

        if (resp.status === 500) {
          // showToast( resp.error.message, this.toastCtrl)
        } else {
          this.AllReportList = resp.data;
          // this.labReportLevel1ID = this.AllReportList[0].labReportLevel1ID;
        }

        // this.WsGetAllDiagnosis();
      });
  }

  addNewReport() {
    this.navCtrl.push(AddnewreportPage);
  }
}
