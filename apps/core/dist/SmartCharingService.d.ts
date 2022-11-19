import { ChargeState, TeslaVehicleService } from "./tesla";
import { EnphaseService, IvpMeterBundle } from "./enphase";
export declare class SmartChargingService {
    private enphaseService;
    private vehicleService;
    private options;
    constructor(enphaseService: EnphaseService, vehicleService: TeslaVehicleService, options: SmartChargingOptions);
    invoke(): Promise<void>;
    calculateRecommendedAmps(teslaChargeState: ChargeState, enphaseMeterBundle: IvpMeterBundle, productionOffsetPower?: number): number;
}
export declare class SmartChargingOptions {
    /**
     * Interval to refresh charging current (default 1 min)
     */
    refreshInterval: number;
    /**
     * Production offset in Wh (default 200 Wh).
     *
     * Tesla will be charged at the rate lower than solar production to compensate for any household usage.
     */
    productionOffsetPower: number;
}
//# sourceMappingURL=SmartCharingService.d.ts.map