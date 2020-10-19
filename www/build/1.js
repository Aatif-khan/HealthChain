webpackJsonp([1],{

/***/ 1022:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemographiclabPageModule", function() { return DemographiclabPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__demographiclab__ = __webpack_require__(1097);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DemographiclabPageModule = /** @class */ (function () {
    function DemographiclabPageModule() {
    }
    DemographiclabPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__demographiclab__["a" /* DemographiclabPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__demographiclab__["a" /* DemographiclabPage */]),
            ],
        })
    ], DemographiclabPageModule);
    return DemographiclabPageModule;
}());

//# sourceMappingURL=demographiclab.module.js.map

/***/ }),

/***/ 1097:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemographiclabPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_commonfunction_commonfunction__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the DemographiclabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DemographiclabPage = /** @class */ (function () {
    function DemographiclabPage(navCtrl, navParams, api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.locationArray = [];
        this.states = [
            {
                title: 'States',
                id: 1
            },
            {
                title: 'Gujarat',
                id: 2
            }
        ];
        this.selectedState = this.states[0];
        this.countries = [
            {
                title: 'Country',
                id: 1
            },
            {
                title: 'India',
                id: 2
            },
            {
                title: 'Greece',
                id: 3
            },
            {
                title: 'Tonga',
                id: 4
            }
        ];
        this.selectedCountry = this.countries[0];
        this.demographicProfile = {
            addressLine1: '',
            addressLine2: '',
            addressLine3: '',
            zipcode: '',
            state: '',
            country: '',
            phone: ''
        };
    }
    DemographiclabPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfiledemographicPage');
        this.getAllLocations();
    };
    /**
     * get list of cities
     */
    DemographiclabPage.prototype.getAllLocations = function () {
        var _this = this;
        this.api.wsPostHeader(__WEBPACK_IMPORTED_MODULE_3__providers_commonfunction_commonfunction__["a" /* APIName */].getLocations, "").then(function (resp) {
            if (resp.status === 500) {
                // showToast( resp.error.message, this.toastCtrl)
            }
            else {
                _this.locationArray = resp;
                _this.selectedLocation = _this.locationArray[0].locationID;
                console.log("location array 0 item", _this.locationArray[0].locationID);
            }
        });
    };
    DemographiclabPage.prototype.getDemographicData = function () {
        var _this = this;
        this.api.wsPostHeader(__WEBPACK_IMPORTED_MODULE_3__providers_commonfunction_commonfunction__["a" /* APIName */].getDemographicData, "").then(function (resp) {
            if (resp.status === 500) {
                // showToast( resp.error.message, this.toastCtrl)
            }
            else {
                _this.locationArray = resp;
                _this.selectedLocation = _this.locationArray[0].locationID;
                console.log("location array 0 item", _this.locationArray[0].locationID);
            }
        });
    };
    DemographiclabPage.prototype.updatePatientDemographicProfile = function () {
        var _this = this;
        this.api.wsPostHeader(__WEBPACK_IMPORTED_MODULE_3__providers_commonfunction_commonfunction__["a" /* APIName */].updatePatientDemographicProfile, this.demographicProfile).then(function (resp) {
            if (resp.status === 500) {
                // showToast( resp.error.message, this.toastCtrl)
            }
            else {
                _this.demographicProfile = resp;
                console.log("demographicProfile", resp);
            }
        });
    };
    DemographiclabPage.prototype.showlocation = function (locationID) {
        console.log("locationid >> " + locationID);
        this.selectedLocation = locationID;
    };
    DemographiclabPage.prototype.addAddress = function () {
    };
    DemographiclabPage.prototype.submitDetails = function () {
    };
    DemographiclabPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-demographiclab',template:/*ion-inline-start:"/home/yashdadia/aatif ionic/ionic/src/pages/laboratory/demographiclab/demographiclab.html"*/'<!--\n  Generated template for the DemographiclabPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>demographiclab</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/yashdadia/aatif ionic/ionic/src/pages/laboratory/demographiclab/demographiclab.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiProvider */]])
    ], DemographiclabPage);
    return DemographiclabPage;
}());

//# sourceMappingURL=demographiclab.js.map

/***/ })

});
//# sourceMappingURL=1.js.map