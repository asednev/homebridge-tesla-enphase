import { ChargeState } from "../tesla";
import { EnphaseService } from "./EnphaseService";
import { IvpMeterBundle } from "./IvpMeterBundle";
export declare class SmartChargingService {
    private enphaseService;
    constructor(enphaseService: EnphaseService);
    calculateRecommendedAmps(teslaChargeState: ChargeState, enphaseMeterBundle: IvpMeterBundle): number;
}
//# sourceMappingURL=SmartCharingService.d.ts.map