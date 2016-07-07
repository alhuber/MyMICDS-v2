"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var mockdata_service_1 = require('../mockdata.service');
var common_1 = require('@angular/common');
var platform_browser_1 = require('@angular/platform-browser');
var router_2 = require('@angular/router');
var auth_service_1 = require('../services/auth.service');
var http_1 = require('@angular/http');
var user_service_1 = require('../services/user.service');
var _navService = new mockdata_service_1.DomData();
var styleUrl = _navService.getNav().selectedStyle.StyleUrl;
var templateUrl = _navService.getNav().selectedStyle.TemplateUrl;
var NavComponent = (function () {
    function NavComponent(_titleService, _DomService, router, authService, userService) {
        this._titleService = _titleService;
        this._DomService = _DomService;
        this.router = router;
        this.authService = authService;
        this.userService = userService;
        this.blur = [false, false, false, false, false];
        this.isActive = [true, false, false, false, false];
        this.pages = this._DomService.getNav().navTitles;
        //emit events to alert the other components to render the app
        this.selectedPage = 'Home';
        this.loginModel = {
            user: '',
            password: '',
            remember: '',
        };
        this.formActive = true;
    }
    NavComponent.prototype.restore = function (x) {
        for (var i = 0; i < this.isActive.length; i++) {
            this.isActive[i] = false;
        }
    };
    NavComponent.prototype.magnify = function (x) {
        this.restore(x);
        this.isActive[x] = true;
    };
    NavComponent.prototype.applyBlur = function (x) {
        for (var i = 0; i < this.blur.length; i++) {
            if (i != x) {
                this.blur[i] = true;
            }
        }
    };
    NavComponent.prototype.removeBlur = function (x) {
        for (var i = 0; i < this.blur.length; i++) {
            this.blur[i] = false;
        }
    };
    NavComponent.prototype.mouseEnter = function (x) {
        this.applyBlur(x);
    };
    NavComponent.prototype.mouseLeave = function (x) {
        this.removeBlur(x);
    };
    NavComponent.prototype.onSelect = function (x) {
        var _this = this;
        this.restore(x);
        this.magnify(x);
        this.previousSelectedPage = this.selectedPage;
        this.selectedPage = this._DomService.getNav().navTitles[x];
        if (this.previousSelectedPage != this.selectedPage) {
            var p = new Promise(function (resolve, reject) {
                document.getElementById("my-fadeout").className += "fade-out";
                setTimeout(function () { resolve(''); }, 400);
            });
            p.then(function () {
                _this.router.navigate(['/' + _this.pages[x]]);
                _this._titleService.setTitle("MockUp-" + _this._DomService.getNav().navTitles[x]);
            }).catch(function (e) {
                console.error(e);
                _this.router.navigate(['/' + _this.pages[x]]);
                _this._titleService.setTitle("MockUp-" + _this._DomService.getNav().navTitles[x]);
            });
        }
    };
    //form related variables and methods
    //todo: separate this into another component
    NavComponent.prototype.ngOnInit = function () {
        console.log('logging out');
        this.onClickLogout();
    };
    NavComponent.prototype.onClickLogin = function () {
        var _this = this;
        this.authService.logIn(this.loginModel).subscribe(function (loginRes) {
            _this.loginRes = loginRes;
            if (loginRes.error) {
                _this.errorMessage = loginRes.error;
                console.log(_this.errorMessage);
            }
            else {
                _this.isLoggedIn = true;
                $('#loginModal').modal('hide');
                _this.router.navigate(['/' + _this.selectedPage]);
                _this.userService.getInfo().subscribe(function (userInfo) {
                    if (userInfo.error) {
                        _this.userErrMsg = userInfo.error;
                    }
                    else {
                        _this.userName = userInfo.user.firstName + ' ' + userInfo.user.lastName;
                    }
                }, function (error) {
                    _this.userErrMsg = error;
                });
            }
        }, function (error) {
            _this.errorMessage = error;
            console.log('If this keeps happening, contact the support!');
        });
    };
    NavComponent.prototype.onClickLogout = function () {
        var _this = this;
        this.authService.logOut().subscribe(function (logoutRes) {
            console.log(logoutRes.error ? logoutRes.error : 'Logout Successful!');
            if (!logoutRes.error) {
                _this.isLoggedIn = false;
            }
        });
    };
    NavComponent.prototype.onClickAccount = function () {
        this.router.navigate(['/Account']);
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'my-nav',
            templateUrl: templateUrl,
            directives: [common_1.NgClass, router_1.ROUTER_DIRECTIVES, common_1.NgIf],
            providers: [mockdata_service_1.DomData, auth_service_1.AuthService, http_1.HTTP_PROVIDERS, user_service_1.UserService],
            styleUrls: [styleUrl]
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, mockdata_service_1.DomData, router_2.Router, auth_service_1.AuthService, user_service_1.UserService])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map