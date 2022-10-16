"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeslaClient = exports.ClientBase = void 0;
const tjs = __importStar(require("teslajs"));
const VehicleContainer_1 = require("./VehicleContainer");
const request = __importStar(require("request"));
class ClientBase {
    refreshToken;
    accessToken;
    constructor(refreshToken, accessToken = "") {
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
    }
    getOptions(vehicleId = "") {
        return {
            authToken: this.accessToken,
            vehicleID: vehicleId
        };
    }
    async refreshAuthToken() {
        return new Promise((resolve, reject) => {
            // inspired by https://github.com/nfarina/homebridge-tesla/blob/master/src/util/token.ts
            request.defaults({
                headers: {
                    "x-tesla-user-agent": "TeslaApp/3.4.4-350/fad4a582e/android/8.1.0",
                    "user-agent": "Mozilla/5.0 (Linux; Android 8.1.0; Pixel XL Build/OPM4.171019.021.D1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36",
                },
                json: true,
                gzip: true,
                body: {},
            });
            request.post("https://auth.tesla.com/oauth2/v3/token", {
                json: true,
                body: {
                    grant_type: "refresh_token",
                    client_id: "ownerapi",
                    refresh_token: this.refreshToken,
                    scope: "openid email offline_access",
                },
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }
                this.accessToken = body.access_token;
                // body.refresh_token;
                // body.id_token;
                // body.expires_in;
                // TODO: take advantage of expires_in to refresh token before its expiration
                resolve(body);
            });
        });
    }
    async ensureAuth() {
        await this.refreshAuthToken();
    }
}
exports.ClientBase = ClientBase;
class TeslaClient extends ClientBase {
    constructor(refreshToken, accessToken = "") {
        super(refreshToken, accessToken);
    }
    async listVehicles() {
        const vehicles = await tjs.vehiclesAsync(this.getOptions());
        return vehicles.map(x => {
            return {
                VehicleId: x.id_s,
                Vin: x.vin,
                DisplayName: x.display_name,
                State: x.state,
                Raw: x
            };
        });
    }
    getVehicle(vehicleId) {
        return new VehicleContainer_1.VehicleClient(this, vehicleId);
    }
}
exports.TeslaClient = TeslaClient;
