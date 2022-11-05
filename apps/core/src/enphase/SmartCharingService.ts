import { ChargeState } from "../tesla";
import { EnphaseService } from "./EnphaseService";
import { IvpMeterBundle } from "./IvpMeterBundle";

export class SmartChargingService {

    constructor(private enphaseService: EnphaseService) {

    }

    calculateRecommendedAmps(teslaChargeState: ChargeState,
        enphaseMeterBundle: IvpMeterBundle) {

            const production = this.enphaseService.getProduction(enphaseMeterBundle);
            if(production === EnphaseService.NoProduction) {
                return 0;
            }
            
            // take the highest voltage
            const voltage = Math.max(teslaChargeState.ChargerVoltage, production.Voltage);

            // calculate charing current
            const current  = production.Power / voltage;

            // round down the result
            return Math.floor(current);
    }
}