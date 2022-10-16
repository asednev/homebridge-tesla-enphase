import * as tjs from 'teslajs';
import { TeslaClient } from './TeslaClient';
export declare class VehicleClient {
    private teslaClient;
    private vehicleId;
    constructor(teslaClient: TeslaClient, vehicleId: string);
    private getOptions;
    vehicleDetails(): Promise<tjs.Vehicle>;
    chargeState(): Promise<{
        BatteryLevel: any;
        ChargeAmps: any;
        ChargeRate: any;
        ChargerActualCurrent: any;
        ChargerPilotCurrent: any;
        ChargerVoltage: any;
        MinutesToFullCharge: any;
        raw: any;
    }>;
    setChargingAmps(amps: number): Promise<void>;
}
//# sourceMappingURL=VehicleContainer.d.ts.map