import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DatePipe } from '@angular/common';
import { selectedRole, APIName } from '../../providers/commonfunction/commonfunction';
import { MedicineinventoryPage } from '../medicineinventory/medicineinventory';
import { EditemedicineinventoryPage } from '../editemedicineinventory/editemedicineinventory';

/**
 * Generated class for the ListmedicineinventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listmedicineinventory',
  templateUrl: 'listmedicineinventory.html',
})
export class ListmedicineinventoryPage {

  zone: any;
  modeKeys: any[];
  appointmentTodayItemes: any = [];
  currentAppointlist: any = [];
  medicineinventorylist: any = [];
  selectRole: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ApiProvider,
    private alertCtrl: AlertController,
    public datepipe: DatePipe) {
      this.currentAppointlist = this.appointmentTodayItemes;
      this.selectRole = localStorage.getItem(selectedRole);

      if (localStorage.getItem(selectedRole) == "MedicalCenter") {

        this.api.wsGet(APIName.getlistmedicineinventory, "").then((resp: any) => {
          this.medicineinventorylist = resp.data.medicineinventorylistpojo;
        });
     
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListmedicineinventoryPage');
  }

  addItem() {
    this.navCtrl.push(MedicineinventoryPage);
  }

  editItem(item:any)
  {
    this.navCtrl.push(EditemedicineinventoryPage,{id:item.medicineId});
  }

}
