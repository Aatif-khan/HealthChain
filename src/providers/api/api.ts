import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  showAlert,
  username,
  password,
  showProgressbar,
  hideProgressbar,
  networkAlert,
  showToast
} from "../commonfunction/commonfunction";
import {
  ToastController,
  LoadingController,
  AlertController
} from "ionic-angular";
// import { FileUploadOptions } from "@ionic-native/transfer";
import { FileTransferObject, FileTransfer } from "@ionic-native/file-transfer";
import { Network } from "@ionic-native/network";
import { disconnect } from "cluster";

@Injectable()
export class ApiProvider {
  public loader;

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private network: Network
  ) {
    this.checkConnectionWatch();
  }

  // return this.http.get("api/foobar")
  // .map(response => response.json())
  // .retry(2)
  // .subscribe(onNext,
  //            error =>
  //            console.log("An error occurred when requesting api/foobar.", error));

  // wsGet(endpoint: string, params?: any, reqOpts?: any) {
  //   if (!reqOpts) {
  //     reqOpts = {
  //       params: new HttpParams()
  //     };
  //   }

  //   // Support easy query params for GET requests
  //   if (params) {
  //     reqOpts.params = new HttpParams();
  //     for (let k in params) {
  //       reqOpts.params = reqOpts.params.set(k, params[k]);
  //     }
  //   }

  //   return this.http.get(endpoint, reqOpts);
  // }

  wsGet(endpoint: string, body: any) {
    // this.checkConnectionWatch();
    showProgressbar(this.loadingCtrl);
    let strConcate =
      localStorage.getItem(username) + ":" + localStorage.getItem(password);
    let strBase64: string = "Basic " + btoa(strConcate);
    console.log("strConcate" + " = " + strConcate);
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: strBase64
      }),
      body: body
    };
    return (
      this.http
        .request("GET", endpoint, httpOptions)
        // return this.http.request('POST',endpoint, body, httpOptions)
        .toPromise()
        .then((resp: any) => {
          console.log("wsGetHeader : success0 >>", resp);

          // If the API returned a successful response, mark the user as logged in
          hideProgressbar(this.loadingCtrl);
          return resp;
        })
        .catch((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              hideProgressbar(this.loadingCtrl);
              showAlert(
                err.message,
                this.alertCtrl,
                networkAlert,
                1
              ).then(result => {});
            }
          }
        })
    );
  }
  wsGetBG(endpoint: string, body: any) {
    // this.checkConnectionWatch();
    // showProgressbar(this.loadingCtrl);
    let strConcate =
      localStorage.getItem(username) + ":" + localStorage.getItem(password);
    let strBase64: string = "Basic " + btoa(strConcate);
    console.log("strConcate" + " = " + strConcate);
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: strBase64
      }),
      body: body
    };
    return (
      this.http
        .request("GET", endpoint, httpOptions)
        // return this.http.request('POST',endpoint, body, httpOptions)
        .toPromise()
        .then((resp: any) => {
          console.log("wsGetHeader : success0 >>", resp);

          // If the API returned a successful response, mark the user as logged in
          // hideProgressbar(this.loadingCtrl);
          return resp;
        })
        .catch((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              // hideProgressbar(this.loadingCtrl);
              showAlert(
                err.message,
                this.alertCtrl,
                networkAlert,
                1
              ).then(result => {});
            }
          }
        })
    );
  }

  wsPost(endpoint: string, body: any) {
    // this.checkConnectionWatch();
    // return this.http.post(, body, reqOpts);
    showProgressbar(this.loadingCtrl);

    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    let seq = this.http.post(endpoint, body, httpOptions);
    seq.subscribe(
      (resp: any) => {
        hideProgressbar(this.loadingCtrl);
        return seq;
      },
      err => {
        hideProgressbar(this.loadingCtrl);
        showAlert(err.error.message, this.alertCtrl, networkAlert, 1).then(
          result => {
            // if(result) {
            //   console.log('trueAkki:--- '+result);
            //   // do something
            // }
            // else{
            //   console.log('falseAkki:--- '+result);
            // }
          }
        );
        return false;
      }
    );
    return seq;
    // return this.http.post(this.url + '/' + endpoint, body,httpOptions);
  }

  wsPostHeaderBackground(endpoint: string, body: any) {
    // this.checkConnectionWatch();
    let strConcate =
      localStorage.getItem(username) + ":" + localStorage.getItem(password);
    let strBase64: string = "Basic " + btoa(strConcate);
    console.log("strConcate" + " = " + strConcate);
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: strBase64
      })
    };
    return this.http
      .post(endpoint, body, httpOptions)
      .toPromise()
      .then((resp: any) => {
        console.log("wsPostHeaderBackground : success0 >>", resp);
        return resp;
      })
      .catch((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log("Aditya");
          }
          if (err.status === 500) {
            showToast(err.error.message, this.toastCtrl);
            console.log("Error===*******", err.error.message);
            return err;
          }
        }
      });
  }

  wsPostMutlipartHeader(endpoint: string, formData: FormData) {
    // this.checkConnectionWatch();
    showProgressbar(this.loadingCtrl);
    let strConcate =
      localStorage.getItem(username) + ":" + localStorage.getItem(password);
    let strBase64: string = "Basic " + btoa(strConcate);
    console.log("strConcate" + " = " + strConcate);
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: strBase64 }),
      body: formData
    };
    return this.http
      .request("POST", endpoint, httpOptions)
      .toPromise()
      .then((resp: any) => {
        console.log("wsPostHeader : success >> ", resp);

        // If the API returned a successful response, mark the user as logged in
        hideProgressbar(this.loadingCtrl);
        return resp;
      })
      .catch((err: any) => {
        console.log("wsPostHeader : failure >> ", err);
        hideProgressbar(this.loadingCtrl);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log("Aditya");
          }
        }
        return false;
      });
  }

  wsPostHeader(endpoint: string, body: any) {
    // this.checkConnectionWatch();
    showProgressbar(this.loadingCtrl);
    let strConcate =
      localStorage.getItem(username) + ":" + localStorage.getItem(password);
    let strBase64: string = "Basic " + btoa(strConcate);
    console.log("strConcate" + " = " + strConcate);
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: strBase64
      }),
      body: body
    };
    return (
      this.http
        .request("POST", endpoint, httpOptions)
        // return this.http.request('POST',endpoint, body, httpOptions)
        .toPromise()
        .then((resp: any) => {
          console.log("wsPostHeader : success0 >>", resp);

          // If the API returned a successful response, mark the user as logged in
          hideProgressbar(this.loadingCtrl);
          return resp;
        })
        .catch((err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.log("err.message = " + err.error.message);
            if (err.status === 401) {
              hideProgressbar(this.loadingCtrl);
              showAlert(
                err.message,
                this.alertCtrl,
                networkAlert,
                1
              ).then(result => {});
            } else {
              if (err.status === 500) {
                showToast(err.error.message, this.toastCtrl);

                hideProgressbar(this.loadingCtrl);
                return err;

                // showAlert(err.error.message,this.alertCtrl,networkAlert,1).then((result) => {
                //  });
              }
            }
          }
        })
    );
  }

  checkConnectionWatch() {
    let networkState = this.network.type;

    if (networkState == "none") {
      this.toastCtrl
        .create({
          message: "please on your network connection",
          duration: 3000
        })
        .present();
    }
    console.log("in Connection Chck : " + this.network.type);
    this.network.onConnect().subscribe(() => {
      this.toastCtrl
        .create({
          message: "NETWORK CONNECTED",
          duration: 3000
        })
        .present();
    });

    this.network.onDisconnect().subscribe(() => {
      this.toastCtrl
        .create({
          message: "NETWORK DISCONNECTED",
          duration: 3000
        })
        .present();
    });

    this.network.onDisconnect().subscribe(() => {
      this.toastCtrl
        .create({
          message: "please on your network connection",
          duration: 3000
        })
        .present();
    });
  }
  /*
    wsPostHeader(endpoint: string, body: any) {
      
      showProgressbar(this.loadingCtrl);
  
      let strConcate = localStorage.getItem(username) + ':' + localStorage.getItem(password)
      let strBase64 : string = 'Basic ' + btoa(strConcate) 
      const httpOptions = {
        // headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
        headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':strBase64 })
      };
      // return this.http.post(this.url + '/' + endpoint, body,httpOptions);
      let seq = this.http.post(endpoint, body,httpOptions);
      seq.subscribe((resp: any) => {
        console.log('wsPostHeader : success0 >>',resp);
        // If the API returned a successful response, mark the user as logged in
        hideProgressbar(this.loadingCtrl);
            return seq;
        
      }, (err) => {
        console.log('wsPostHeader : err >> ',err);
        hideProgressbar(this.loadingCtrl);
        showAlert(err.error.message,this.alertCtrl,networkAlert,1).then((result) => {
          // if(result){
          //   console.log('trueAkki:--- '+result);
          //   // do something
          // }
          // else{
          //   console.log('falseAkki:--- '+result);
          // }
        });
        return false
      });
      return seq;
    }
    wsPostHeaderBackground(endpoint: string, body: any) {
      
      //showProgressbar(this.loadingCtrl);
  
      let strConcate = localStorage.getItem(username) + ':' + localStorage.getItem(password)
      let strBase64 : string = 'Basic ' + btoa(strConcate) 
      const httpOptions = {
        // headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
        headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':strBase64 })
      };
      // return this.http.post(this.url + '/' + endpoint, body,httpOptions);
      let seq = this.http.post(endpoint, body,httpOptions);
      seq.subscribe((resp: any) => {
        console.log('wsPostHeader : success0 >>',resp);
            return seq;
        
      }, (err) => {
        console.log('wsPostHeader : err >> ',err);
        showAlert(err.error.message,this.alertCtrl,networkAlert,1).then((result) => {
        
          
        });
        return false
      });
      return seq;
    }
    */

  uploadFile(
    endpoint: string,
    imageURI: string,
    options: any,
    transfer: FileTransfer
  ) {
    // this.checkConnectionWatch();
    showProgressbar(this.loadingCtrl);

    const fileTransfer: FileTransferObject = transfer.create();
    return fileTransfer.upload(imageURI, endpoint, options).then(
      (resp: any) => {
        hideProgressbar(this.loadingCtrl);
        console.log("uploadFile >> ", JSON.stringify(resp));
        return resp;
      },
      err => {
        console.log("uploadFile >> ", err);
        hideProgressbar(this.loadingCtrl);
        return err;
      }
    );
  }
}
