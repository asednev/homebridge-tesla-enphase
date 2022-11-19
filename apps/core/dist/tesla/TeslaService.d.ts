import { ChargeState } from "./ChargeState";
import { ITeslaVehicleClient } from "./ITeslaVehicleClient";
export declare class TeslaVehicleService {
    private vehicleClient;
    private latestChargeState;
    constructor(vehicleClient: ITeslaVehicleClient);
    getChargeState(): Promise<ChargeState>;
    setTargetChargeRate(targetAmps: number): void;
}
//# sourceMappingURL=TeslaService.d.ts.map