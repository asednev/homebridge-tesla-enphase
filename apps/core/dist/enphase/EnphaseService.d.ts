import { IEnphaseClient } from "./IEnphaseClient";
import { IvpMeterBundle } from "./IvpMeterBundle";
export declare class EnphaseService {
    private enphaseClient;
    constructor(enphaseClient: IEnphaseClient);
    static NoProduction: {
        Power: number;
        Voltage: number;
        Current: number;
    };
    getCurrentProduction(): Promise<IvpMeterBundle>;
    calculateProductionPower(bundle: IvpMeterBundle): {
        Power: number;
        Voltage: number;
        Current: number;
    };
}
//# sourceMappingURL=EnphaseService.d.ts.map