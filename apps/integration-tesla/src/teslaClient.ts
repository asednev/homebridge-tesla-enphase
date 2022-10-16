import * as tjs from 'teslajs';

export class TeslaClient {

    constructor(private accessToken: string) {

    }

    public getOptions(vehicleId: string = "") { 
        return {
            authToken: this.accessToken,
            vehicleID: vehicleId
        };
    }

    async listVehicles() {
        const vehicles = await tjs.vehiclesAsync(this.getOptions());
        return vehicles;
    }

    getVehicle(vehicleId: string) {
        return new VehicleContainer(this, vehicleId);
    }


}

export class VehicleContainer {

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
        const chargeState =  await tjs.chargeStateAsync(this.getOptions());
        return chargeState;
    }

    async setChargeLimit() {
        // tjs.setChargeLimit(this.getOptions());
        
    }

    // TODO: needs testing
    async setChargingAmps(amps: number) {
        console.warn("untested API call");
        await tjs.post_commandAsync(this.getOptions(), "set_charging_amps", { charging_amps: amps});
    }
}