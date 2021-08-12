"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultConfig = {
    time: '5m',
    expUnit: 's',
    expName: 'exp',
};
var unit;
(function (unit) {
    unit["s"] = "s";
    unit["S"] = "S";
    unit["m"] = "m";
    unit["M"] = "M";
    unit["h"] = "h";
    unit["H"] = "H";
    unit["d"] = "d";
    unit["D"] = "D";
})(unit || (unit = {}));
var unitToSecond = {
    s: 1,
    S: 1,
    m: 60,
    M: 60,
    h: 3600,
    H: 3600,
    d: 86400,
    D: 86400,
};
var CheckJWT = /** @class */ (function () {
    function CheckJWT(config) {
        this.defaultConfig = __assign(__assign({}, defaultConfig), config);
    }
    CheckJWT.prototype.setConfig = function (config) {
        this.defaultConfig = __assign(__assign({}, this.defaultConfig), config);
    };
    CheckJWT.getTokenPayload = function (token) {
        return JSON.parse(atob(token.split('.')[1]));
    };
    CheckJWT.prototype.getUpperSecond = function () {
        var _a = this.defaultConfig.time.match(/[a-zA-Z]+|[0-9]+/g), num = _a[0], unit = _a[1];
        return parseInt(num) * unitToSecond[unit];
    };
    CheckJWT.prototype.getTokenExp = function (token) {
        var exp = parseInt(CheckJWT.getTokenPayload(token)[this.defaultConfig.expName]);
        return exp * unitToSecond[this.defaultConfig.expUnit];
    };
    CheckJWT.prototype.getTimeNow = function () {
        var dateNow = Date.now();
        return Math.round(dateNow / 1000);
    };
    CheckJWT.prototype.checkIsNotTimeOut = function (tokenExpTime, nowTime, upperSecond) {
        if (upperSecond === void 0) { upperSecond = 0; }
        var targetTime = tokenExpTime - upperSecond;
        if (targetTime - nowTime >= 1)
            return true;
        return false;
    };
    CheckJWT.prototype.checkIsOverTokenExp = function (token) {
        return this.checkIsNotTimeOut(this.getTokenExp(token), this.getTimeNow());
    };
    CheckJWT.prototype.checkIsOverLimitTime = function (token) {
        return this.checkIsNotTimeOut(this.getTokenExp(token), this.getTimeNow(), this.getUpperSecond());
    };
    CheckJWT.prototype.create = function (config) {
        var checkJwt = new CheckJWT(__assign(__assign({}, this.defaultConfig), config));
        return checkJwt;
    };
    CheckJWT.prototype.check = function (token) {
        var isNotExpired = this.checkIsOverTokenExp(token);
        var isNotOverTime = this.checkIsOverLimitTime(token);
        return [isNotExpired, isNotOverTime];
    };
    return CheckJWT;
}());
var checkJWT = new CheckJWT(defaultConfig);
exports.default = checkJWT;
