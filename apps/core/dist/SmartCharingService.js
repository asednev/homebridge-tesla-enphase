"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartChargingOptions = exports.SmartChargingService = void 0;
const enphase_1 = require("./enphase");
class SmartChargingService {
    enphaseService;
    vehicleService;
    options;
    constructor(enphaseService, vehicleService, options) {
        this.enphaseService = enphaseService;
        this.vehicleService = vehicleService;
        this.options = options;
    }
    async invoke() {
        console.log('SmartChargingService start');
        console.time('SmartChargingService');
        // refresh current draw
        let latestChargeState;
        let latestEnphaseBundle;
        try {
            latestChargeState = await this.vehicleService.getChargeState();
        }
        catch (err) {
            throw err;
        }
        console.log(`SmartChargingService Tesla charge state ChargeAmps=${latestChargeState.ChargeAmps}, ChargerVoltage=${latestChargeState.ChargerVoltage}, BatteryLevel=${latestChargeState.BatteryLevel}, Est. Power=${latestChargeState.ChargerActualCurrent * latestChargeState.ChargerVoltage}`);
        latestEnphaseBundle = await this.enphaseService.getCurrentProduction();
        if (latestEnphaseBundle.Readings.length > 0) {
            const reading = latestEnphaseBundle.Readings[0];
            console.log(`SmartChargingService Enphase production ActivePower=${reading.ActivePower}, Voltage=${reading.Voltage}, Current=${reading.Current}, Timestamp=${reading.Timestamp}`);
        }
        let targetAmps = 0;
        try {
            targetAmps = this.calculateRecommendedAmps(latestChargeState, latestEnphaseBundle, this.options.productionOffsetPower);
            console.log('SmartChargingService TargetChargeAmps=', targetAmps);
        }
        catch (err) {
            console.log('SmartChargingService calculateRecommendedAmps failed', err);
        }
        this.vehicleService.setTargetChargeRate(targetAmps);
        console.log('SmartChargingService finished');
        console.timeEnd('SmartChargingService');
    }
    calculateRecommendedAmps(teslaChargeState, enphaseMeterBundle, productionOffsetPower = 0) {
        const production = this.enphaseService.calculateProductionPower(enphaseMeterBundle);
        if (production === enphase_1.EnphaseService.NoProduction) {
            return 0;
        }
        // take the highest voltage
        const voltage = Math.max(teslaChargeState.ChargerVoltage, production.Voltage);
        // calculate charing current
        const current = production.Power / voltage;
        const offsetCurrent = productionOffsetPower / voltage;
        const currentWithOffset = current - offsetCurrent;
        console.debug(`SmartChargingService calculateRecommendedAmps voltage=${voltage}, current=${current}, offsetCurrent=${offsetCurrent}, currentWithOffset=${currentWithOffset}`);
        // round down the result
        return Math.floor(currentWithOffset);
    }
}
exports.SmartChargingService = SmartChargingService;
class SmartChargingOptions {
    /**
     * Interval to refresh charging current (default 1 min)
     */
    refreshInterval = 1; // Minutes
    /**
     * Production offset in Wh (default 200 Wh).
     *
     * Tesla will be charged at the rate lower than solar production to compensate for any household usage.
     */
    productionOffsetPower = 200; // Whatt
}
exports.SmartChargingOptions = SmartChargingOptions;
