import * as tjs from 'teslajs';
export declare class TeslaClient {
    private accessToken;
    constructor(accessToken: string);
    getOptions(vehicleId?: string): {
        authToken: string;
        vehicleID: string;
    };
    listVehicles(): Promise<{
        [key: string]: string | number | boolean | null;
    }[]>;
    getVehicle(vehicleId: string): VehicleContainer;
}
export declare class VehicleContainer {
    private teslaClient;
    private vehicleId;
    constructor(teslaClient: TeslaClient, vehicleId: string);
    private getOptions;
    vehicleDetails(): Promise<tjs.Vehicle>;
    chargeState(): Promise<object>;
    setChargeLimit(): Promise<void>;
    setChargingAmps(amps: number): Promise<void>;
}
//# sourceMappingURL=teslaClient.d.ts.map