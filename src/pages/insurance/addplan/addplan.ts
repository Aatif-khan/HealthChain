import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { showToast } from '../../../providers/commonfunction/commonfunction';

/**
 * Generated class for the AddplanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addplan',
  templateUrl: 'addplan.html',
})
export class AddplanPage {

  /* <ion-item>
        <ion-label color="" floating>Plan name</ion-label>
        <ion-input type="text" name="planname" [(ngModel)]="account.planname" ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label color="" floating>Description</ion-label>
        <ion-input type="text" name="Desciption" [(ngModel)]="account.description"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label color="" floating>Coverage</ion-label>
        <ion-input type="text" name="Coverage" [(ngModel)]="account.coverage" ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label color="" floating>Disease Associated</ion-label>
        <ion-input type="text" name="Disease" [(ngModel)]="account.disease" ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label color="" floating>Years</ion-label>
        <ion-input type="text" name="Years" [(ngModel)]="account.years" ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label color="" floating>Additional Detail</ion-label>
        <ion-input type="text" name="Additionaldetail" [(ngModel)]="account.additionaldetail"></ion-input>
      </ion-item> */
account: { planname: string, description: string , coverage: string ,disease: string ,years: string,additionaldetail: string } = {
  planname: '',
  description: '',
  coverage:'',
  disease:"",
  years:"",
  additionaldetail: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController,public api:ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddplanPage');
  }

  callAddPlanApi() {

    if (this.account.planname.length == 0) {
      showToast("Please enter Plan name", this.toastCtrl)
      return
    }
    if (this.account.description.length == 0) {
      showToast("Please select Description", this.toastCtrl)
      return
    }
    
    if (this.account.coverage.length == 0) {
      showToast("Please select Coverage", this.toastCtrl)
      return
    }
    if (this.account.disease.length == 0) {
      showToast("Please select Disease Associated", this.toastCtrl)
      return
    }
    if (this.account.years.length == 0) {
      showToast("Please select Years", this.toastCtrl)
      return
    }
    if (this.account.additionaldetail.length == 0) {
      showToast("Please select Additional Detail", this.toastCtrl)
      return
    }
    

    let data = JSON.stringify({
      // fclProviderMapID: { fclProviderMapID: this.fclProviderMapID },
      // specialityMaster: { specialityID: this.specialityID },
      // patAppDate: new Date().toISOString(),
      // patAppTimeFrom: this.changeStringToDate(this.patAppDate + ' ' + this.patAppTimeFrom),
      // patAppTimeTo: this.changeStringToDate(this.patAppDate + ' ' + this.patAppTimeTo),
      // patAppType: this.visittypeId,
      // patAppDescription: this.patAppDescription,
      // patAppStatus: 'Pending'
    });

    this.api.wsPostHeader('', data).then((resp: any) => {
      if(resp.status === 500) {
        // showToast( resp.error.message, this.toastCtrl)
      }
      else
      {
      showToast("" + resp.message, this.toastCtrl)

      this.navCtrl.pop()
      }
    });

  }
}
