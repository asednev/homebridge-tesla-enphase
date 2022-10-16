import * as tjs from 'teslajs';
import { VehicleClient } from './VehicleContainer';
import * as request from 'request';
import { Vehicle } from './types/Vehicle';
import { VehicleState } from './types/VehicleState';

export class ClientBase {

    constructor(private refreshToken: string, private accessToken: string = "") {

    }

    public getOptions(vehicleId: string = "") {
        return {
            authToken: this.accessToken,
            vehicleID: vehicleId
        };
    }

    protected async refreshAuthToken() {

        return new Promise((resolve, reject) => {

            // inspired by https://github.com/nfarina/homebridge-tesla/blob/master/src/util/token.ts

            request.defaults({
                headers: {
                    "x-tesla-user-agent": "TeslaApp/3.4.4-350/fad4a582e/android/8.1.0",
                    "user-agent":
                        "Mozilla/5.0 (Linux; Android 8.1.0; Pixel XL Build/OPM4.171019.021.D1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36",
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

    public async ensureAuth() {
        await this.refreshAuthToken();
    }
}

export class TeslaClient extends ClientBase {

    constructor(refreshToken: string, accessToken: string = "") {
        super(refreshToken, accessToken);
    }

    async listVehicles(): Promise<Vehicle[]> {
        const vehicles = await tjs.vehiclesAsync(this.getOptions());
        return vehicles.map(x => {
            return <Vehicle> {
                VehicleId: x.id_s,
                Vin: x.vin,
                DisplayName: x.display_name,
                State: <VehicleState>x.state,
                Raw: x
            }
        });
    }

    getVehicle(vehicleId: string) {
        return new VehicleClient(this, vehicleId);
    }


}