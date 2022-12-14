import { VehicleClient } from './VehicleClient';
import { Vehicle } from 'core';
export declare class ClientBase {
    private refreshToken;
    private accessToken;
    constructor(refreshToken: string, accessToken?: string);
    getOptions(vehicleId?: string): {
        authToken: string;
        vehicleID: string;
    };
    protected refreshAuthToken(): Promise<unknown>;
    ensureAuth(): Promise<void>;
}
export declare class TeslaClient extends ClientBase {
    constructor(refreshToken: string, accessToken?: string);
    listVehicles(): Promise<Vehicle[]>;
    getVehicle(vehicleId: string): VehicleClient;
}
//# sourceMappingURL=TeslaClient.d.ts.map