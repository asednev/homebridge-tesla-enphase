"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartChargingService = void 0;
const EnphaseService_1 = require("./EnphaseService");
class SmartChargingService {
    enphaseService;
    constructor(enphaseService) {
        this.enphaseService = enphaseService;
    }
    calculateRecommendedAmps(teslaChargeState, enphaseMeterBundle) {
        const production = this.enphaseService.getProduction(enphaseMeterBundle);
        if (production === EnphaseService_1.EnphaseService.NoProduction) {
            return 0;
        }
        // take the highest voltage
        const voltage = Math.max(teslaChargeState.ChargerVoltage, production.Voltage);
        // calculate charing current
        const current = production.Power / voltage;
        // round down the result
        return Math.floor(current);
    }
}
exports.SmartChargingService = SmartChargingService;
