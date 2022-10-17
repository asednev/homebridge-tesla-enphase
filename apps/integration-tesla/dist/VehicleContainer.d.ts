import * as tjs from 'teslajs';
import { ChargeState } from './types/ChargeState';
import { TeslaClient } from './TeslaClient';
export declare class VehicleClient {
    private teslaClient;
    private vehicleId;
    constructor(teslaClient: TeslaClient, vehicleId: string);
    private getOptions;
    vehicleDetails(): Promise<tjs.Vehicle>;
    chargeState(): Promise<ChargeState>;
    setChargingAmps(amps: number): Promise<void>;
}
//# sourceMappingURL=VehicleContainer.d.ts.map