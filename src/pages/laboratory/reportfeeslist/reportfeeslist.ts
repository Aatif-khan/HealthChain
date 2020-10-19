import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { ApiProvider } from "../../../providers/api/api";
import {
  APIName,
  selectedRole
} from "../../../providers/commonfunction/commonfunction";
import { AddreportfeesPage } from "../addreportfees/addreportfees";
import { EditreportfeesPage } from "../editreportfees/editreportfees";

@IonicPage()
@Component({
  selector: "page-reportfeeslist",
  templateUrl: "reportfeeslist.html"
})
export class ReportfeeslistPage {
  appointmentTodayItems: any = [];
  reportFeesList: any = [];
  reportFeesListData: any = [];

  selectRole: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    this.reportFeesList = this.appointmentTodayItems;
    this.selectRole = localStorage.getItem(selectedRole);
    this.api.wsGet(APIName.getLabReportMaster, "").then((resp: any) => {
      this.appointmentTodayItems = resp.data.labReportMasterPojo;
      this.reportFeesListData = resp.data.labReportMasterPojo;
      this.reportFeesList = resp.data.labReportMasterPojo;
    });
  }

  addItem() {
    this.navCtrl.push(AddreportfeesPage);
  }

  editreportfees(item: any) {
    this.navCtrl.push(EditreportfeesPage, { id: item.reportId });
  }
}
