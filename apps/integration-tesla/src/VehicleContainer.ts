import * as tjs from 'teslajs';
import { TeslaClient } from './TeslaClient';


export class VehicleClient {

    constructor(private teslaClient: TeslaClient, private vehicleId: string) {
    }

    private getOptions() {
        return this.teslaClient.getOptions(this.vehicleId);
    }

    async vehicleDetails() {
        const vehicle = await tjs.vehicleAsync(this.getOptions());
        return vehicle;
    }

    async chargeState() {
        const chargeState = await tjs.chargeStateAsync(this.getOptions());
        return chargeState;
    }
    
    // TODO: needs testing
    async setChargingAmps(amps: number) {
        console.warn("untested API call");
        await tjs.post_commandAsync(this.getOptions(), "set_charging_amps", { charging_amps: amps });
    }
}