import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IncomingmedicinerequiredlistviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incomingmedicinerequiredlistview',
  templateUrl: 'incomingmedicinerequiredlistview.html',
})
export class IncomingmedicinerequiredlistviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomingmedicinerequiredlistviewPage');
  }

}
