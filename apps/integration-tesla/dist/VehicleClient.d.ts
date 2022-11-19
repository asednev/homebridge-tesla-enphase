import * as tjs from 'teslajs';
import { ChargeState, ITeslaVehicleClient } from 'core';
import { TeslaClient } from './TeslaClient';
export declare class VehicleClient implements ITeslaVehicleClient {
    private teslaClient;
    private vehicleId;
    constructor(teslaClient: TeslaClient, vehicleId: string);
    private getOptions;
    vehicleDetails(): Promise<tjs.Vehicle>;
    chargeState(): Promise<ChargeState>;
    setChargingAmps(amps: number): Promise<void>;
}
//# sourceMappingURL=VehicleClient.d.ts.map